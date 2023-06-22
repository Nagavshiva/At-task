import {MdModeEdit,MdNotificationsPaused} from 'react-icons/md';
import {TiTick} from "react-icons/ti";


const Get = () => {
  return (
    <>
    <div className="get-task-container">
        <div className="left-content">
            <p className='spans1'></p>
            <div className="content">
                <p>follow up</p>
                <span>6/10/2021</span>
            </div>
        </div>

        <div className="right-icons">
            <MdModeEdit className='icon'/>
            <MdNotificationsPaused className='icon'/>
            <TiTick className='icon'/>
        </div>

    </div>
    </>
  )
}

export default Get;