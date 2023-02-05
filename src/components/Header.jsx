import React from "react";
import SignIn from "./SignIn";
import Profile from "./Profile";
import Theme from "./Theme";

function Header({ auth, firebase, user }) {
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
