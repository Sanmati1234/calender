'use client';

import { useState, useEffect } from 'react';
import { CalendarDay, DateRange, Note } from '@/types/calendar';
import { getDaysInMonth, updateCalendarDays, formatMonthYear, getMonthImages } from '@/lib/calendar-utils';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dateRange, setDateRange] = useState<DateRange>({ startDate: null, endDate: null });
  const [notes, setNotes] = useState<Note[]>([]);
  const [noteInput, setNoteInput] = useState('');
  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  const monthImages = getMonthImages();
  const currentMonthImage = monthImages[currentDate.getMonth().toString()];

  useEffect(() => {
    const days = getDaysInMonth(currentDate);
    setCalendarDays(updateCalendarDays(days, dateRange));
  }, [currentDate, dateRange]);

  useEffect(() => {
    const savedNotes = localStorage.getItem('calendar-notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendar-notes', JSON.stringify(notes));
  }, [notes]);

  const handleDayClick = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return;

    if (!isSelectingRange) {
      setDateRange({ startDate: day.date, endDate: null });
      setIsSelectingRange(true);
    } else {
      if (dateRange.startDate && day.date >= dateRange.startDate) {
        setDateRange({ startDate: dateRange.startDate, endDate: day.date });
      } else {
        setDateRange({ startDate: day.date, endDate: dateRange.startDate });
      }
      setIsSelectingRange(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleAddNote = () => {
    if (!noteInput.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      date: dateRange.startDate ? dateRange.startDate.toISOString() : new Date().toISOString(),
      content: noteInput,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setNotes([...notes, newNote]);
    setNoteInput('');
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const clearSelection = () => {
    setDateRange({ startDate: null, endDate: null });
    setIsSelectingRange(false);
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl wall-calendar-shadow overflow-hidden">
          {/* Header with Image */}
          <div className="relative h-64 md:h-80 lg:h-96">
            <img
              src={currentMonthImage.url}
              alt={currentMonthImage.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {formatMonthYear(currentDate)}
                </h1>
                <p className="text-lg opacity-90">{currentMonthImage.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
            {/* Calendar Section */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                {/* Calendar Controls */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <h2 className="text-xl font-semibold">
                    {formatMonthYear(currentDate)}
                  </h2>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Week Days Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {weekDays.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      onClick={() => handleDayClick(day)}
                      className={`
                        calendar-day
                        ${day.isCurrentMonth ? 'text-gray-900 dark:text-white' : 'other-month'}
                        ${day.isSelected ? 'selected' : ''}
                        ${day.isInRange ? 'in-range' : ''}
                        ${day.isStartDate ? 'start-date' : ''}
                        ${day.isEndDate ? 'end-date' : ''}
                        ${day.isToday ? 'today' : ''}
                      `}
                    >
                      {day.date.getDate()}
                    </div>
                  ))}
                </div>

                {/* Selection Info */}
                {(dateRange.startDate || isSelectingRange) && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        {isSelectingRange ? (
                          <span className="text-blue-600 dark:text-blue-400">
                            Select end date...
                          </span>
                        ) : (
                          <span className="text-gray-700 dark:text-gray-300">
                            {dateRange.startDate && `From: ${dateRange.startDate.toLocaleDateString()}`}
                            {dateRange.endDate && ` To: ${dateRange.endDate.toLocaleDateString()}`}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={clearSelection}
                        className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes Section */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-4">Notes</h3>
                
                {/* Add Note */}
                <div className="mb-4">
                  <textarea
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Add a note..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                    rows={3}
                  />
                  <button
                    onClick={handleAddNote}
                    className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Note
                  </button>
                </div>

                {/* Notes List */}
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {notes.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                      No notes yet. Add your first note above!
                    </p>
                  ) : (
                    notes.map(note => (
                      <div
                        key={note.id}
                        className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-600"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(note.date).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => handleDeleteNote(note.id)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Delete
                          </button>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {note.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
