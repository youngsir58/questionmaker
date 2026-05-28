export const dateUtils = {
  // Format to YYYY-MM-DD
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  },

  // Format to Korean Style: YYYY년 MM월 DD일
  formatKoreanDate(dateStr: string): string {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[0]}년 ${parseInt(parts[1], 10)}월 ${parseInt(parts[2], 10)}일`;
  },

  // Get week number in year
  getWeekNumber(d: Date): number {
    const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    const dayNum = date.getUTCDay() || 7;
    date.setUTCDate(date.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  },

  // Check if targetDate is within the same week as referenceDate
  isSameWeek(date1Str: string, date2Str: string): boolean {
    const d1 = new Date(date1Str);
    const d2 = new Date(date2Str);
    
    // Check year first
    if (d1.getFullYear() !== d2.getFullYear()) return false;
    
    return this.getWeekNumber(d1) === this.getWeekNumber(d2);
  },

  // Check if targetDate is within the same month as referenceDate
  isSameMonth(date1Str: string, date2Str: string): boolean {
    const d1 = new Date(date1Str);
    const d2 = new Date(date2Str);
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth();
  },

  // Get day of week name in Korean
  getKoreanDayOfWeek(dateStr: string): string {
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const d = new Date(dateStr);
    return days[d.getDay()];
  }
};
