import { useState } from "react";
import Add from "./Add";
import Get from "./Get";
import Update from "./Update";
import { useLocation } from "react-router-dom";

const Main = () => {
  const [showTask, setShowTask] = useState(false);
  const [taskCount, setTaskCount] = useState(0); 
  const location = useLocation();
  console.log(location);

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
          <a href="">sloovi.com</a>
          <span>Add description</span>
        </div>

        <div className="main-taskbox">
          <p>Task {taskCount}</p>
          {location.pathname === "/side" && (
            <button onClick={handleAdd}>+</button>
          )}
        </div>

        {showTask && location.pathname === "/side" && (
          <Add show={handleClose} incrementTaskCount={incrementTaskCount} />
        )}
        {location.pathname === "/get" && <Get />}
        {location.pathname.startsWith("/update/") && <Update  decrementTaskCount={decrementTaskCount} />}
      </div>
    </>
  );
};

export default Main;
