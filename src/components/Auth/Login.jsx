import { useState } from "react";
import axios from "axios";
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
    if (password.length < 8) {
      console.error("Password must be at least 8 characters long");
      return;
    }

    try {
      const response = await axios.post("https://stage.api.sloovi.com/login?product=outreach", {
        email,
        password,
      });

      // Login successful
      const user = response.data;
      console.log(user);
      const companyId = user.results.company_id
      const accessToken =user.results.token
      const userId = user.results.user_id
      // Store the data in localStorage
      localStorage.setItem("user",  userId);
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
