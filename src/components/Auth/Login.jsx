import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const navigate =  useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/users", 
      {
          email,
          password,
      });


        // Login successful
        const user = response.data;
        console.log(user)
        const companyId = uuidv4();
        const accessToken = uuidv4(); 
    
        // Do something with the user data and access token
        console.log("Company ID:", companyId);
        console.log("Access Token:", accessToken);   

        navigate("/side",{ state: { user, companyId, accessToken } });
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
