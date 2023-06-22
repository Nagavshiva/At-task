import axios from "axios";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from 'react-datetime-picker';


// eslint-disable-next-line react/prop-types
const Add = ({ show }) => {
  const location = useLocation();

  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleCancel = () => {
    show();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskDescription || !taskDate || !taskTime || !assignedUser) {
      console.error("Please fill in all the required fields.");
      return;
    }

    setIsSaving(true);

    try {
      const { user: { id }, companyId, accessToken } = location.state;

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

      const response = await axios.post(
        `http://localhost:3001/team?userId=${id}&companyId=${companyId}`,
        taskData,
        { headers }
      );

      console.log("Task created:", response.data);

      // Clear form fields
      setTaskDescription("");
      setTaskDate(new Date());
      setTaskTime("");
      setAssignedUser("");
    } catch (error) {
      console.error("Task creation failed:", error);
    }

    setIsSaving(false);
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
            < DateTimePicker
              value={taskDate}
              onChange={(date) => setTaskDate(date)}
            />
          </div>

          <div className="task-time">
            <label>Time</label>
            <DateTimePicker
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
        <div className="task-button">
          <button type="submit" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Add;


