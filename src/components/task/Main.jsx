import { useState } from "react";
// import Add from "./Add";
import Get from "./Get";
import Update from "./Update"


const Main = () => {
  // const [showTask, setShowTask] = useState(false);
    const [showUpdate,setShowUpdate] = useState(false);
  // const handleAdd = () => {
  //   setShowTask(true);
  // };

  // const handleClose = () => {
  //   setShowTask(false);
  // };

  const handleCancelUpdate = ()=>{
    setShowUpdate(showUpdate)
  }
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
          {/* <button onClick={handleAdd}>+</button> */}
        </div>

        {/* {showTask && <Add show={handleClose} />} */}
        <Get/>
         <div>
          <Update shows={handleCancelUpdate}/>
        </div>
      </div>
    </>
  );
};

export default Main;

