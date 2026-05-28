import type { EvaluationLevel, QuestionLevel } from '../types';

export interface CriteriaScores {
  totalScore: number;
  conceptScore: number;
  explanationScore: number;
  applicationScore: number;
  reasoningScore: number;
}

export const scoreUtils = {
  calculateCriteriaScores(
    evalLevel: EvaluationLevel,
    qLevel: QuestionLevel,
    baseScore: number
  ): CriteriaScores {
    // Generate scores centered around baseScore with variation depending on question level difficulty focus
    let conceptMod = 0;
    let explanationMod = 0;
    let applicationMod = 0;
    let reasoningMod = 0;

    switch (qLevel) {
      case 'basic':
        // Basic focuses heavily on concept and explanation
        conceptMod = 5;
        explanationMod = 0;
        applicationMod = -10;
        reasoningMod = -15;
        break;
      case 'standard':
        // Standard focuses on procedure and application
        conceptMod = 2;
        explanationMod = -2;
        applicationMod = 5;
        reasoningMod = -5;
        break;
      case 'advanced':
        // Advanced focuses on reasoning, connection, and transfer
        conceptMod = 0;
        explanationMod = 2;
        applicationMod = 5;
        reasoningMod = 10;
        break;
    }

    const clamp = (val: number, min: number, max: number) => Math.round(Math.max(min, Math.min(max, val)));

    if (evalLevel === 'high') {
      return {
        totalScore: baseScore,
        conceptScore: clamp(baseScore + conceptMod, 80, 100),
        explanationScore: clamp(baseScore + explanationMod, 80, 100),
        applicationScore: clamp(baseScore + applicationMod, 75, 100),
        reasoningScore: clamp(baseScore + reasoningMod, 70, 100)
      };
    } else if (evalLevel === 'medium') {
      return {
        totalScore: baseScore,
        conceptScore: clamp(baseScore + conceptMod, 50, 79),
        explanationScore: clamp(baseScore + explanationMod, 50, 79),
        applicationScore: clamp(baseScore + applicationMod, 45, 79),
        reasoningScore: clamp(baseScore + reasoningMod, 40, 79)
      };
    } else {
      // Low / 하
      return {
        totalScore: baseScore,
        conceptScore: clamp(baseScore + conceptMod, 0, 49),
        explanationScore: clamp(baseScore + explanationMod, 0, 49),
        applicationScore: clamp(baseScore + applicationMod, 0, 49),
        reasoningScore: clamp(baseScore + reasoningMod, 0, 49)
      };
    }
  }
};
