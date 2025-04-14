import { useState, useEffect } from "react";
import { IoIosPause } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const Timer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const convertToPersianNumbers = (text) => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return text.replace(/[0-9]/g, (d) => persianNumbers[d]);
  };

  const handleInputChange = (e, setter) => {
    const value = Math.min(Math.max(0, parseInt(e.target.value) || 0), 59);
    setter(value);
  };

  const handleReset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setIsRunning(false);
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours(hours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [hours, minutes, seconds, isRunning]);

  return (
    <div className="flex flex-col items-center justify-between pb-3 w-full h-full">
      <div className="flex flex-row items-center justify-between sm:w-[80%] w-[70%] h-[60%]">
        <div className="flex flex-col items-center justify-center gap-1">
          <input
            type="number"
            value={convertToPersianNumbers(String(seconds).padStart(2, "0"))}
            placeholder="۰۰"
            onChange={(e) => handleInputChange(e, setSeconds)}
            min="0"
            max="59"
            disabled={isRunning}
            className="text-center text-2xl font-bold px-2 py-1 rounded-md placeholder:text-black placeholder:text-2xl placeholder:text-center outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none custom-lightGray-bg"
            style={{ direction: "ltr" }}
          />
          <p className="text-gray-500 text-xs">ثانیه</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <input
            type="number"
            value={convertToPersianNumbers(String(minutes).padStart(2, "0"))}
            placeholder="۰۰"
            onChange={(e) => handleInputChange(e, setMinutes)}
            min="0"
            max="59"
            disabled={isRunning}
            className="text-center text-2xl font-bold px-2 py-1 rounded-md placeholder:text-black placeholder:text-2xl placeholder:text-center outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none custom-lightGray-bg"
            style={{ direction: "ltr" }}
          />
          <p className="text-gray-500 text-xs">دقیقه</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-1">
          <input
            type="number"
            value={convertToPersianNumbers(String(hours).padStart(2, "0"))}
            placeholder="۰۰"
            onChange={(e) => handleInputChange(e, setHours)}
            min="0"
            max="23"
            disabled={isRunning}
            className="text-center text-2xl font-bold px-2 py-1 rounded-md placeholder:text-black placeholder:text-2xl placeholder:text-center outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none custom-lightGray-bg"
            style={{ direction: "ltr" }}
          />
          <p className="text-gray-500 text-xs">ساعت</p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center gap-2 h-[25%]">
        <button
          onClick={handleStartStop}
          className="flex flex-row items-center justify-center gap-0.5 text-sm font-bold px-6 py-2 rounded-md hover:cursor-pointer custom-blue-bg custom-white-color"
        >
          {isRunning ? (
            <>
              <IoIosPause />
              توقف
            </>
          ) : (
            "شروع"
          )}
        </button>

        {isRunning && (
          <button
            onClick={handleReset}
            className="flex flex-row items-center justify-center gap-0.5 text-gray-500 text-sm font-bold px-6 py-2 rounded-md hover:cursor-pointer custom-gray-bg"
          >
            <RxCross2 />
            پایان
          </button>
        )}
      </div>
    </div>
  );
};

export default Timer;
