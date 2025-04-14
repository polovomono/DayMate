import { useState, useEffect } from "react";
import axios from "axios";
import cloudy from "../../assets/Material/cloudy.png";
import rain from "../../assets/Material/rain.png";
import snow from "../../assets/Material/snow.png";
import clearDay from "../../assets/Material/clear-day.png";
import clearNight from "../../assets/Material/clear-night.png";

const Forecast = () => {
  const [forecastData, setForecastData] = useState(null);

  const API_URL = import.meta.env.VITE_FORECAST_API_URL;
  const API_KEY = import.meta.env.VITE_FORECAST_API_KEY;
  const CITY = import.meta.env.VITE_FORECAST_CITY;
  const UNITS = import.meta.env.VITE_FORECAST_UNITS;

  const fetchForecast = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: CITY,
          units: UNITS,
          appid: API_KEY,
        },
      });
      setForecastData(response.data);
    } catch (err) {
      console.error("Error fetching forecast:", err);
    }
  };

  useEffect(() => {
    fetchForecast();
  }, []);

  const convertToPersianNumbers = (text) => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return text.replace(/[0-9]/g, (d) => persianNumbers[d]);
  };

  const getPersianDate = (daysToAdd) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);

    const options = { timeZone: "Asia/Tehran" };

    const weekday = new Intl.DateTimeFormat("fa-IR", {
      ...options,
      weekday: "long",
    }).format(date);

    const day = new Intl.DateTimeFormat("fa-IR", {
      ...options,
      day: "numeric",
    }).format(date);

    const month = new Intl.DateTimeFormat("fa-IR", {
      ...options,
      month: "numeric",
    }).format(date);

    return `${weekday} ${convertToPersianNumbers(`${month}/${day}`)}`;
  };

  const getTemperature = (index) => {
    if (!forecastData) return "";
    const temp = Math.round(forecastData.list[index * 8].main.temp);
    return convertToPersianNumbers(temp.toString()) + "°";
  };

  const getWeatherImage = (index) => {
    if (!forecastData) return cloudy;

    const temp = forecastData.list[index * 8]?.main.temp;
    const weatherId = forecastData.list[index * 8]?.weather[0]?.id;
    const humidity = forecastData.list[index * 8]?.main.humidity;

    if (weatherId >= 200 && weatherId < 600) {
      return rain;
    } else if (weatherId >= 600 && weatherId < 700) {
      return snow;
    }

    if (temp >= 30) {
      return clearDay;
    } else if (temp <= 5) {
      return snow;
    } else if (temp > 5 && temp < 15 && humidity > 70) {
      return rain;
    } else if (temp >= 15 && temp < 30) {
      return weatherId === 800 ? clearDay : cloudy;
    } else {
      return cloudy;
    }
  };

  return (
    <div className="flex flex-row items-start justify-between w-full h-full custom-direction">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center w-[19%] h-[75%] gap-2 rounded-xl custom-whiteLess-bg"
        >
          <p className="sm:text-[0.5rem] text-[0.7rem] text-gray-500 font-bold text-center">
            {getPersianDate(index + 1)}
          </p>
          <img
            src={getWeatherImage(index)}
            alt="weather"
            className="w-10 h-10 my-2 hover:animate-bend"
          />
          <h3 className="sm:text-lg text-xl text-gray-700 font-bold">
            {getTemperature(index)}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Forecast;

// Add animation style once on component load
const style = document.createElement("style");
style.textContent = `
  @keyframes bend {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(-10deg); }
    75% { transform: rotate(10deg); }
    100% { transform: rotate(0deg); }
  }
  .hover\\:animate-bend:hover {
    animation: bend 1s ease-in-out;
  }
`;
document.head.appendChild(style);
