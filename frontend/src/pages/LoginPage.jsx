import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResponse,setIsResponse] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch("https://authentication-node-js.onrender.com/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        credentials: "include", 
        body: JSON.stringify({
          username: email, 
          password,
        }),
      });
      
      if (response.status !== 200) {
        throw new Error("Login failed");
      }

      const data = await response.json(); 

      navigate("/user")
       

    } catch (error) {
      console.error("Error:", error); 
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            type="text" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
