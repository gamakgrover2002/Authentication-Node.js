import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserPage() {
  const [userData, setUserData] = useState(null);
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://authentication-node-js.onrender.com", {
          credentials: 'include',
             cache:'no-store'
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error:", error.message);
        setInvalid(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    getData();
  }, [navigate]);

  // 🔁 Handle bfcache restoration (e.g., when user navigates back to this page)
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("https://authentication-node-js.onrender.com/logout", {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      console.error("Logout error:", err.message);
    } finally {
      localStorage.clear();  
      sessionStorage.clear(); 
      window.location.href = '/login';
    }
  };

  return (
    <div className="user-container">
      <h1 className="user-heading">Welcome to Your Dashboard</h1>

      {userData ? (
        <div className="user-card">
          <p className="user-detail"><strong>Email:</strong> {userData.username || 'Not available'}</p>
          <p className="user-detail"><strong>Role:</strong> {userData.role || 'N/A'}</p>
          <p className="user-detail"><strong>First Name:</strong> {userData.firstName || 'Unknown'}</p>
          <p className="user-detail"><strong>Last Name:</strong> {userData.lastName || 'Unknown'}</p>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      ) : invalid ? (
        <p className="loading-text">Invalid session. Redirecting to login...</p>
      ) : (
        <p className="loading-text">Loading user data...</p>
      )}
    </div>
  );
}

export default UserPage;
