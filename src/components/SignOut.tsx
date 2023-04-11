import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

interface SignOutProps {
  auth: firebase.auth.Auth;
}

function SignOut({ auth }: SignOutProps) {
  const handleSignOut = () => {
    auth.signOut();
  };

  return (
    <button className="sign-out-button" onClick={handleSignOut}>
      Sign Out
    </button>
  );
}

export default SignOut;
