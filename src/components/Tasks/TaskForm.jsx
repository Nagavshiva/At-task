import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useTaskAPI from "../Api/UseTaskAPI";



// eslint-disable-next-line react/prop-types
const TaskForm = ({ incrementTaskCount, show }) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState("");
  const [assignedUser, setAssignedUser] = useState("");

  const { createTask } = useTaskAPI();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskDescription || !taskDate || !taskTime || !assignedUser) {
      console.error("Please fill in all the required fields.");
      return;
    }

    const timeComponents = taskTime.split(":");
    const hoursInSeconds = parseInt(timeComponents[0]) * 3600;
    const minutesInSeconds = parseInt(timeComponents[1]) * 60;
    const seconds = hoursInSeconds + minutesInSeconds;

    const taskData = {
      assigned_user: assignedUser,
      task_date: taskDate.toISOString().split("T")[0],
      task_time: seconds,
      is_completed: 0,
      time_zone: new Date().getTimezoneOffset() * 60,
      task_msg: taskDescription,
    };

    await createTask(taskData, incrementTaskCount);
  };

  return (
    <form className="add-form-container" onSubmit={handleSubmit}>
      {/* Task description input */}
      <div className="task-desc">
        <label>Task description</label>
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>

      {/* Task date input with date picker */}
      <div className="task-dt">
        <div className="task-date">
          <label>Date</label>
          <DatePicker
            selected={taskDate}
            onChange={(date) => setTaskDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="task-time">
          <label>Time</label>

          <input
            type="time"
            value={taskTime}
            onChange={(e) => setTaskTime(e.target.value)}
          />
        </div>
      </div>

      {/* Assigned user input */}
      <div className="task-assign">
        <label>Assign User</label>
        <input
          type="text"
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}
        />

        <div className="dropdown-arrow">
          <span className="arrow-up">&#9650;</span>
          <span className="arrow-down">&#9660;</span>
        </div>
      </div>

      {/* Form buttons */}
      <div className="task-button">
        <div className="rigt-btn">
          <button type="button" className="cancel-btn" onClick={show}>
            Cancel
          </button>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
