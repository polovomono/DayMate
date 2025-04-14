import { useState, useEffect } from "react";
import axios from "axios";
import moment from "jalali-moment";
import holidayTranslations from "/DayMate/day-mate/src/Common/Utils/holidayTranslations";
import TimeConvert from "../Calendar/timeConvert";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { RiExchangeFundsLine } from "react-icons/ri";
import { motion } from "framer-motion";

const PersianCalendar = () => {
  const [currentDate, setCurrentDate] = useState(moment().locale("fa"));
  const [occasions, setOccasions] = useState([]);
  const [timeConvertMode, setTimeConvertMode] = useState(false);

  const API_URL = import.meta.env.VITE_CALENDARIFIC_API_URL;
  const API_KEY = import.meta.env.VITE_CALENDARIFIC_API_KEY;
  const COUNTRY = import.meta.env.VITE_CALENDARIFIC_COUNTRY;
  const TYPE = import.meta.env.VITE_CALENDARIFIC_TYPE;

  const today = moment().locale("fa").startOf("day");
  const firstDayOfMonth = moment(currentDate).startOf("jMonth").day();
  const daysInMonth = moment(currentDate).jDaysInMonth();
  const weekdays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  const isCurrentMonth =
    currentDate.jMonth() === today.jMonth() &&
    currentDate.jYear() === today.jYear();

  const toPersianNumber = (num) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(num)
      .split("")
      .map((digit) => persianDigits[digit] || digit)
      .join("");
  };

  const changeMonth = (step) => {
    const newDate = moment(currentDate).add(step, "jMonth");
    setCurrentDate(newDate);
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      const year = currentDate.locale("en").format("YYYY");

      try {
        const { data } = await axios.get(API_URL, {
          params: {
            api_key: API_KEY,
            country: COUNTRY,
            year,
            type: TYPE,
          },
        });

        const holidays = data.response.holidays.map((holiday) => ({
          name: holidayTranslations[holiday.name] || holiday.name,
          date: moment(holiday.date.iso),
        }));
        setOccasions(holidays);
      } catch (error) {
        console.error("Error fetching holidays:", error);
        setOccasions([]);
      }
    };

    fetchHolidays();
  }, [currentDate]);

  const isOccasion = (day) => {
    const date = moment(currentDate)
      .jDate(day + 1)
      .locale("en");
    return occasions.find(
      (o) =>
        o.date.jYear() === date.jYear() &&
        o.date.jMonth() === date.jMonth() &&
        o.date.jDate() === date.jDate()
    );
  };

  return (
    <div className="flex flex-col items-center w-full h-[52%] p-4 rounded-2xl shadow-lg text-center custom-whiteLess-bg">
      {timeConvertMode === false ? (
        <div className="w-full h-full">
          <div className="flex items-center justify-between w-full">
            <button
              onClick={() => changeMonth(-1)}
              className="bg-emerald-600 p-1 rounded-lg hover:cursor-pointer"
            >
              <MdKeyboardArrowRight className="text-xl custom-white-color" />
            </button>

            <div className="flex flex-row items-center justify-center">
              <motion.h2
                className="text-xl font-bold text-emerald-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {currentDate.clone().locale("fa").format("jMMMM")}{" "}
                {toPersianNumber(currentDate.format("jYYYY"))}
              </motion.h2>

              {!isCurrentMonth && (
                <button
                  onClick={() => setCurrentDate(moment().locale("fa"))}
                  className="text-xs font-bold px-1.5 py-2 rounded-lg transition hover:cursor-pointer custom-mr-2 custom-white-color custom-blue-bg"
                >
                  امروز
                </button>
              )}
            </div>

            <button
              onClick={() => changeMonth(1)}
              className="bg-emerald-600 p-1 rounded-lg hover:cursor-pointer"
            >
              <MdKeyboardArrowLeft className="text-xl custom-white-color" />
            </button>
          </div>

          <div className="font-bold grid grid-cols-7 w-full border-b pb-1.5">
            {weekdays.map((day, index) => (
              <div key={index} className="text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-0.5 py-0.5 w-full text-center custom-mt-2">
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={index} className="p-2"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, day) => {
              const jDate = moment(currentDate).jDate(day + 1);
              const isToday = jDate.isSame(today, "day");
              const occasion = isOccasion(day);
              const weekDay = jDate.day();

              return (
                <motion.div
                  key={day}
                  title={occasion?.name || ""}
                  className={`text-sm font sm:px-1 sm:py-2 px-1 py-2.5 rounded-lg cursor-pointer
                ${isToday ? "font-bold bg-emerald-600 custom-white-color" : ""}
                ${
                  occasion
                    ? "text-red-800 font-semibold custom-redLess-bg"
                    : weekDay === 6
                    ? "text-red-500 font-semibold"
                    : "hover:bg-gray-200"
                }
              `}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * day }}
                >
                  {toPersianNumber(day + 1)}
                </motion.div>
              );
            })}
            <button
              className="flex items-center justify-center text-xl text-gray-600 hover:text-emerald-600 hover:cursor-pointer font-bold"
              onClick={() => setTimeConvertMode(true)}
            >
              <RiExchangeFundsLine />
            </button>
          </div>
        </div>
      ) : (
        <TimeConvert onBack={() => setTimeConvertMode(false)} />
      )}
    </div>
  );
};

export default PersianCalendar;
