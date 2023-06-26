import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// eslint-disable-next-line react/prop-types
const Update = ({decrementTaskCount}) => {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState("");
  const [assignedUser, setAssignedUser] = useState("");

 

  const navigate = useNavigate();
  const storedTeamId = localStorage.getItem("team_id");
  const team_id = storedTeamId;
  console.log(team_id)
  const storedAccessToken = localStorage.getItem("accessToken");
  const accessToken = storedAccessToken;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskDescription || !taskDate || !taskTime || !assignedUser) {
      console.error("Please fill in all the required fields.");
      return;
    }

    try {
      const taskData = {
        assigned_user: assignedUser,
        task_date: taskDate.toISOString().split("T")[0],
        task_time: taskTime,
        time_zone: new Date().getTimezoneOffset() * 60,
        task_msg: taskDescription,
      };

      const headers = {
        Authorization: "Bearer " + accessToken,
      };

      const response = await axios.put(
        `https://648d83852de8d0ea11e7ec7e.mockapi.io/team/${team_id}`,
        taskData,
        { headers }
      );

      console.log("Task updated:", response.data);
      navigate("/get");
    } catch (error) {
      console.error("Task update failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const headers = {
        Authorization: "Bearer " + accessToken,
      };

      const response = await axios.delete(
        `https://648d83852de8d0ea11e7ec7e.mockapi.io/team/${team_id}`,
        { headers }
      );

      console.log("Task deleted:", response.data);
      decrementTaskCount()
      navigate("/side");
    } catch (error) {
      console.error("Task deletion failed:", error);
    }
  };

  return (
    <>
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
        </div>

        {/* Form buttons */}
        <div className="task-update-button">
          <span>
            <AiFillDelete className="delete-btn" onClick={handleDelete} />
          </span>
          <div className="rigt-btn">
            <Link to='/get'>
              <button className="cancel-btn">Cancel</button>
            </Link>
            <button type="submit" className="save-btn">
              Update
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Update;
