import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";

const Profile = () => {
  const user = useSelector((state) => state.user.user); // ✅ Correct path based on your slice
  console.log("user", user);

  if (!user) {
    return (
      <div className="p-6 bg-gray-100 rounded-xl shadow text-center text-gray-500">
        No user data found.
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">👤 User Profile</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Name:</span>
          <span className="text-gray-900">{user.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Email:</span>
          <span className="text-gray-900">{user.email}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-600">Role:</span>
          <span className="text-gray-900 capitalize">{user.role}</span>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
