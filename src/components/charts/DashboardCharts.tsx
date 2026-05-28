import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import type { AchievementRecord } from '../../types';
import { graphUtils } from '../../utils/graphUtils';
import { Award, Target, Calendar, BarChart3, TrendingUp, HelpCircle } from 'lucide-react';

interface DashboardChartsProps {
  records: AchievementRecord[];
}

export const DashboardCharts: React.FC<DashboardChartsProps> = ({ records }) => {
  const trendData = graphUtils.getTrendChartData(records);
  const radarData = graphUtils.getRadarChartData(records);
  const pieData = graphUtils.getEvaluationDistributionData(records);
  const barData = graphUtils.getLevelReachedData(records);

  // Colors
  const COLORS = ['#10B981', '#F59E0B', '#EF4444']; // High, Med, Low
  const LEVEL_COLORS = ['#3B82F6', '#F59E0B', '#EF4444']; // Basic, Standard, Advanced

  // Custom tooltips for nice look
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg border border-slate-700 shadow-lg text-xs leading-5">
          <p className="font-bold border-b border-slate-700 pb-1 mb-1">{label}</p>
          {payload.map((pld: any) => (
            <p key={pld.name} style={{ color: pld.color }}>
              {pld.name}: <span className="font-semibold">{pld.value}점</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Generate Calendar Heatmap (Last 28 Days)
  const getCalendarDays = () => {
    const days = [];
    const now = new Date();
    
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      
      // Find record for this day
      const record = records.find(r => r.date === dateStr);
      
      days.push({
        date: dateStr,
        dayLabel: d.getDate(),
        record
      });
    }
    return days;
  };

  const calendarDays = getCalendarDays();

  // Summary Metrics
  const avgScore = records.length > 0 
    ? Math.round(records.reduce((sum, r) => sum + r.totalScore, 0) / records.length) 
    : 0;

  const totalTests = records.length;
  
  const highRatio = records.length > 0
    ? Math.round((records.filter(r => r.evaluationLevel === 'high').length / records.length) * 100)
    : 0;

  const weakConceptsList = Array.from(
    new Set(records.flatMap(r => r.missingConcepts))
  ).slice(0, 4);

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* 1. Header Metrics Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <div className="card-glass p-4 flex items-center justify-between">
          <div>
            <span className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider block">진단 완료 횟수</span>
            <span className="text-2xl font-black text-[var(--text-title)] block mt-1">{totalTests}회</span>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 rounded-xl">
            <Calendar size={24} />
          </div>
        </div>

        <div className="card-glass p-4 flex items-center justify-between">
          <div>
            <span className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider block">평균 종합 점수</span>
            <span className="text-2xl font-black text-[var(--text-title)] block mt-1">{avgScore}점</span>
          </div>
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 text-amber-500 rounded-xl">
            <Target size={24} />
          </div>
        </div>

        <div className="card-glass p-4 flex items-center justify-between">
          <div>
            <span className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider block">우수 등급 비율 (상)</span>
            <span className="text-2xl font-black text-[var(--text-title)] block mt-1">{highRatio}%</span>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 rounded-xl">
            <Award size={24} />
          </div>
        </div>

        <div className="card-glass p-4">
          <span className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider block">우선 복습 필요 개념</span>
          <div className="flex flex-wrap gap-1 mt-1.5">
            {weakConceptsList.length === 0 ? (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold py-0.5">
                👍 약점 개념이 없습니다. 완벽해요!
              </span>
            ) : (
              weakConceptsList.map((c, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-bold bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded border border-red-100 dark:border-red-900/30"
                >
                  {c.split('(')[0]}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 2. Visual Calendar Heatmap */}
      <div className="card-glass p-5 w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-[var(--text-title)] flex items-center gap-1.5 m-0">
              <Calendar size={16} className="text-indigo-500" />
              최근 28일 진단 캘린더 (Daily Test Calendar)
            </h3>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">매일 개념체크를 완료해 성취도를 유지하세요.</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-semibold text-[var(--text-muted)]">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-slate-100 dark:bg-slate-800 rounded border border-[var(--border-color)]"></span>미수행</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-emerald-500 rounded"></span>상 (High)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-amber-500 rounded"></span>중 (Medium)</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-red-500 rounded"></span>하 (Low)</span>
          </div>
        </div>
        
        <div className="grid grid-cols-7 sm:grid-cols-14 gap-2">
          {calendarDays.map((day, idx) => {
            let colorClass = 'bg-slate-100 dark:bg-slate-800 border-[var(--border-color)] hover:border-indigo-400';
            let tooltipText = `${day.date}: 진단 이력 없음`;
            
            if (day.record) {
              if (day.record.evaluationLevel === 'high') {
                colorClass = 'bg-emerald-500 text-white shadow-sm shadow-emerald-200 dark:shadow-none';
              } else if (day.record.evaluationLevel === 'medium') {
                colorClass = 'bg-amber-500 text-white shadow-sm shadow-amber-200 dark:shadow-none';
              } else {
                colorClass = 'bg-red-500 text-white shadow-sm shadow-red-200 dark:shadow-none';
              }
              tooltipText = `${day.date}: 종합 ${day.record.totalScore}점 (${day.record.evaluationLevel === 'high' ? '상' : day.record.evaluationLevel === 'medium' ? '중' : '하'})`;
            }
            
            return (
              <div
                key={idx}
                className={`h-11 rounded-lg border text-xs font-bold flex flex-col items-center justify-center cursor-pointer transition-all relative group ${colorClass}`}
              >
                <span>{day.dayLabel}</span>
                {day.record && (
                  <span className="text-[8px] opacity-80 mt-0.5">
                    {day.record.totalScore}점
                  </span>
                )}
                
                {/* Micro tooltip */}
                <div className="absolute bottom-12 hidden group-hover:block bg-slate-900 text-white text-[9px] p-2 rounded whitespace-nowrap z-50 border border-slate-700 shadow-xl">
                  {tooltipText}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Trend Line Chart */}
        <div className="card-glass p-5 flex flex-col h-[320px]">
          <h3 className="text-sm font-bold text-[var(--text-title)] flex items-center gap-1.5 mb-4">
            <TrendingUp size={16} className="text-indigo-500" />
            종합 성취도 추이 (Score Trend over Time)
          </h3>
          <div className="flex-1 w-full text-xs">
            {records.length === 0 ? (
              <div className="h-full flex items-center justify-center text-[var(--text-muted)]">
                진단 이력이 쌓이면 성취 그래프가 그려집니다.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis domain={[0, 100]} stroke="var(--text-muted)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="top" height={36} />
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="종합점수"
                    stroke="#6366f1"
                    strokeWidth={3}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="concept"
                    name="개념점수"
                    stroke="#10B981"
                    strokeDasharray="5 5"
                    strokeWidth={1.5}
                  />
                  <Line
                    type="monotone"
                    dataKey="explanation"
                    name="설명점수"
                    stroke="#F59E0B"
                    strokeDasharray="5 5"
                    strokeWidth={1.5}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Radar Chart */}
        <div className="card-glass p-5 flex flex-col h-[320px]">
          <h3 className="text-sm font-bold text-[var(--text-title)] flex items-center gap-1.5 mb-4">
            <BarChart3 size={16} className="text-indigo-500" />
            다차원 평가 등급 진단 (Diagnostic Radar)
          </h3>
          <div className="flex-1 w-full text-xs flex items-center justify-center">
            {records.length === 0 ? (
              <div className="text-[var(--text-muted)]">
                진단 이력이 쌓이면 다면 역량 방사형 그래프가 그려집니다.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="var(--border-color)" />
                  <PolarAngleAxis dataKey="subject" stroke="var(--text-main)" style={{ fontSize: '11px', fontWeight: 'bold' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="var(--text-muted)" />
                  <Radar
                    name="평균 성취도"
                    dataKey="score"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.3}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Pie Chart: Level Distribution */}
        <div className="card-glass p-5 flex flex-col h-[320px]">
          <h3 className="text-sm font-bold text-[var(--text-title)] flex items-center gap-1.5 mb-4">
            <HelpCircle size={16} className="text-indigo-500" />
            평가 레벨 분포 (Evaluation Distribution - 상/중/하)
          </h3>
          <div className="flex-1 w-full text-xs flex flex-col sm:flex-row items-center justify-center gap-4">
            {records.length === 0 ? (
              <div className="text-[var(--text-muted)]">
                상/중/하 평가 분포를 보여줍니다.
              </div>
            ) : (
              <>
                <div className="w-1/2 h-full flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-2">
                  {pieData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded" style={{ backgroundColor: entry.color }}></span>
                      <span className="font-bold text-[var(--text-title)] text-xs">{entry.name}:</span>
                      <span className="text-[var(--text-muted)] text-xs">{entry.value}회 수행</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Stacked Level Achievements Chart */}
        <div className="card-glass p-5 flex flex-col h-[320px]">
          <h3 className="text-sm font-bold text-[var(--text-title)] flex items-center gap-1.5 mb-4">
            <BarChart3 size={16} className="text-indigo-500" />
            최종 돌파 문항 단계 (Reached Question Levels)
          </h3>
          <div className="flex-1 w-full text-xs">
            {records.length === 0 ? (
              <div className="h-full flex items-center justify-center text-[var(--text-muted)]">
                학생의 문항 최종 돌파 비율입니다. (기본/표준/심화)
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                  <XAxis dataKey="name" stroke="var(--text-muted)" />
                  <YAxis stroke="var(--text-muted)" />
                  <Tooltip />
                  <Bar dataKey="count" name="횟수" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={LEVEL_COLORS[index % LEVEL_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
