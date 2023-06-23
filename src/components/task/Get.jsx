import { useEffect, useState } from "react";
import axios from "axios";
import { MdModeEdit, MdNotificationsPaused } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { Link } from "react-router-dom";

const Get = () => {
  const [taskData, setTaskData] = useState([]);
  const storedTeamId = localStorage.getItem("team_id");
  const team_id = storedTeamId;
  const storedAccessToken = localStorage.getItem("accessToken");
  const accessToken = storedAccessToken;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const id = localStorage.getItem("id");
      const companyId = localStorage.getItem("companyId");
      const headers = {
        Authorization: "Bearer " + accessToken,
      };
      const response = await axios.get(
        `http://localhost:3001/team?userId=${id}&teamId=${team_id}&companyId=${companyId}`,
        { headers }
      );
      console.log(response.data);
      setTaskData(response.data);
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  };

  return (
    <>
      {taskData.map((task) => (
        <div className="get-task-container" key={task.id}>
          <div className="left-content">
            <p className="spans1"></p>
            <div className="content">
              <p>{task.task_msg}</p>
              <span>{task.task_date}</span>
            </div>
          </div>

          <div className="right-icons">
            <Link to={`/update/${team_id}`}>
              <MdModeEdit className="icon" />
            </Link>
            <MdNotificationsPaused className="icon" />
            <TiTick className="icon" />
          </div>
        </div>
      ))}
    </>
  );
};

export default Get;
