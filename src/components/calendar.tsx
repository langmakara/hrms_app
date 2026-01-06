"use client";
import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays, eachDayOfInterval } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../CSS/calendar.css';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // គណនាថ្ងៃដែលត្រូវបង្ហាញក្នុងតារាង
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full Height max-w-md">
      {/* Header: ខែ និង ឆ្នាំ */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={20} className="text-gray-600" />
        </button>
        <h2 className="font-bold text-gray-800">
          {format(currentMonth, 'MMM dd yyyy')}
        </h2>
        <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronRight size={20} className="text-gray-600" />
        </button>
      </div>

      {/* ឈ្មោះថ្ងៃក្នុងសប្តាហ៍ */}
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className={`text-center text-xs font-semibold py-2 ${day === "Sat" || day === "Sun" ? "text-red-400" : "text-gray-400"}`}>
            {day}
          </div>
        ))}
      </div>

      {/* ថ្ងៃខែក្នុងតារាង */}
      <div className="grid grid-cols-7">
        {calendarDays.map((day, index) => {
          const isToday = isSameDay(day, new Date());
          const isCurrentMonth = isSameMonth(day, monthStart);

          return (
            <div key={index} className="flex justify-center py-2">
              <button
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all
                ${!isCurrentMonth ? "text-gray-300" : "text-gray-700 font-medium"}
                ${isToday ? "bg-green-500 text-white shadow-md shadow-green-100" : "hover:bg-gray-50"}
                `}
              >
                {format(day, 'd')}
              </button>
            </div>
          );
        })}
      </div>

      {/* Legend: បញ្ជាក់អត្ថន័យពណ៌ (Optional) */}
      <div className="mt-6 grid grid-cols-2 gap-2 text-[10px] text-gray-500 border-t pt-4">
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> Full Day</div>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400"></span> Half Day</div>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-blue-500"></span> On Duty</div>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> Absent</div>
      </div>
    </div>
  );
};

export default Calendar;