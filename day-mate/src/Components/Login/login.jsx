import { useState, useMemo } from "react";
import "../../Components/global.css";
import Dot from "../Extra/dot";
import { RxCross2 } from "react-icons/rx";
import { loginUser } from "../../Common/Utils/api";
import { useNavigate } from "react-router-dom";

const InputField = ({ id, type, placeholder, value, onChange }) => (
  <div className="relative w-[80%] mb-4">
    <input
      id={id}
      name={id}
      type={type}
      placeholder={placeholder}
      className="rounded-md p-4 h-[3rem] w-full focus:outline-none placeholder-shown:placeholder-opacity-100 placeholder-opacity-0 transition-all duration-200 custom-whiteLess-bg"
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

const ErrorPopup = ({ message, onClose }) => (
  <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slideDown z-50 custom-red-bg custom-white-color">
    <span className="font-medium whitespace-nowrap">{message}</span>
    <button
      onClick={onClose}
      className="custom-whiteLess-bg rounded-full p-1 hover:cursor-pointer transition custom-red-color"
    >
      <RxCross2 />
    </button>
  </div>
);

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", isLogin: false });
  const [errorPopup, setErrorPopup] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const toggleLoginMode = () => {
    setForm({ email: "", password: "", isLogin: !form.isLogin });
    setErrorPopup("");
    setIsButtonDisabled(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorPopup("");

    try {
      const data = await loginUser(form.email, form.password);
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      console.log("Login successful!");
    } catch (err) {
      /* setErrorPopup(
        form.isLogin ? "ایمیل یا رمز عبور اشتباه است!" : "ایمیل اشتباه است!"
      ); */
      // setIsButtonDisabled(true);
      navigate("/loading/origin");
    }
  };

  const dots = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => (
        <Dot key={i} className="pointer-events-none" />
      )),
    []
  );

  return (
    <div className="relative flex flex-row items-center justify-between sm:w-[65rem] sm:h-[38rem] w-[100%] h-[35rem]">
      <div className="absolute inset-0 flex flex-wrap pointer-events-none">
        {dots}
      </div>

      {errorPopup && (
        <ErrorPopup
          message={errorPopup}
          onClose={() => {
            setErrorPopup("");
            setIsButtonDisabled(false);
          }}
        />
      )}

      <div className="flex flex-col items-center justify-between sm:p-10 sm:w-[45%] sm:h-[85%] p-5 w-[21rem] h-[35rem] rounded-3xl custom-lightBlue-bg">
        <h1 className="text-4xl font-bold custom-alexandria-font custom-darkNavy-color">
          دی میت
        </h1>

        <div className="flex flex-col items-center justify-between h-[4.5rem]">
          <h2 className="text-3xl font-bold custom-white2-color">خوش اومدی!</h2>
          <p className="font-medium sm:text-[1rem] custom-gray-color">
            {form.isLogin
              ? "برای ورود لطفا ایمیل و رمز عبورت رو وارد کن"
              : "برای ثبت نام لطفا ایمیلت رو وارد کن"}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-between w-full h-[40%]"
        >
          <InputField
            id="email"
            type="email"
            placeholder="ایمیل"
            value={form.email}
            onChange={handleChange}
          />
          {form.isLogin && (
            <InputField
              id="password"
              type="password"
              placeholder="رمز عبور"
              value={form.password}
              onChange={handleChange}
            />
          )}

          <button
            type="submit"
            disabled={
              !form.email ||
              (form.isLogin && !form.password) ||
              isButtonDisabled
            }
            className="font-bold py-2 w-[80%] rounded-xl transition duration-200 hover:opacity-90 hover:cursor-pointer active:scale-90 disabled:opacity-50 disabled:cursor-not-allowed custom-white-color custom-darkNavy-bg"
          >
            {form.isLogin ? "ورود" : "ثبت نام"}
          </button>
        </form>

        <p className="custom-white-color">
          {form.isLogin ? "قبلا ثبت نام نکردید؟" : "قبلا ثبت نام کردید؟"}{" "}
          <button
            onClick={toggleLoginMode}
            className="underline hover:cursor-pointer custom-darkNavy-color"
          >
            {form.isLogin ? "ثبت نام" : "ورود"}
          </button>
        </p>
      </div>

      <div className="sm:flex hidden items-center justify-center w-[50%] h-full rounded-3xl custom-login-banner">
        <div className="flex flex-col items-start justify-between bg-transparent w-[85%] h-[90%] rounded-2xl">
          <h1 className="text-3xl font-bold w-[25rem] custom-white2-color">
            دی میت <br /> دستیار هوشمند روزانه شما!
          </h1>
          <p className="w-[95%] font-bold text-lg custom-white2-color">
            با دی میت برنامه‌ریزی روزانه‌تان را ساده کنید! یک اپلیکیشن همه‌کاره
            که شامل تقویم هوشمند، پیش‌بینی دقیق آب‌وهوا و یک لیست کارهای روزانه
            است.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
