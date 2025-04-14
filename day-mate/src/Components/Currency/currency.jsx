import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";

const defaultCurrencies = ["usd", "eur", "gold_18"];

const currencyNames = {
  usd: "US Dollar",
  eur: "Euro",
  gold_18: "18K Gold",
};

const currencyIcons = {
  usd: <div className="w-8 h-8 rounded-full custom-dollar-bg"></div>,
  eur: <div className="w-8 h-8 rounded-full custom-euro-bg"></div>,
  gold_18: <div className="w-6 h-6 rounded-full custom-gold-bg"></div>,
};

const toPersianDigits = (num) => {
  return num?.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};

const Currency = () => {
  const [data, setData] = useState({});
  const [prevData, setPrevData] = useState({});
  const [selectedCurrencies, setSelectedCurrencies] =
    useState(defaultCurrencies);

  const API_URL = import.meta.env.VITE_CURRENCY_API_URL;
  const API_KEY = import.meta.env.VITE_CURRENCY_API_KEY;

  useEffect(() => {
    axios
      .get(`${API_URL}?api_key=${API_KEY}`)
      .then((res) => {
        if (Object.keys(data).length > 0) {
          setPrevData(data);
        }
        setData(res.data);
      })
      .catch((err) => console.error(err));
  }, [data, API_URL, API_KEY]);

  const getChangeIcon = (currencyKey) => {
    const currentValue = data[currencyKey]?.value;
    const prevValue = prevData[currencyKey]?.value;

    if (currentValue && prevValue) {
      const change = currentValue - prevValue;
      if (change > 0) return <FaArrowUp className="text-green-500" />;
      if (change < 0) return <FaArrowDown className="text-red-500" />;
    }
    return null;
  };

  return (
    <section className="flex flex-col items-center justify-start w-[58%] h-full rounded-2xl custom-whiteLess-bg p-2 overflow-y-auto">
      <ul className="flex flex-col w-full gap-y-2">
        {selectedCurrencies.map((currencyKey) => {
          const value = data[currencyKey]?.value;
          return (
            <li
              key={currencyKey}
              className="flex justify-between items-center text-sm bg-sky-50 border border-gray-300 rounded-lg px-3 py-2"
            >
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium">
                  {toPersianDigits(value?.toLocaleString())}
                </span>
                {getChangeIcon(currencyKey)}
              </div>

              <div className="flex flex-row items-center gap-2">
                <span className="text-xs text-gray-500 font-semibold mt-[2px]">
                  {currencyKey.toUpperCase()}
                </span>

                <span className="font-bold text-gray-600">
                  {currencyNames[currencyKey]}
                </span>

                {currencyIcons[currencyKey]}
              </div>
            </li>
          );
        })}
        <button className="flex flex-row items-center h-10 text-sm font-bold text-gray-600 bg-gray-100 border border-gray-300 px-3 gap-2 rounded-lg shadow-md transition hover:scale-105 hover:cursor-pointer hover:bg-gray-200">
          <FaCirclePlus className="text-gray-500 w-4 h-4" />
          افزودن ارز
        </button>
      </ul>
    </section>
  );
};

export default Currency;
