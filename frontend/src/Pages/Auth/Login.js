import React, { useState } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { useAuth } from "../../context/Auth";

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
    const auth = useAuth();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      const res = await axios.post("/auth/login", {
        username,
        password,
      });
      auth.login(res.data.data);
    //   toast.success("Paskyra sėkmingai sukurta");
    } catch (err) {
    //   toast.error(err.response.data.mess);
    alert(err.response.data.mess);
    }
  };

  return (
    <div className="login-container center">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
        <button onClick={() => navigate("/register")}>go to register</button>
      </form>
      
    </div>
  );
}

export default LoginForm;
