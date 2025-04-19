import React, { useEffect } from 'react';

function UserPage() {
  useEffect(() => {
    const getCookie = (name) => {
      const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      return match ? match[2] : null;
    };

    const accessToken = getCookie('accessToken');
    console.log('Access Token:', accessToken);
  }, []);

  return (
    <div>UserPage</div>
  );
}

export default UserPage;
