import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function UserPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const accessToken = Cookies.get('accessToken');

      try {
        const response = await fetch("http://localhost:3000/", {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error:", error.message);
      }
    };

    getData();
  }, []);

  // Log the userData after the component renders
  useEffect(() => {
    if (userData) {
      console.log("UserData After Set:", userData);
    }
  }, [userData]);

  return (
    <div className="user-container">
      <h1 className="user-heading">Welcome to Your Dashboard</h1>

      {userData ? (
        <div className="user-card">
          <h2 className="user-name">{userData.name || 'Unnamed User'}</h2>
          <p className="user-detail"><strong>Email:</strong> {userData.username || 'Not available'}</p>
          <p className="user-detail"><strong>Role:</strong> {userData.role || 'N/A'}</p>
          <p className="user-detail"><strong>First Name:</strong> {userData.firstName || 'Unknown'}</p>
          <p className="user-detail"><strong>Last Name:</strong> {userData.lastName || 'Unknown'}</p>
        </div>
      ) : (
        <p className="loading-text">Loading user data...</p>
      )}
    </div>
  );
}

export default UserPage;
