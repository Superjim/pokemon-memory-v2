import React from "react";
import SignOut from "./SignOut";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

type ProfileProps = {
  user: firebase.User;
  auth: firebase.auth.Auth;
};

function Profile({ user, auth }: ProfileProps) {
  //const uid = user.providerData[0].uid;
  if (!user.providerData) {
    return null;
  }

  return (
    <div className="profile-container">
      <h3>{user.providerData[0]?.displayName}</h3>
      <img src={user.providerData[0]?.photoURL ?? ""} alt="profile" />
      <SignOut auth={auth} />
    </div>
  );
}

export default Profile;
