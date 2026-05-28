import type { ReviewReminder } from '../types';
import { storageService } from './storageService';

const MEME_MESSAGES = [
  '🚨 까먹음 이슈 발생!',
  '🧠 기억아 일해라!',
  '📌 수학 개념 잠깐 소환!',
  '😵 지금 안 보면 다음 주의 내가 울어요.',
  '🔥 이 개념, 오늘 안 보면 또 도망가요.',
  '🧩 어제의 내가 배운 개념, 오늘의 내가 회수합니다.'
];

export const reminderService = {
  // Request notification permissions
  requestPermission(): void {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        console.log(`Notification permission status: ${permission}`);
      });
    }
  },

  // Schedule a new reminder for 2-3 days later
  scheduleReminder(studentId: string, concept: string, offsetDays = 2): void {
    const reminders = storageService.getReminders();
    
    // Choose a random meme message prefix
    const randomPrefix = MEME_MESSAGES[Math.floor(Math.random() * MEME_MESSAGES.length)];
    const message = `${randomPrefix} (복습 개념: ${concept})`;

    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + offsetDays);

    const newReminder: ReviewReminder = {
      id: `rem_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      studentId,
      concept,
      message,
      scheduledDate: scheduledDate.toISOString().split('T')[0],
      completed: false
    };

    reminders.push(newReminder);
    storageService.saveReminders(reminders);

    console.log(`Scheduled reminder for ${concept} on ${newReminder.scheduledDate}`);
  },

  // Check and trigger notifications for due reminders
  checkDueReminders(studentId: string): ReviewReminder[] {
    const reminders = storageService.getReminders();
    const todayStr = new Date().toISOString().split('T')[0];
    
    const dueReminders = reminders.filter(
      r => r.studentId === studentId && !r.completed && r.scheduledDate <= todayStr
    );

    // If browser notifications are permitted, trigger them
    if (dueReminders.length > 0 && 'Notification' in window && Notification.permission === 'granted') {
      dueReminders.forEach(r => {
        new Notification('MathLog 복습 알림', {
          body: r.message,
          icon: '/favicon.ico' // Or default icon
        });
      });
    }

    return dueReminders;
  },

  // Mark reminder as completed (student reviewed the concept)
  completeReminder(reminderId: string): void {
    const reminders = storageService.getReminders();
    const updated = reminders.map(r => {
      if (r.id === reminderId) {
        return { ...r, completed: true };
      }
      return r;
    });
    storageService.saveReminders(updated);
  }
};
