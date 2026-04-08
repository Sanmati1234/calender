import { CalendarDay, DateRange } from '@/types/calendar';

export function getDaysInMonth(date: Date): CalendarDay[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());
  
  const days: CalendarDay[] = [];
  const current = new Date(startDate);
  const today = new Date();
  
  for (let i = 0; i < 42; i++) {
    const isCurrentMonth = current.getMonth() === month;
    const isToday = 
      current.getDate() === today.getDate() &&
      current.getMonth() === today.getMonth() &&
      current.getFullYear() === today.getFullYear();
    
    days.push({
      date: new Date(current),
      isCurrentMonth,
      isToday,
      isSelected: false,
      isInRange: false,
      isStartDate: false,
      isEndDate: false,
    });
    
    current.setDate(current.getDate() + 1);
  }
  
  return days;
}

export function updateCalendarDays(
  days: CalendarDay[],
  dateRange: DateRange
): CalendarDay[] {
  return days.map(day => {
    const isSelected = Boolean(
      (dateRange.startDate && isSameDay(day.date, dateRange.startDate)) ||
      (dateRange.endDate && isSameDay(day.date, dateRange.endDate))
    );
    
    const isStartDate = Boolean(dateRange.startDate && isSameDay(day.date, dateRange.startDate));
    const isEndDate = Boolean(dateRange.endDate && isSameDay(day.date, dateRange.endDate));
    
    const isInRange = Boolean(
      dateRange.startDate && dateRange.endDate &&
      day.date >= dateRange.startDate && day.date <= dateRange.endDate
    );
    
    return {
      ...day,
      isSelected,
      isStartDate,
      isEndDate,
      isInRange,
    };
  });
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export function getMonthImages(): { [key: string]: { url: string; title: string; description: string } } {
  return {
    '0': { url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=400&fit=crop', title: 'January', description: 'Winter wonderland' },
    '1': { url: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&h=400&fit=crop', title: 'February', description: 'Cozy winter days' },
    '2': { url: 'https://images.unsplash.com/photo-1520965914012-0d9d9b1d0b7a?w=800&h=400&fit=crop', title: 'March', description: 'Spring awakening' },
    '3': { url: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&h=400&fit=crop', title: 'April', description: 'April showers' },
    '4': { url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=400&fit=crop', title: 'May', description: 'May flowers' },
    '5': { url: 'https://images.unsplash.com/photo-1507525428034-b723a9ce6890?w=800&h=400&fit=crop', title: 'June', description: 'Summer begins' },
    '6': { url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop', title: 'July', description: 'Peak summer' },
    '7': { url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop', title: 'August', description: 'Late summer' },
    '8': { url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=400&fit=crop', title: 'September', description: 'Autumn arrives' },
    '9': { url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=400&fit=crop', title: 'October', description: 'Fall colors' },
    '10': { url: 'https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=800&h=400&fit=crop', title: 'November', description: 'November skies' },
    '11': { url: 'https://images.unsplash.com/photo-1516912480282-4cb9c6a5b923?w=800&h=400&fit=crop', title: 'December', description: 'Holiday season' },
  };
}
