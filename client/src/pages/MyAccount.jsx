import React from "react";
import { useGlobalAuthContext } from "../context/authContext";

const MyAccount = () => {
  const { authState } = useGlobalAuthContext();

  if (authState.currentUser) {
    console.log("currentUser", authState.currentUser);
  }
  return <div>
    {authState.currentUser && <div>
      <h1>{authState.currentUser.full_name}</h1></div>}
  </div>;
};

export default MyAccount;
