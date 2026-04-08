export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
}

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface Note {
  id: string;
  date: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MonthImage {
  url: string;
  title: string;
  description: string;
}
