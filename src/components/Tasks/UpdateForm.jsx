/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

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
    const selectedTime = new Date(taskTime);
    const hoursInSeconds = selectedTime.getHours() * 3600;
    const minutesInSeconds = selectedTime.getMinutes() * 60;
    const seconds = hoursInSeconds + minutesInSeconds;

    const updatedTaskData = {
      assigned_user: assignedUser,
      task_date: taskDate.toISOString().split("T")[0],
      task_time: seconds,
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
    await deleteTask(decrementTaskCount, showTask);
 
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

      {/* Task date input with date picker */}
      <div className="task-dt">
        <div className="task-date">
          <label>Date</label>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M5.625 9H4.375C4.27562 8.99974 4.1804 8.96014 4.11013 8.88987C4.03986 8.8196 4.00026 8.72437 4 8.625V7.375C4 7.169 4.169 7 4.375 7H5.625C5.831 7 6 7.169 6 7.375V8.625C5.99974 8.72437 5.96014 8.8196 5.88987 8.88987C5.8196 8.96014 5.72438 8.99974 5.625 9ZM9 8.625V7.375C8.99974 7.27562 8.96014 7.1804 8.88987 7.11013C8.8196 7.03986 8.72438 7.00026 8.625 7H7.375C7.27562 7.00026 7.1804 7.03986 7.11013 7.11013C7.03986 7.1804 7.00026 7.27562 7 7.375V8.625C7 8.831 7.169 9 7.375 9H8.625C8.72438 8.99974 8.8196 8.96014 8.88987 8.88987C8.96014 8.8196 8.99974 8.72437 9 8.625ZM12 8.625V7.375C11.9997 7.27562 11.9601 7.1804 11.8899 7.11013C11.8196 7.03986 11.7244 7.00026 11.625 7H10.375C10.2756 7.00026 10.1804 7.03986 10.1101 7.11013C10.0399 7.1804 10.0003 7.27562 10 7.375V8.625C10 8.831 10.169 9 10.375 9H11.625C11.7244 8.99974 11.8196 8.96014 11.8899 8.88987C11.9601 8.8196 11.9997 8.72437 12 8.625ZM9 11.625V10.375C8.99974 10.2756 8.96014 10.1804 8.88987 10.1101C8.8196 10.0399 8.72438 10.0003 8.625 10H7.375C7.27562 10.0003 7.1804 10.0399 7.11013 10.1101C7.03986 10.1804 7.00026 10.2756 7 10.375V11.625C7 11.831 7.169 12 7.375 12H8.625C8.72438 11.9997 8.8196 11.9601 8.88987 11.8899C8.96014 11.8196 8.99974 11.7244 9 11.625ZM6 11.625V10.375C5.99974 10.2756 5.96014 10.1804 5.88987 10.1101C5.8196 10.0399 5.72438 10.0003 5.625 10H4.375C4.27562 10.0003 4.1804 10.0399 4.11013 10.1101C4.03986 10.1804 4.00026 10.2756 4 10.375V11.625C4 11.831 4.169 12 4.375 12H5.625C5.72438 11.9997 5.8196 11.9601 5.88987 11.8899C5.96014 11.8196 5.99974 11.7244 6 11.625ZM12 11.625V10.375C11.9997 10.2756 11.9601 10.1804 11.8899 10.1101C11.8196 10.0399 11.7244 10.0003 11.625 10H10.375C10.2756 10.0003 10.1804 10.0399 10.1101 10.1101C10.0399 10.1804 10.0003 10.2756 10 10.375V11.625C10 11.831 10.169 12 10.375 12H11.625C11.7244 11.9997 11.8196 11.9601 11.8899 11.8899C11.9601 11.8196 11.9997 11.7244 12 11.625ZM15 3.5V14.5C15 14.8978 14.842 15.2794 14.5607 15.5607C14.2794 15.842 13.8978 16 13.5 16H2.5C2.10218 16 1.72064 15.842 1.43934 15.5607C1.15804 15.2794 1 14.8978 1 14.5V3.5C1 3.10218 1.15804 2.72064 1.43934 2.43934C1.72064 2.15804 2.10218 2 2.5 2H4V0.375C4 0.169 4.169 0 4.375 0H5.625C5.831 0 6 0.169 6 0.375V2H10V0.375C10 0.169 10.169 0 10.375 0H11.625C11.831 0 12 0.169 12 0.375V2H13.5C13.8978 2 14.2794 2.15804 14.5607 2.43934C14.842 2.72064 15 3.10218 15 3.5ZM13.5 14.313V5H2.5V14.313C2.5 14.416 2.584 14.5 2.688 14.5H13.312C13.3619 14.5 13.4097 14.4802 13.4449 14.4449C13.4802 14.4097 13.5 14.3619 13.5 14.312V14.313Z"
                fill="#262E39"
              />
            </svg>
          </span>
          <DatePicker
            className="custom-datepicker"
            selected={taskDate}
            onChange={(date) => setTaskDate(date)}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <div className="task-time">
          <label>Time</label>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.344 4.281C7.344 3.918 7.636 3.625 8 3.625C8.364 3.625 8.656 3.918 8.656 4.281V7.65L10.989 9.203C11.289 9.405 11.371 9.813 11.147 10.113C11.1027 10.1856 11.0436 10.2481 10.9734 10.2962C10.9032 10.3443 10.8237 10.377 10.74 10.3921C10.6562 10.4072 10.5703 10.4044 10.4877 10.3839C10.4052 10.3634 10.3279 10.3256 10.261 10.273L7.636 8.523C7.453 8.423 7.344 8.219 7.344 7.975V4.281ZM8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1ZM2.312 8C2.31187 8.747 2.4589 9.4867 2.74471 10.1769C3.03051 10.867 3.44948 11.4941 3.97768 12.0223C4.50589 12.5505 5.13298 12.9695 5.82314 13.2553C6.5133 13.5411 7.253 13.6881 8 13.688C8.747 13.6881 9.4867 13.5411 10.1769 13.2553C10.867 12.9695 11.4941 12.5505 12.0223 12.0223C12.5505 11.4941 12.9695 10.867 13.2553 10.1769C13.5411 9.4867 13.6881 8.747 13.688 8C13.6881 7.253 13.5411 6.5133 13.2553 5.82314C12.9695 5.13298 12.5505 4.50589 12.0223 3.97768C11.4941 3.44948 10.867 3.03051 10.1769 2.74471C9.4867 2.4589 8.747 2.31187 8 2.312C7.253 2.31187 6.5133 2.4589 5.82314 2.74471C5.13298 3.03051 4.50589 3.44948 3.97768 3.97768C3.44948 4.50589 3.03051 5.13298 2.74471 5.82314C2.4589 6.5133 2.31187 7.253 2.312 8Z"
                fill="#262E39"
              />
            </svg>
          </span>
          <DatePicker
            className="custom-datepicker"
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            dateFormat="h:mm aa"
            selected={taskTime}
            onChange={(date) => setTaskTime(date)}
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
          {/* <span className="arrow-up">&#9650;</span>
          <span className="arrow-down">&#9660;</span> */}
          <svg
          className="arrow-up"
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
          >
            <path
              d="M8 4.33203L4 0.332031L-1.19209e-07 4.33203L8 4.33203Z"
              fill="#262E39"
            />
          </svg>
          <svg
          className="arrow-down"
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="4"
            viewBox="0 0 8 4"
            fill="none"
          >
            <path d="M0 0L4 4L8 0H0Z" fill="#262E39" />
          </svg>
        </div>
      </div>

      <div className="task-update-button">
        <span>
{/* <AiFillDelete className="delete-btn" onClick={handleDelete} /> */}
<svg  onClick={handleDelete} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
  <path d="M12.6667 2.66667H10.3333L9.66668 2H6.33334L5.66668 2.66667H3.33334V4H12.6667M4.00001 12.6667C4.00001 13.0203 4.14049 13.3594 4.39053 13.6095C4.64058 13.8595 4.97972 14 5.33334 14H10.6667C11.0203 14 11.3594 13.8595 11.6095 13.6095C11.8595 13.3594 12 13.0203 12 12.6667V4.66667H4.00001V12.6667Z" fill="#999999"/>
</svg>
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
