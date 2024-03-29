import React from "react";
import SignIn from "./SignIn";
import Profile from "./Profile";
import Theme from "./Theme";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

type HeaderProps = {
  auth: firebase.auth.Auth;
  firebase: firebase.app.App;
  user: firebase.User | null;
};

function Header({ auth, firebase, user }: HeaderProps) {
  return (
    <div className="header">
      <h1>Pokemon Memory Game</h1>
      <Theme />
      <div>
        {user ? (
          <>
            <Profile auth={auth} user={user} />
          </>
        ) : (
          <SignIn firebase={firebase} auth={auth} />
        )}
      </div>
    </div>
  );
}

export default Header;
