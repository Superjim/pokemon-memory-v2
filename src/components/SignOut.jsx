import React from "react";

function SignOut({ auth }) {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

export default SignOut;
