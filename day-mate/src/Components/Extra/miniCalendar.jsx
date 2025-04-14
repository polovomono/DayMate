import React, { useEffect, useRef } from "react";

const MiniCalendar = ({ isOpen, onClose, onDateSelect, selectedDate }) => {
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={calendarRef}
      className="absolute -right-30 -top-64 w-64 p-4 shadow-lg rounded-xl custom-whiteLess-bg z-50"
    >
      <div className="flex flex-col items-center w-full">
        <div className="font-bold grid grid-cols-7 text-center w-full border-b pb-1.5">
          {["ش", "ی", "د", "س", "چ", "پ", "ج"].map((day) => (
            <div key={day} className="text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 w-full custom-mt-2">
          {Array.from({ length: 31 }).map((_, i) => (
            <button
              key={i}
              onClick={() => onDateSelect(i + 1)}
              className={`p-2 text-xs rounded-lg hover:cursor-pointer hover:bg-gray-200 ${
                selectedDate === i + 1
                  ? "bg-emerald-600 text-white rounded-6xl hover:none"
                  : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniCalendar;
