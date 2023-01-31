import React from "react";

function SignOut({ auth }) {
  return (
    auth.currentUser && <button onClick={() => auth.SignOut()}>Sign Out</button>
  );
}

export default SignOut;
