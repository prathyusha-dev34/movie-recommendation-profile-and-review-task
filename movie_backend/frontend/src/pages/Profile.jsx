import React, { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    current_password: "",
    new_password: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile");
      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async () => {
    try {
      await API.put("/profile", profile);
      alert("Profile updated successfully");
    } catch (error) {
      alert(error.response?.data?.detail);
    }
  };

  const changePassword = async () => {
    try {
      await API.put(
        "/profile/change-password",
        passwordData
      );

      alert("Password changed successfully");

      setPasswordData({
        current_password: "",
        new_password: "",
      });

    } catch (error) {
      alert(error.response?.data?.detail);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="page">
      <h1>Profile</h1>

      <div className="profile-card">

        <img
          src="https://i.pravatar.cc/120"
          alt="profile"
        />

        <input
          type="text"
          value={profile.full_name}
          placeholder="Full Name"
          onChange={(e) =>
            setProfile({
              ...profile,
              full_name: e.target.value,
            })
          }
        />

        <br /><br />

        <input
          type="email"
          value={profile.email}
          placeholder="Email"
          onChange={(e) =>
            setProfile({
              ...profile,
              email: e.target.value,
            })
          }
        />

        <br /><br />

        <button onClick={updateProfile}>
          Update Profile
        </button>

        <hr />

        <h3>Change Password</h3>

        <input
          type="password"
          placeholder="Current Password"
          value={passwordData.current_password}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              current_password: e.target.value,
            })
          }
        />

        <br /><br />

        <input
          type="password"
          placeholder="New Password"
          value={passwordData.new_password}
          onChange={(e) =>
            setPasswordData({
              ...passwordData,
              new_password: e.target.value,
            })
          }
        />

        <br /><br />

        <button onClick={changePassword}>
          Change Password
        </button>

        <br /><br />

        <button onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;