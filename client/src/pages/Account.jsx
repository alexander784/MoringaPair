import React from "react";
import { useGlobalAuthContext } from "../context/authContext";

const Account = () => {
  const { authState } = useGlobalAuthContext();
  console.log(authState.currentUser);
  return (
    <div>
      Account
      {authState.currentUser && <h1>{authState.currentUser.full_name}</h1>}
    </div>
  );
};

export default Account;
