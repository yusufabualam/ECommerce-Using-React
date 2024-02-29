import { useState, useEffect } from "react";

function Profile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Retrieve user data from local storage or an API
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    setUserData(storedUserData || {});
  }, []);

  return (
    <div className="container mt-5 mb-5">
      <div className="card card-title col-6">
      <h1 className="text-center mt-3">Profile</h1>
     <div className="card-body"> 
      <p><span className="fw-bold fs-5">Name : </span>{userData.name}</p>
      <p><span className="fw-bold fs-5">Email : </span>{userData.email}</p>
      <p><span className="fw-bold fs-5">Username : </span> {userData.username}</p>
    </div>
    </div>
    </div>
  );
}

export default Profile;
