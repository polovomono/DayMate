import { useState } from "react";
import "/DayMate/day-mate/src/Components/global.css";
import logo from "/DayMate/day-mate/src/assets/Material/logo.jpg";
import { RiSettings3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { PiPottedPlantFill } from "react-icons/pi";
//import "@theme-toggles/react/css/Around.css";
//import { Around } from "@theme-toggles/react";
import SplitText from "../Extra/splitText";
import ToDo from "../ToDo/toDo";
import Weather from "../Weather/weather";
import Calendar from "../Calendar/calendar";
import Currency from "../Currency/currency";
import Search from "../Search/search";

const Origin = () => {
  return (
    <main className="flex flex-col items-center justify-between pb-5 sm:w-[70rem] sm:h-[50rem] h-[120rem]">
      <header className="flex sm:flex-row flex-col items-center justify-between w-full sm:h-[10%] h-[14%]">
        <div className="flex flex-row items-center justify-between sm:w-[18%] w-[50%]">
          <img src={logo} className="sm:w-18 sm:h-18 w-26 h-26 rounded-full" />
          <h1 className="sm:w-[60.5%] w-[35%] text-3xl font-bold custom-darkNavy-color custom-alexandria-font">
            دی میت
          </h1>
        </div>

        <div className="flex sm:flex-row flex-col items-center justify-between sm:w-[26%] sm:h-full h-[45%]">
          <div className="flex items-center justify-center px-5 py-2 rounded-3xl custom-whiteLess-bg">
            <SplitText
              text="yaD etaM"
              className="text-2xl font-semibold text-center custom-direction custom-darkNavy-color"
              delay={100}
              animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
              animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
              easing="easeOutCubic"
              threshold={0.2}
            />
            <PiPottedPlantFill className="w-[1.5rem] h-[1.5rem] custom-darkNavy-color" />
          </div>

          <div className="flex flex-row items-center justify-between w-25">
            <button className="flex items-center justify-center px-[0.4rem] py-[0.6rem] rounded-full hover:cursor-pointer hover:bg-[#1e3a4c] transition hover:-translate-y-1 custom-whiteLess-bg">
              <RiSettings3Fill className="w-[2rem] h-[1.6rem] custom-darkNavy-color" />
            </button>

            <button className="flex items-center justify-center px-[0.4rem] py-[0.6rem] rounded-full hover:cursor-pointer hover:bg-[#1e3a4c] transition hover:-translate-y-1 custom-whiteLess-bg">
              <FaUser className="w-[2rem] h-[1.6rem] custom-darkNavy-color " />
            </button>
            {/*<Around className="w-8 h-8" duration={750} />*/}
          </div>
        </div>
      </header>

      <section className="flex sm:flex-row flex-col items-center justify-between w-full sm:h-[85%] h-[80%]">
        <ToDo />

        <div className="sm:flex hidden flex-col items-center justify-between w-[42%] sm:h-full">
          <Search />

          <div className="flex flex-row items-center justify-between w-full h-[52%] custom-direction">
            <Currency />
          </div>
        </div>

        <div className="flex flex-col items-center justify-between sm:w-[26%] w-[22rem] sm:h-full h-[50%] rounded-2xl">
          <Weather />
          <Calendar />
        </div>
      </section>
    </main>
  );
};
export default Origin;
