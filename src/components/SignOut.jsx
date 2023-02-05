import React from "react";

function SignOut({ auth }) {
  return (
    <button className="sign-out-button" onClick={() => auth.signOut()}>
      Sign Out
    </button>
  );
}

export default SignOut;
