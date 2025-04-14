import React, { useState, useRef, useEffect } from "react";
import "/DayMate/day-mate/src/Components/global.css";
import { IoIosAdd } from "react-icons/io";
import { IoMdPricetag } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";

const CustomPopover = ({ isOpen, onClose, onAddTag, tags }) => {
  const [newTag, setNewTag] = useState("");
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      onAddTag(newTag);
      setNewTag("");
    }
  };

  return (
    <div
      ref={popoverRef}
      className={`absolute -right-10 -top-20 w-64  px-4 py-3 shadow-lg rounded-xl transition-all duration-150 custom-whiteLess-bg ${
        isOpen
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <ul className="space-y-1">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="flex items-center justify-between px-3 py-1 rounded-md text-sm font-medium custom-darkNavy-color"
          >
            <div className="flex flex-row items-center justify-between">
              <IoMdPricetag className="custom-ml" />
              {tag}
            </div>
            <button onClick={() => onAddTag(tag, true)}>
              <FaRegTrashCan className="text-gray-700 hover:text-red-700" />
            </button>
          </li>
        ))}
      </ul>
      <div className="flex flex-row items-center justify-between w-[90%]">
        <button onClick={handleAddTag} className="hover:cursor-pointer">
          <IoIosAdd className="rounded-sm custom-darkGray-bg custom-white-color" />
        </button>

        <input
          type="text"
          maxLength={22}
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="text-sm px-1 py-1 focus:outline-none placeholder:text-gray-400 placeholder:font-semibold"
          placeholder="افزودن برچسب جدید"
        />
      </div>
    </div>
  );
};

export default CustomPopover;
