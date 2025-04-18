import React, { useState } from 'react';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResponse,setIsResponse] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
        credentials: "include", // 🔥 this is the key
        body: JSON.stringify({
          username: email, 
          password,
        }),
      });
      

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json(); 
      console.log(data); 

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
