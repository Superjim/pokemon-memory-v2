import React from "react";
import SignOut from "./SignOut";

function Profile({ user, auth }) {
  //const uid = user.providerData[0].uid;

  return (
    <div className="profile-container">
      <h3>{user.providerData[0].displayName}</h3>
      <img src={user.providerData[0].photoURL} alt="profile"></img>
      <SignOut auth={auth} />
    </div>
  );
}

export default Profile;
