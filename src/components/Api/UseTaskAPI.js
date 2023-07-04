import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UseTaskAPI = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 
// create
  const createTask = async (taskData,incrementTaskCount) => {
    try {
      setLoading(true);
      const companyId = localStorage.getItem("companyId");
      const accessToken = localStorage.getItem("accessToken");

      const headers = {
        Authorization: "Bearer " + accessToken,
      };

      const response = await axios.post(
        `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2?company_id=${companyId}`,
        taskData,
        { headers }
      );

      const data = response.data;
      console.log("Task created:", data);
      const id = data.results.id;
      localStorage.setItem("task_id", id);
      incrementTaskCount()
      setLoading(false);
      navigate("/get");
    } catch (error) {
      console.error("Task creation failed:", error);
      setLoading(false);
    }
  };

 
//  update
  const updateTask = async (updatedTaskData) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const companyId = localStorage.getItem("companyId");
      const taskId = localStorage.getItem("task_id");
console.log(taskId)
      const headers = {
        Authorization: "Bearer " + accessToken,
      };

      const response = await axios.put(
        `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${taskId}?company_id=${companyId}`,
        updatedTaskData,
        { headers }
      );

      console.log("Task updated:", response.data);
      setLoading(false);
      navigate("/get");
    } catch (error) {
      console.error("Task update failed:", error);
      setLoading(false);
    }
  };

 
//update
  const deleteTask = async (decrementTaskCount,showTask) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const companyId = localStorage.getItem("companyId");
      const taskId = localStorage.getItem("task_id");
      const headers = {
        Authorization: "Bearer " + accessToken,
      };

      await axios.delete(
        `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${taskId}?company_id=${companyId}`,
        { headers }
      );

      console.log("Task deleted.");
      decrementTaskCount()
      showTask(false)
      setLoading(false);
      navigate("/side");
    } catch (error) {
      console.error("Task deletion failed:", error);
      setLoading(false);
    }
  };


// getbyId
  const getTaskById = async (taskId) => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      const companyId = localStorage.getItem("companyId");

      const headers = {
        Authorization: "Bearer " + accessToken,
      };

      const response = await axios.get(
        `https://stage.api.sloovi.com/task/lead_65b171d46f3945549e3baa997e3fc4c2/${taskId}?company_id=${companyId}`,
        { headers }
      );

      const task = response.data;
      console.log("Task retrieved:", task);
      localStorage.setItem("task", task);
      setLoading(false);
      return task;
    } catch (error) {
      console.error("Task retrieval failed:", error);
      setLoading(false);
      navigate("/side");
    }
  };



  return { loading, createTask, updateTask, deleteTask, getTaskById };
};

export default UseTaskAPI;
