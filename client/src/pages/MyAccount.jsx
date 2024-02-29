import React from "react";
import { useGlobalAuthContext } from "../context/authContext";

const MyAccount = () => {
  const { authState } = useGlobalAuthContext();

  if (authState.currentUser) {
    console.log("currentUser", authState.currentUser);
  }
  return (
    <>
      {authState.currentUser && (
        <div className="profile">
          <div className="info">
            <span>ID</span>
            <span>{authState.currentUser.id}</span>
          </div>
          <div className="info">
            <span>Full Name</span>
            <span>{authState.currentUser.full_name}</span>
          </div>
          <div className="info">
            <span>Username</span>
            <span>{authState.currentUser.username}</span>
          </div>
          <div className="info">
            <span>Email</span>
            <span>{authState.currentUser.email}</span>
          </div>
          <div className="info">
            <span>Created At</span>
            <span>{authState.currentUser.created_at}</span>
          </div>
          <div className="info">
            <span>Updated At</span>
            {authState.currentUser.updated_at ? (
              <span>{authState.currentUser.updated_at}</span>
            ) : (
              <span>Up to date</span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyAccount;
