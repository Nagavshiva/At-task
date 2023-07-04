import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useTaskAPI from "../Api/UseTaskAPI";
import { MdModeEdit, MdNotificationsPaused } from "react-icons/md";
import { TiTick } from "react-icons/ti";

// eslint-disable-next-line react/prop-types
const TaskDetails = ({ setTaskData }) => {
  const { loading, getTaskById } = useTaskAPI();
  const [task, setTask] = useState({});

  const taskId = localStorage.getItem("task_id");

  useEffect(() => {
    const fetchTask = async () => {
      const taskData = await getTaskById(taskId);
      setTaskData(taskData.results); // Pass task data to the parent component
      setTask(taskData);
    };

    fetchTask();
  }, [taskId, setTaskData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>Task not found.</div>;
  }

  return (
    <div>
      {task.results && (
        <div className="get-task-container" key={taskId}>
          <div className="left-content">
            <p className="spans1"></p>
            <div className="content">
              <p>{task.results.task_msg}</p>
              <span>{task.results.task_date}</span>
            </div>
          </div>

          <div className="right-icons">
            <Link to={`/update/${taskId}`}>
              <MdModeEdit className="icon" />
            </Link>
            <MdNotificationsPaused className="icon" />
            <TiTick className="icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
