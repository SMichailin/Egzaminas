import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { useAuth } from "../../context/Auth";

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_repeat, setPasswordRepeat] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  const handlePasswordRepeatChange = (event) => {
    setPasswordRepeat(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
        password_repeat,
      });
      auth.login(res.data.data);
    //   toast.success("Paskyra sėkmingai sukurta");
    } catch (err) {
    //   toast.error(err.response.data.mess);
    alert(err.response.data.mess);
    }
  };

  return (
    <div className="registration-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password_repeat">Password:</label>
          <input
            type="password"
            id="password_repeat"
            value={password_repeat}
            onChange={handlePasswordRepeatChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate("/login")}>go to Login</button>
    </div>
  );
}

export default RegistrationForm;
