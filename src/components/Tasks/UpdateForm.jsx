/* eslint-disable react/prop-types */


import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useTaskAPI from "../Api/UseTaskAPI";

const UpdateForm = ({
  decrementTaskCount,
  showTask,
  task_msg,
  task_date,
  task_time,
  assigned_user,
}) => {
  
  const [taskDescription, setTaskDescription] = useState(task_msg);
  const [taskDate, setTaskDate] = useState(new Date(task_date));
  const [taskTime, setTaskTime] = useState(task_time);
  const [assignedUser, setAssignedUser] = useState(assigned_user);

  const { updateTask, deleteTask } = useTaskAPI();

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

    const updatedTaskData = {
      assigned_user: assignedUser,
      task_date: taskDate.toISOString().split("T")[0],
      task_time:seconds,
      is_completed: 0,
      time_zone: new Date().getTimezoneOffset() * 60,
      task_msg: taskDescription,
    };

    await updateTask(updatedTaskData);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return;
    }
    await deleteTask(decrementTaskCount,showTask);
  };

  return (
    <form className="add-form-container" onSubmit={handleSubmit}>
      <div className="task-desc">
        <label>Task description</label>
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>

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

      <div className="task-update-button">
        <span>
          <AiFillDelete className="delete-btn" onClick={handleDelete} />
        </span>
        <div className="rigt-btn">
          <Link to="/get">
            <button className="cancel-btn">Cancel</button>
          </Link>
          <button type="submit" className="save-btn">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateForm;
