import { useState, useEffect } from "react";
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
    setTaskCount((prevCount) => {
      const newCount = prevCount + 1;
      localStorage.setItem("taskCount", newCount);
      return newCount;
    });
  };

  const decrementTaskCount = () => {
    setTaskCount((prevCount) => {
      const newCount = prevCount - 1;
      localStorage.setItem("taskCount", newCount);
      return newCount;
    });
  };

  useEffect(() => {
    // Retrieve taskCount from localStorage on component mount
    const storedTaskCount = localStorage.getItem("taskCount");

    if (storedTaskCount) {
      setTaskCount(Number(storedTaskCount));
    }

    // Retrieve taskData from localStorage on component mount
    const storedTaskData = localStorage.getItem("taskData");

    if (storedTaskData) {
      setTaskData(JSON.parse(storedTaskData));
    }
  }, []);



  return (
    <>
      <div className="main-container">
        <div className="main-head">
          <p>Test</p>
          <a>sloovi.com</a>
          <span>Add description</span>
        </div>

        <div className="main-taskbox">
          <p>Tasks {taskCount}</p>
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

        {location.pathname.startsWith("/update/") && taskData !== null && (
          <UpdateForm
            showTask={setShowTask}
            decrementTaskCount={decrementTaskCount}
            assigned_user={taskData.assigned_user}
            task_date={taskData.task_date}
            task_time={taskData.task_time}
            task_msg={taskData.task_msg}
          />
        )}

        {location.pathname === "/get" && (
          <TaskDetails setTaskData={setTaskData}  />
        )}
      </div>
    </>
  );
};

export default Main;
