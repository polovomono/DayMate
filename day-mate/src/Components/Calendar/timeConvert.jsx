import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import moment from "moment";
import jMoment from "jalali-moment";
import { RxCross2 } from "react-icons/rx";
import { HiMiniArrowTurnDownLeft } from "react-icons/hi2";

const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const gregorianMonths = [
  "ژانویه",
  "فوریه",
  "مارس",
  "آوریل",
  "مه",
  "ژوئن",
  "جولای",
  "اوت",
  "سپتامبر",
  "اکتبر",
  "نوامبر",
  "دسامبر",
];

const weekdaysFa = {
  Saturday: "شنبه",
  Sunday: "یک‌شنبه",
  Monday: "دوشنبه",
  Tuesday: "سه‌شنبه",
  Wednesday: "چهارشنبه",
  Thursday: "پنج‌شنبه",
  Friday: "جمعه",
};

const TimeConvert = ({ onBack }) => {
  const [selectedDay, setSelectedDay] = useState(18);
  const [selectedMonth, setSelectedMonth] = useState("فروردین");
  const [selectedYear, setSelectedYear] = useState(1404);
  const [converted, setConverted] = useState(false);
  const [calendarType, setCalendarType] = useState("shamsi");

  useEffect(() => {
    if (calendarType === "shamsi") {
      setSelectedMonth("فروردین");
      setSelectedYear(1400);
    } else {
      setSelectedMonth("ژانویه");
      setSelectedYear(2021);
    }
  }, [calendarType]);

  const toPersianDigits = (num) => {
    return num.toString().replace(/\d/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[digit]);
  };

  const getMonthList = () =>
    calendarType === "shamsi" ? persianMonths : gregorianMonths;

  const getYearList = () =>
    calendarType === "shamsi"
      ? [...Array(121)].map((_, i) => i + 1300).reverse()
      : [...Array(121)].map((_, i) => i + 1920).reverse();

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const scrollToCenter = (e, type, values) => {
    const scrollTop = e.target.scrollTop;
    const itemHeight = 28;
    const index = Math.round(scrollTop / itemHeight);
    const value = values[index];

    if (value === undefined) return;

    if (type === "day") {
      setSelectedDay(value);
      smoothScrollTo(e.target, index * itemHeight);
    } else if (type === "month") {
      setSelectedMonth(value);
      smoothScrollTo(e.target, index * itemHeight);
    } else if (type === "year") {
      setSelectedYear(value);
      smoothScrollTo(e.target, index * itemHeight);
    }
  };

  const smoothScrollTo = (element, targetPosition) => {
    element.scrollTo({
      center: targetPosition,
      behavior: "smooth",
    });
  };

  const renderScrollList = (items, selected, onScroll, type, onClick) => {
    return (
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-1/2 w-full h-8 -translate-y-1/2 rounded z-20 pointer-events-none" />
        <div
          className="h-32 overflow-y-auto no-scrollbar text-center py-2 relative z-0 snap-y snap-mandatory"
          onScroll={(e) => scrollToCenter(e, type, items)}
        >
          {items.map((item, index) => {
            const isSelected = selected === item;
            const selectedIndex = items.indexOf(selected);
            const isBelow = index > selectedIndex;
            const baseStyle =
              "text-sm py-1 transition-all duration-200 snap-start";

            let itemClass = "";
            if (isSelected) {
              itemClass = "text-emerald-600 font-bold scale-110";
            } else if (isBelow) {
              itemClass = "text-gray-400 opacity-50";
            } else {
              itemClass = "text-gray-500";
            }

            return (
              <motion.div
                key={index}
                className={`${baseStyle} ${itemClass}`}
                layout
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  scrollSnapAlign: "start",
                }}
                onClick={() => onClick(item)}
              >
                {typeof item === "number" ? toPersianDigits(item) : item}
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  const ConvertResult = ({ day, month, year, calendarType, setConverted }) => {
    const getFormattedDates = () => {
      let date, shamsiDate, miladiDate, weekday, diffDays;

      if (calendarType === "shamsi") {
        const monthIndex = persianMonths.indexOf(month) + 1;
        const dateStr = `${year}/${monthIndex}/${day}`;
        const jDate = jMoment(dateStr, "jYYYY/jM/jD").startOf("day");
        date = jDate.clone().locale("en"); // تاریخ میلادی
        shamsiDate = toPersianDigits(jDate.locale("fa").format("D MMMM YYYY"));
        const mDay = toPersianDigits(date.date());
        const mYear = toPersianDigits(date.year());
        const mMonthFa = gregorianMonths[date.month()];
        miladiDate = `${mDay} ${mMonthFa} ${mYear}`;
        weekday = toPersianDigits(jDate.locale("fa").format("dddd"));
      } else {
        const monthIndex = gregorianMonths.indexOf(month);
        const dateStr = `${year}-${monthIndex + 1}-${day}`;
        date = moment(dateStr, "YYYY-M-D").startOf("day");

        const mDay = toPersianDigits(date.date());
        const mYear = toPersianDigits(date.year());
        const mMonthFa = gregorianMonths[date.month()];
        miladiDate = `${mDay} ${mMonthFa} ${mYear}`;

        shamsiDate = toPersianDigits(
          jMoment(date).locale("fa").format("D MMMM YYYY")
        );
        weekday = toPersianDigits(jMoment(date).locale("fa").format("dddd"));
      }

      const today = moment().startOf("day");
      diffDays = date.diff(today, "days");

      return { shamsiDate, miladiDate, weekday, diffDays };
    };

    const { shamsiDate, miladiDate, weekday, diffDays } = getFormattedDates();

    const getDiffText = () => {
      if (diffDays === 0) return "امروز";
      if (diffDays > 0) return `در ${diffDays} روز آینده`;
      return `${Math.abs(diffDays)} روز پیش`;
    };

    return (
      <div className="flex flex-col items-center justify-between w-full h-[80%]">
        <div className="flex items-center justify-between text-sm w-full">
          <span className="font-bold text-pink-700">تاریخ شمسی</span>
          {shamsiDate}
        </div>

        <div className="flex items-center justify-between text-sm w-full">
          <span className="font-bold text-pink-700">تاریخ میلادی</span>
          {miladiDate}
        </div>

        <div className="flex items-center justify-between text-sm w-full">
          <span className="font-bold text-pink-700">روز هفته</span>
          {weekday}
        </div>

        <div className="flex items-center justify-between text-sm w-full">
          <span className="font-bold text-pink-700">فاصله زمانی</span>
          {getDiffText()}
        </div>

        <button
          className="text-sm font-bold text-blue-600 hover:scale-105 hover:cursor-pointer transition"
          onClick={() => setConverted(false)}
        >
          تغییر تاریخ
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-between w-full h-full p-4 bg-white rounded-xl shadow-md text-right space-y-4">
      <div className="flex justify-between items-center h-[10%]">
        <span className="text-base text-emerald-700 font-bold">
          تبدیل تاریخ
        </span>
        <button
          className="hover:text-red-600 hover:cursor-pointer transition"
          onClick={onBack}
        >
          <RxCross2 className="w-5 h-5" />
        </button>
      </div>

      {converted === false ? (
        <div className="flex flex-col justify-between w-full h-[85%]">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <span className="text-primary-700">تاریخ مبدا:</span>
            <div className="flex sm:gap-5 gap-11 sm:w-[62%] w-[60%]">
              <button
                onClick={() => setCalendarType("shamsi")}
                className={`px-2 py-0.5 rounded transition hover:cursor-pointer ${
                  calendarType === "shamsi" ? "text-emerald-700 font-bold" : ""
                }`}
              >
                شمسی
              </button>
              <button
                onClick={() => setCalendarType("miladi")}
                className={`px-2 py-0.5 rounded transition hover:cursor-pointer ${
                  calendarType === "miladi" ? "text-emerald-700 font-bold" : ""
                }`}
              >
                میلادی
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 h-[70%]">
            {renderScrollList(
              [...Array(31)].map((_, i) => i + 1),
              selectedDay,
              scrollToCenter,
              "day",
              handleDayClick
            )}

            {renderScrollList(
              getMonthList(),
              selectedMonth,
              scrollToCenter,
              "month",
              handleMonthClick
            )}

            {renderScrollList(
              getYearList(),
              selectedYear,
              scrollToCenter,
              "year",
              handleYearClick
            )}
          </div>

          <button
            className="flex items-center justify-center text-sm font-bold bg-emerald-700 gap-2 py-2 rounded-lg transition hover:cursor-pointer active:scale-95 custom-white-color"
            onClick={() => setConverted(true)}
          >
            <span>تبدیل</span>
            <HiMiniArrowTurnDownLeft className="font-bold w-5 h-5" />
          </button>
        </div>
      ) : (
        <ConvertResult
          day={selectedDay}
          month={selectedMonth}
          year={selectedYear}
          calendarType={calendarType}
          setConverted={setConverted}
        />
      )}
    </div>
  );
};

export default TimeConvert;
