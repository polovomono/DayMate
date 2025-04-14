import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import { IoIosAdd } from "react-icons/io";
import { IoMdPricetag } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import { MdOutlineDescription } from "react-icons/md";
import Popover from "../Extra/popOver";
import MiniCalendar from "../Extra/miniCalendar";

const PRIORITY_COLORS = {
  RED: "red",
  YELLOW: "yellow",
  GREEN: "green",
};

const useTaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [visibleDescriptionId, setVisibleDescriptionId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const handleTaskComplete = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleTaskDelete = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    if (editingTaskId === index) {
      setTasks((prevTasks) =>
        prevTasks.map((task, i) =>
          i === index
            ? { ...task, title: editTitle, description: editDescription }
            : task
        )
      );
      setEditingTaskId(null);
    } else {
      setEditTitle(tasks[index].title);
      setEditDescription(tasks[index].description);
      setEditingTaskId(index);
    }
  };

  const handleEditTitleChange = (value) => {
    setEditTitle(value);
  };

  const handleEditDescriptionChange = (value) => {
    setEditDescription(value);
  };

  return {
    tasks,
    setTasks,
    visibleDescriptionId,
    setVisibleDescriptionId,
    editingTaskId,
    editTitle,
    editDescription,
    handleTaskComplete,
    handleTaskDelete,
    handleEditTask,
    handleEditTitleChange,
    handleEditDescriptionChange,
    setEditTitle,
    setEditDescription,
  };
};

const TaskHeader = ({ isShown, onToggle }) => (
  <div className="flex flex-row items-center justify-between w-full">
    <h2 className="text-xl font-bold custom-darkNavy-color">دست نویس</h2>
    <button onClick={onToggle}>
      {isShown ? (
        <BiSolidShow className="px-1 py-1 w-8 h-8 rounded hover:cursor-pointer custom-darkNavy-color custom-gray-bg" />
      ) : (
        <BiSolidHide className="px-1 py-1 w-8 h-8 rounded hover:cursor-pointer custom-darkNavy-color custom-gray-bg" />
      )}
    </button>
  </div>
);

const TaskItem = ({
  task,
  index,
  onComplete,
  onDelete,
  onEdit,
  editingTaskId,
  editTitle,
  visibleDescriptionId,
  editDescription,
  setVisibleDescriptionId,
  onEditTitleChange,
  onEditDescriptionChange,
}) => {
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

  const toPersianNumber = (num) => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return String(num)
      .split("")
      .map((digit) => persianDigits[digit] || digit)
      .join("");
  };

  const formatDate = (date) => {
    if (!date) return null;
    return `${toPersianNumber(date)} ${persianMonths[0]}`; // Using first month for now
  };

  return (
    <div
      className={`flex flex-col justify-between w-full rounded-lg custom-mt-2 custom-gray-border ${
        task.completed ? "opacity-30" : "opacity-100"
      }`}
    >
      <div className="flex flex-col justify-between p-2 w-full h-18 rounded-lg">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="w-[85%] flex flex-row items-center overflow-x-hidden">
            <input
              type="checkbox"
              className="w-3 h-3 rounded-sm border-2 accent-teal-500 custom-ml"
              onChange={() => onComplete(index)}
            />
            {editingTaskId === index ? (
              <input
                value={editTitle}
                onChange={(e) => onEditTitleChange(e.target.value)}
                className="px-1 text-sm font-bold rounded-md focus:outline-none custom-gray-border"
                autoFocus
              />
            ) : (
              <h3
                className={`text-sm font-bold underline underline-offset-5 decoration-2 whitespace-nowrap overflow-hidden text-ellipsis ${
                  task.color === "red"
                    ? "decoration-red-500"
                    : task.color === "yellow"
                    ? "decoration-yellow-500"
                    : task.color === "green"
                    ? "decoration-green-500"
                    : "decoration-gray-500"
                }`}
              >
                {task.title}
              </h3>
            )}
          </div>

          <div className="flex flex-row items-center justify-between w-10">
            <button onClick={() => onEdit(index)}>
              <MdOutlineEdit
                className={`${
                  editingTaskId === index
                    ? "text-teal-500"
                    : "text-gray-700 hover:text-teal-500"
                }`}
              />
            </button>

            <button onClick={() => onDelete(index)}>
              <FaRegTrashCan className="text-gray-700 hover:text-red-700" />
            </button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <button
            className="hover:cursor-pointer"
            onClick={() => {
              if (visibleDescriptionId === index) {
                setVisibleDescriptionId(null);
              } else {
                setVisibleDescriptionId(index);
              }
            }}
          >
            <MdOutlineDescription
              className={`${
                visibleDescriptionId === index ? "text-black" : "text-gray-500"
              }`}
            />
          </button>

          <div className="flex flex-row items-center justify-end w-[90%] overflow-hidden">
            {task.dueDate && (
              <span className="text-xs font-semibold px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md custom-ml">
                {formatDate(task.dueDate)}
              </span>
            )}
            {task.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs bg-blue-300 rounded-md custom-ml"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p
        className={`px-2 py-1 text-sm text-black rounded-b-md custom-mt custom-gray-bg whitespace-pre-wrap ${
          visibleDescriptionId === index ? "block" : "hidden"
        }`}
      >
        {editingTaskId === index ? (
          <textarea
            value={editDescription}
            onChange={(e) => onEditDescriptionChange(e.target.value)}
            className="w-full px-1 py-1 text-sm rounded-md focus:outline-none custom-gray-border custom-whiteLess-bg resize-none"
            rows={3}
          />
        ) : (
          task.description
        )}
      </p>
    </div>
  );
};

const ToDo = () => {
  const [uiState, setUiState] = useState({
    isShown: true,
    isDetailsVisible: false,
    isPopoverOpen: false,
    isCalendarOpen: false,
  });

  const [newTaskState, setNewTaskState] = useState({
    title: "",
    description: "",
    tags: [],
    selectedColor: "",
    dueDate: null,
  });

  const taskManager = useTaskManager();

  const handleAddTask = () => {
    if (!newTaskState.title.trim()) return;

    const newTask = {
      title: newTaskState.title,
      description: newTaskState.description,
      tags: newTaskState.tags,
      color: newTaskState.selectedColor,
      completed: false,
      dueDate: newTaskState.dueDate,
    };

    taskManager.setTasks((prevTasks) => [...prevTasks, newTask]);

    setNewTaskState({
      title: "",
      description: "",
      tags: [],
      selectedColor: "",
      dueDate: null,
    });
  };

  const handleAddTag = (tag, isRemove = false) => {
    setNewTaskState((prev) => ({
      ...prev,
      tags: isRemove ? [] : [tag],
    }));
  };

  const handleDateSelect = (date) => {
    setNewTaskState((prev) => ({
      ...prev,
      dueDate: date,
    }));
    setUiState((prev) => ({
      ...prev,
      isCalendarOpen: false,
    }));
  };

  return (
    <section className="flex flex-col items-center justify-between px-3 py-4 sm:w-[26%] w-[22rem] sm:h-[100%] h-[45%] rounded-2xl shadow-lg custom-whiteLess-bg">
      <TaskHeader
        isShown={uiState.isShown}
        onToggle={() =>
          setUiState((prev) => ({ ...prev, isShown: !prev.isShown }))
        }
      />

      <div
        className={`flex flex-col items-start w-full h-[75%] overflow-y-auto ${
          uiState.isShown ? "blur-md" : "blur-none"
        }`}
      >
        {taskManager.tasks.length > 0 ? (
          taskManager.tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              index={index}
              onComplete={taskManager.handleTaskComplete}
              onDelete={taskManager.handleTaskDelete}
              onEdit={taskManager.handleEditTask}
              editingTaskId={taskManager.editingTaskId}
              editTitle={taskManager.editTitle}
              visibleDescriptionId={taskManager.visibleDescriptionId}
              editDescription={taskManager.editDescription}
              setVisibleDescriptionId={taskManager.setVisibleDescriptionId}
              onEditTitleChange={taskManager.handleEditTitleChange}
              onEditDescriptionChange={taskManager.handleEditDescriptionChange}
            />
          ))
        ) : (
          <p className="text-sm text-gray-500">هیچ تسکی اضافه نشده است.</p>
        )}
      </div>

      <div className="flex flex-row items-start justify-between w-full h-[15%]">
        <div className="flex flex-col items-center justify-between w-[82%] h-[100%]">
          <input
            placeholder="نوشتن تسک جدید"
            className="px-2 w-full h-[40%] text-sm font-semibold rounded-md transition duration-150 focus:placeholder-emerald-600 focus:outline-0 focus:caret-[#3f75ff] custom-gray-border"
            onFocus={() =>
              setUiState((prev) => ({ ...prev, isDetailsVisible: true }))
            }
            value={newTaskState.title}
            onChange={(e) =>
              setNewTaskState((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <div
            className={`flex flex-col items-start justify-between w-full h-[50%] transition-all duration-300 ${
              uiState.isDetailsVisible
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <textarea
              placeholder="توضیحات بیشتر..."
              className="px-2 w-full text-[0.8rem] text-gray-700 rounded-md focus:outline-0"
              value={newTaskState.description}
              rows={1}
              onChange={(e) =>
                setNewTaskState((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />

            <div className="flex flex-row items-center justify-between px-2 w-full mt-2">
              <div className="relative mt-4">
                <button
                  className="flex flex-row items-center justify-between text-sm w-15 transition hover:cursor-pointer text-gray-700 hover:text-black"
                  onClick={() =>
                    setUiState((prev) => ({
                      ...prev,
                      isPopoverOpen: !prev.isPopoverOpen,
                    }))
                  }
                >
                  <IoMdPricetag className="w-4 h-4 mr-2" />
                  برچسب
                </button>

                <Popover
                  isOpen={uiState.isPopoverOpen}
                  onClose={() =>
                    setUiState((prev) => ({ ...prev, isPopoverOpen: false }))
                  }
                  onAddTag={handleAddTag}
                  tags={newTaskState.tags}
                />
              </div>

              <div className="relative mt-4">
                <button
                  className="flex flex-row items-center justify-between text-sm w-15 transition hover:cursor-pointer text-gray-700 hover:text-black"
                  onClick={() =>
                    setUiState((prev) => ({
                      ...prev,
                      isCalendarOpen: !prev.isCalendarOpen,
                    }))
                  }
                >
                  <FaCalendarAlt className="w-3 h-3 mr-2" />
                  سررسید
                </button>

                <MiniCalendar
                  isOpen={uiState.isCalendarOpen}
                  onClose={() =>
                    setUiState((prev) => ({ ...prev, isCalendarOpen: false }))
                  }
                  onDateSelect={handleDateSelect}
                  selectedDate={newTaskState.dueDate}
                />
              </div>

              <div className="flex flex-row items-center justify-between w-12">
                <button
                  type="button"
                  onClick={() =>
                    setNewTaskState((prev) => ({
                      ...prev,
                      selectedColor: "green",
                    }))
                  }
                  className={`w-3 h-3 rounded-full bg-green-500 transition-opacity duration-150 ${
                    newTaskState.selectedColor === "green"
                      ? "opacity-100"
                      : "opacity-50"
                  } hover:opacity-100 hover:cursor-pointer`}
                ></button>

                <button
                  type="button"
                  onClick={() =>
                    setNewTaskState((prev) => ({
                      ...prev,
                      selectedColor: "yellow",
                    }))
                  }
                  className={`w-3 h-3 rounded-full bg-yellow-500 transition-opacity duration-150 ${
                    newTaskState.selectedColor === "yellow"
                      ? "opacity-100"
                      : "opacity-50"
                  } hover:opacity-100 hover:cursor-pointer`}
                ></button>

                <button
                  type="button"
                  onClick={() =>
                    setNewTaskState((prev) => ({
                      ...prev,
                      selectedColor: "red",
                    }))
                  }
                  className={`w-3 h-3 rounded-full bg-red-500 transition-opacity duration-150 ${
                    newTaskState.selectedColor === "red"
                      ? "opacity-100"
                      : "opacity-50"
                  } hover:opacity-100 hover:cursor-pointer`}
                ></button>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handleAddTask}
          className={`flex items-center justify-center w-[15%] transition hover:cursor-pointer hover:-translate-y-1 rounded-md custom-blue-bg ${
            uiState.isDetailsVisible ? "h-[100%]" : "h-[40%]"
          }`}
        >
          <IoIosAdd className="w-6 h-6 custom-white-color" />
        </button>
      </div>
    </section>
  );
};

export default ToDo;
