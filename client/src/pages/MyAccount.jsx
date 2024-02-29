import React, { useState } from "react";
import { useGlobalAuthContext } from "../context/authContext";
import Button from "react-bootstrap/Button";
import UpdateUserModal from "../components/UpdateUserModal";

const MyAccount = () => {
  // state for handling UpdateStudentModal
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const handleCloseUpdateUserModal = () => setShowUpdateUserModal(false);
  const handleShowUpdateUserModal = () => setShowUpdateUserModal(true);

  // provide AuthContext
  const { authState } = useGlobalAuthContext();

  if (authState.currentUser) {
    console.log("currentUser", authState.currentUser);
  }

  // UpdateUserModal
  if (showUpdateUserModal) {
    return (
      <UpdateUserModal
        showUpdateUserModal={showUpdateUserModal}
        handleCloseUpdateUserModal={handleCloseUpdateUserModal}
        handleShowUpdateUserModal={handleShowUpdateUserModal}
      />
    );
  }
  return (
    <>
      {authState.currentUser && (
        <>
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
          <div className="account-btns">
            <Button className="edit-btn" onClick={handleShowUpdateUserModal}>
              Edit Account
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default MyAccount;
