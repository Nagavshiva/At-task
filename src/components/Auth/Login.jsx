import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!email || !password){
      console.error("please fill the field")
      return
    }

    try {
      const response = await axios.post("https://648d83852de8d0ea11e7ec7e.mockapi.io/users", {
        email,
        password,
      });

      // Login successful
      const user = response.data;
      console.log(user);
      const companyId = uuidv4();
      const accessToken = uuidv4();

      // Store the data in localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("companyId", companyId);
      localStorage.setItem("accessToken", accessToken);

      navigate("/side");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
