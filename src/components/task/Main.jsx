import { useState } from "react";
import Add from "./Add";


const Main = () => {
  const [showTask, setShowTask] = useState(false);

  const handleAdd = () => {
    setShowTask(true);
  };

  const handleClose = () => {
    setShowTask(false);
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
          <p>Task 0</p>
          <button onClick={handleAdd}>+</button>
        </div>

        {showTask && 
          <Add show={handleClose} />
}
      </div>
    </>
  );
};

export default Main;

