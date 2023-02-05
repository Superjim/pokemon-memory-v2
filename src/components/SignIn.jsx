import React from "react";
import GoogleButton from "react-google-button";

function SignIn({ auth, firebase }) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return <GoogleButton onClick={signInWithGoogle} />;
}

export default SignIn;
