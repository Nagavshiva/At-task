import { useState } from "react";
import { useLocation } from "react-router-dom";
import TaskDetails from "../Tasks/TaskDetails";
import TaskForm from "../Tasks/TaskForm";
import UpdateForm from "../Tasks/UpdateForm";

const Main = () => {
  const [showTask, setShowTask] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [taskData, setTaskData] = useState(null); 
  const location = useLocation();

  const handleAdd = () => {
    setShowTask(true);
  };

  const handleClose = () => {
    setShowTask(false);
  };

  const incrementTaskCount = () => {
    setTaskCount((prevCount) => prevCount + 1);
  };

  const decrementTaskCount = () => {
    setTaskCount((prevCount) => prevCount - 1);
  };

  return (
    <>
      <div className="main-container">
        <div className="main-head">
          <p>Test</p>
          <a>sloovi.com</a>
          <span>Add description</span>
        </div>

        <div className="main-taskbox">
          <p>Task{taskCount}</p>
          {location.pathname === "/side" && (
            <button onClick={handleAdd}>+</button>
          )}
        </div>

        {showTask && location.pathname === "/side" && (
          <TaskForm
            show={handleClose}
            incrementTaskCount={incrementTaskCount}
          />
        )}

        {location.pathname.startsWith("/update/") && (
          <UpdateForm
            showTask={setShowTask}
            decrementTaskCount={decrementTaskCount}
            task_msg={taskData.task_msg}
            task_date={taskData.task_date}
            task_time={taskData.task_time}
            assigned_user={taskData.assigned_user}
          />
        )}

        {location.pathname === "/get" && <TaskDetails setTaskData={setTaskData} />} 
      </div>
    </>
  );
};

export default Main;
