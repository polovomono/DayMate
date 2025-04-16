import { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoIosPause } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import cloudy from "../../assets/Material/cloudy.png";
import rain from "../../assets/Material/rain.png";
import snow from "../../assets/Material/snow.png";
import clearNight from "../../assets/Material/clear-night.png";
import clearDay from "../../assets/Material/clear-day.png";
import sponcer from "../../assets/Material/Walex.png";
import { PiFlowerTulipBold } from "react-icons/pi";
import { LuHardDriveDownload } from "react-icons/lu";
import { FaWind } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import illustation from "../../assets/Material/illustration.svg";
import Timer from "../Weather/timer";
import Forecast from "../Weather/forecast";
import PrayerTimes from "../Weather/prayerTimes";
const Weather = () => {
  const [iranTime, setIranTime] = useState("");
  const [iranDate, setIranDate] = useState("");
  const [gregorianDate, setGregorianDate] = useState("");
  const [hijriDate, setHijriDate] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isDay, setIsDay] = useState(true);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const API_URL = import.meta.env.VITE_WEATHER_API_URL;

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`${API_URL}`, {
        params: {
          q: "Tehran",
          units: "metric",
          appid: API_KEY,
        },
      });
      setWeatherData(response.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching weather:", err);
    }
  };
  const convertToPersianNumbers = (text) => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return text.replace(/[0-9]/g, (d) => persianNumbers[d]);
  };

  const getPersianDate = () => {
    const persianWeekDays = [
      "یکشنبه",
      "دوشنبه",
      "سه‌شنبه",
      "چهارشنبه",
      "پنجشنبه",
      "جمعه",
      "شنبه",
    ];

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

    const date = new Date();
    const options = { timeZone: "Asia/Tehran" };

    const weekday = new Intl.DateTimeFormat("fa-IR", {
      ...options,
      weekday: "long",
    }).format(date);

    const month = new Intl.DateTimeFormat("fa-IR", {
      ...options,
      month: "numeric",
    }).format(date);

    const day = new Intl.DateTimeFormat("fa-IR", {
      ...options,
      day: "numeric",
    }).format(date);

    const persianToEnglish = (str) => {
      const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      return str.replace(/[۰-۹]/g, (d) => persianNumbers.indexOf(d));
    };

    const monthIndex = parseInt(persianToEnglish(month)) - 1;
    return `${weekday} ${convertToPersianNumbers(day)} ${
      persianMonths[monthIndex]
    }`;
  };

  const getGregorianDate = () => {
    const date = new Date();
    const options = {
      timeZone: "Asia/Tehran",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const getHijriDate = () => {
    const date = new Date();
    const options = {
      timeZone: "Asia/Tehran",
      calendar: "islamic",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("ar-SA-u-ca-islamic", options).format(date);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather();
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }

    const updateTime = () => {
      const time = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Tehran",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      setIranTime(convertToPersianNumbers(time));
      setIranDate(getPersianDate());
      setGregorianDate(getGregorianDate());
      setHijriDate(getHijriDate());
      checkDayTime();
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonClick = (button) => {
    setActiveButton(activeButton === button ? null : button);
  };

  const getTemperature = () => {
    if (!weatherData?.main?.temp) return "...";
    const temp = Math.round(weatherData.main.temp);
    return convertToPersianNumbers(temp.toString()) + "°";
  };

  const getHumidity = () => {
    if (!weatherData?.main?.humidity) return "...";
    return convertToPersianNumbers(weatherData.main.humidity.toString()) + "%";
  };

  const getWindSpeed = () => {
    if (!weatherData?.wind?.speed) return "...";
    const windSpeedKmh = Math.round(weatherData.wind.speed * 3.6);
    return convertToPersianNumbers(windSpeedKmh.toString()) + "Km/h";
  };

  const checkDayTime = () => {
    const hours = new Date().getHours();
    setIsDay(hours >= 6 && hours < 18);
  };

  const getWeatherImage = () => {
    if (!weatherData?.weather || !weatherData?.main) return cloudy;

    const weatherId = weatherData.weather[0]?.id;
    const temp = weatherData.main.temp;

    if (weatherId >= 200 && weatherId < 600) {
      return rain;
    } else if (weatherId >= 600 && weatherId < 700) {
      return snow;
    } else {
      return cloudy;
    }
  };

  return (
    <section className="w-full h-[45%] rounded-2xl shadow-lg custom-whiteLess-bg">
      <div className="flex flex-row px-2 py-2 w-full h-[50%]">
        <div className="flex flex-col items-center justify-between pt-1 w-[52%] h-full">
          <h1 className="sm:text-4xl text-5xl font-bold custom-blue-color">
            {iranTime}
          </h1>

          <div className="flex flex-col items-center justify-center w-full h-[35%] gap-2">
            <p className="text-md font-bold">{iranDate}</p>

            <p className="flex flex-row text-[0.6rem] text-gray-600">
              {gregorianDate} | {hijriDate}
            </p>
          </div>

          <div className="flex flex-row items-center justify-between sm:w-full w-[85%]">
            <button
              className={`flex flex-row items-center justify-between text-xs py-1  px-2 rounded-2xl hover:cursor-pointer ${
                activeButton === "button1"
                  ? "custom-darkNavy-bg custom-white-color border-none"
                  : "custom-whiteLess-bg border border-gray-300"
              }`}
              onClick={() => handleButtonClick("button1")}
            >
              تایمر
              <MdOutlineKeyboardArrowDown
                className={`${activeButton === "button1" ? "rotate-180" : ""}`}
                onClick={() => handleButtonClick("button1")}
              />
            </button>

            <button
              className={`flex flex-row items-center justify-between text-xs py-1  px-2 rounded-2xl hover:cursor-pointer ${
                activeButton === "button2"
                  ? "custom-darkNavy-bg custom-white-color border-none"
                  : "custom-whiteLess-bg border border-gray-300"
              }`}
              onClick={() => handleButtonClick("button2")}
            >
              اوقات شرعی
              <MdOutlineKeyboardArrowDown
                className={`${activeButton === "button2" ? "rotate-180" : ""}`}
                onClick={() => handleButtonClick("button2")}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between pt-1 w-[48%] h-full">
          <div className="flex flex-row items-center justify-between w-[95%]">
            <p
              className={`sm:text-4xl text-5xl font-bold ${
                isDay ? "text-yellow-400" : "text-purple-400"
              }`}
            >
              {getTemperature()}
            </p>

            <div className="flex flex-row items-center justify-center pl-4 w-[50%] h-full relative">
              <img
                src={isDay ? clearDay : clearNight}
                className="absolute z-0 w-14 h-14 moon-slide"
                alt=""
              />

              <img
                src={getWeatherImage()}
                className="relative z-10 -left-4 w-14 h-14"
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between w-[100%] sm:h-[32%] h-[36%]">
            <p className="text-sm font-semibold">آسمون زیباست🎈</p>

            <div className="flex flex-row items-center justify-between w-[95%]">
              <span className="flex flex-row items-center justify-center gap-1 sm:text-xs text-sm font-bold w-[50%]">
                {getHumidity()}
                <WiHumidity className="text-blue-700 w-5 h-5" />
              </span>

              <span className="flex flex-row items-center justify-center gap-1 sm:text-xs text-sm font-bold w-[50%]">
                {getWindSpeed()}
                <FaWind className="text-green-700 w-3 h-3" />
              </span>
            </div>
          </div>

          <button
            className={`flex flex-row items-center justify-between text-xs py-1  px-1 rounded-2xl hover:cursor-pointer ${
              activeButton === "button3"
                ? "custom-darkNavy-bg custom-white-color border-none"
                : "custom-whiteLess-bg border border-gray-300"
            }`}
            onClick={() => handleButtonClick("button3")}
          >
            پیشبینی
            <MdOutlineKeyboardArrowDown
              className={`${activeButton === "button3" ? "rotate-180" : ""}`}
              onClick={() => handleButtonClick("button3")}
            />
          </button>
        </div>
      </div>

      <div
        className={`px-3 pt-2 w-full h-[50%] rounded-2xl ${
          activeButton === "button3" ? "custom-gray-bg pl-1 pr-1" : ""
        } ${activeButton === "button2" ? "flex items-start" : ""}`}
      >
        {activeButton === "button1" ? (
          <Timer />
        ) : activeButton === "button3" ? (
          <Forecast />
        ) : activeButton === "button2" ? (
          <PrayerTimes />
        ) : (
          <div className="flex flex-row items-center justify-between w-full h-full">
            <div className="flex flex-col items-start pb-5 w-[70%] h-full">
              <div className="flex flex-row items-center justify-between gap-1 pl-3 pr-2 py-1 rounded-lg custom-gray-bg">
                <img src={sponcer} alt="" className="sm:w-6 w-8 sm:h-6 h-8" />
                <a
                  href="#"
                  className="sm:text-xs text-sm font-semibold hover:underline hover:cursor-pointer"
                >
                  والکس؛ خرید آسان بیت‌کوین
                </a>
              </div>

              <div className="flex flex-row items-center justify-between gap-1 text-green-700 custom-mt-2">
                <PiFlowerTulipBold />
                <p className="sm:text-xs text-sm font-semibold">
                  نوروز با دی میت - روز یازدهم
                </p>
              </div>

              <p className="sm:text-xs text-sm font-semibold text-red-700 custom-mt-2">
                عید سعید فطر(تعطیل)
              </p>

              <div className="flex flex-row items-center justify-between gap-1 custom-mt-2">
                <LuHardDriveDownload />
                <p className="sm:text-xs text-sm font-semibold">
                  روز جهانی بک‌آپ گرفتن
                </p>
              </div>
            </div>

            <div className="flex items-end w-[25%] h-full">
              <img src={illustation} alt="" className="w-full" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Weather;
