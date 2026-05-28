import type { AnswerAttempt, AchievementRecord, TeacherScope } from '../types';
import { dateUtils } from './dateUtils';
import { scoreUtils } from './scoreUtils';

export const graphUtils = {
  // Aggregate attempts into AchievementRecords on the fly
  compileAchievementRecords(attempts: AnswerAttempt[], scopes: TeacherScope[]): AchievementRecord[] {
    const studentAttempts = attempts.filter(a => a.studentId);
    
    // Group attempts by studentId, testDate, testType, and questionId
    const groups: Record<string, AnswerAttempt[]> = {};
    studentAttempts.forEach(attempt => {
      // Key: studentId_testDate_testType
      const key = `${attempt.studentId}_${attempt.testDate}_${attempt.testType}`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(attempt);
    });

    const records: AchievementRecord[] = [];

    Object.keys(groups).forEach(key => {
      const groupAttempts = groups[key];
      const first = groupAttempts[0];
      const d = new Date(first.testDate);

      // Find the teacher scope for this topic if available to get the achievement standard
      const scope = scopes.find(
        s => s.lessonTopic.includes(first.lessonTopic) || first.lessonTopic.includes(s.lessonTopic)
      );

      // We want to calculate the overall stats for this test session
      // A session has multiple attempts representing Basic, Standard, and Advanced levels
      // Find the highest level that has a High or Medium evaluation (meaning they passed it)
      let reachedLevel: 'basic' | 'standard' | 'advanced' = 'basic';
      const passedLevels = groupAttempts
        .filter(a => a.evaluationLevel === 'high' || a.evaluationLevel === 'medium')
        .map(a => a.level);
      
      if (passedLevels.includes('advanced')) {
        reachedLevel = 'advanced';
      } else if (passedLevels.includes('standard')) {
        reachedLevel = 'standard';
      }

      // Calculate averages of scores
      // For each unique question level, take the last attempt (in case they failed and retried)
      const levelMap: Record<string, AnswerAttempt> = {};
      groupAttempts.forEach(a => {
        // If there's already an attempt for this level, prioritize reinforcement if it exists or just the latest
        const existing = levelMap[a.level];
        if (!existing || a.attemptType === 'reinforcement' || new Date(a.createdAt) > new Date(existing.createdAt)) {
          levelMap[a.level] = a;
        }
      });

      const finalAttempts = Object.values(levelMap);
      const totalScore = Math.round(finalAttempts.reduce((sum, a) => sum + a.score, 0) / finalAttempts.length);
      
      // Calculate criteria scores using scoreUtils
      let sumConcept = 0;
      let sumExplanation = 0;
      let sumApplication = 0;
      let sumReasoning = 0;

      finalAttempts.forEach(a => {
        const crit = scoreUtils.calculateCriteriaScores(a.evaluationLevel, a.level, a.score);
        sumConcept += crit.conceptScore;
        sumExplanation += crit.explanationScore;
        sumApplication += crit.applicationScore;
        sumReasoning += crit.reasoningScore;
      });

      const count = finalAttempts.length || 1;
      const conceptScore = Math.round(sumConcept / count);
      const explanationScore = Math.round(sumExplanation / count);
      const applicationScore = Math.round(sumApplication / count);
      const reasoningScore = Math.round(sumReasoning / count);

      // Compile missing concepts and misconceptions
      const missingConcepts = Array.from(new Set(groupAttempts.flatMap(a => a.missingConcepts))).filter(Boolean);
      const misconceptions = Array.from(new Set(groupAttempts.flatMap(a => a.misconceptions))).filter(Boolean);

      // Determine evaluation level based on average score
      let evaluationLevel: 'high' | 'medium' | 'low' = 'low';
      if (totalScore >= 80) {
        evaluationLevel = 'high';
      } else if (totalScore >= 50) {
        evaluationLevel = 'medium';
      }

      records.push({
        id: key,
        studentId: first.studentId,
        classId: first.classId,
        testType: first.testType,
        date: first.testDate,
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        week: dateUtils.getWeekNumber(d),
        day: first.testDate, // Use date string for calendar matching
        grade: first.grade,
        subject: first.subject,
        unit: first.unit,
        topic: first.lessonTopic,
        scope: first.teacherDefinedScope,
        achievementStandard: first.achievementStandard || scope?.achievementStandard || '',
        reachedLevel,
        evaluationLevel,
        canProceed: reachedLevel === 'advanced' || reachedLevel === 'standard',
        totalScore,
        conceptScore,
        explanationScore,
        applicationScore,
        reasoningScore,
        missingConcepts,
        misconceptions
      });
    });

    // Sort chronologically
    return records.sort((a, b) => a.date.localeCompare(b.date));
  },

  // Helper for trend line charts (daily or test-by-test scores)
  getTrendChartData(records: AchievementRecord[]) {
    return records.map(r => ({
      name: dateUtils.formatKoreanDate(r.date).substring(5), // E.g. "5월 28일"
      score: r.totalScore,
      concept: r.conceptScore,
      explanation: r.explanationScore,
      application: r.applicationScore,
      reasoning: r.reasoningScore,
      type: r.testType === 'daily' ? '일일' : r.testType === 'weekly' ? '주간' : '월간'
    }));
  },

  // Helper for subject strengths (score by subject)
  getSubjectChartData(records: AchievementRecord[]) {
    const subjectMap: Record<string, { total: number; count: number }> = {};
    records.forEach(r => {
      const subject = r.subject || '공통수학';
      if (!subjectMap[subject]) {
        subjectMap[subject] = { total: 0, count: 0 };
      }
      subjectMap[subject].total += r.totalScore;
      subjectMap[subject].count += 1;
    });

    return Object.keys(subjectMap).map(subject => ({
      subject,
      score: Math.round(subjectMap[subject].total / subjectMap[subject].count)
    }));
  },

  // Helper for radar chart (overall diagnostic criteria strengths)
  getRadarChartData(records: AchievementRecord[]) {
    if (records.length === 0) {
      return [
        { subject: '개념 이해', score: 0, fullMark: 100 },
        { subject: '과정 설명', score: 0, fullMark: 100 },
        { subject: '실전 적용', score: 0, fullMark: 100 },
        { subject: '추론 분석', score: 0, fullMark: 100 }
      ];
    }

    const concept = Math.round(records.reduce((sum, r) => sum + r.conceptScore, 0) / records.length);
    const explanation = Math.round(records.reduce((sum, r) => sum + r.explanationScore, 0) / records.length);
    const application = Math.round(records.reduce((sum, r) => sum + r.applicationScore, 0) / records.length);
    const reasoning = Math.round(records.reduce((sum, r) => sum + r.reasoningScore, 0) / records.length);

    return [
      { subject: '개념 이해', score: concept, fullMark: 100 },
      { subject: '과정 설명', score: explanation, fullMark: 100 },
      { subject: '실전 적용', score: application, fullMark: 100 },
      { subject: '추론 분석', score: reasoning, fullMark: 100 }
    ];
  },

  // Helper for score distribution (High, Medium, Low counts)
  getEvaluationDistributionData(records: AchievementRecord[]) {
    let high = 0;
    let medium = 0;
    let low = 0;

    records.forEach(r => {
      if (r.evaluationLevel === 'high') high++;
      else if (r.evaluationLevel === 'medium') medium++;
      else low++;
    });

    return [
      { name: '상 (High)', value: high, color: '#10B981' },
      { name: '중 (Medium)', value: medium, color: '#F59E0B' },
      { name: '하 (Low)', value: low, color: '#EF4444' }
    ].filter(item => item.value > 0 || records.length === 0);
  },

  // Helper for levels reached (Basic, Standard, Advanced counts)
  getLevelReachedData(records: AchievementRecord[]) {
    let basic = 0;
    let standard = 0;
    let advanced = 0;

    records.forEach(r => {
      if (r.reachedLevel === 'advanced') advanced++;
      else if (r.reachedLevel === 'standard') standard++;
      else basic++;
    });

    return [
      { name: '기본 (Basic)', count: basic },
      { name: '표준 (Standard)', count: standard },
      { name: '심화 (Advanced)', count: advanced }
    ];
  }
};
