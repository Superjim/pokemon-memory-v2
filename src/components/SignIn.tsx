import React from "react";
import GoogleButton from "react-google-button";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

interface SignInProps {
  auth: firebase.auth.Auth;
  //firebase: typeof firebase; :(
  firebase: any;
}

function SignIn({ auth, firebase }: SignInProps) {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <GoogleButton onClick={signInWithGoogle} />;
}

export default SignIn;
