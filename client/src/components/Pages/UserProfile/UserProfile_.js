import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Avatar from "../../Avatar/Avatar";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import "./UserProfile_.css";
import moment from "moment";

function UserProfile_() {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const currentProfile = users.filter((user) => user._id === id)[0];
  console.log(currentProfile);
  const currentUser = useSelector((state) => state.currentUserReducer);
  const [Switch, setSwitch] = useState(false);
  return (
    <div>
      <main class="profile">
        <div class="profile-bg"></div>
        <section class="container">
          <aside class="profile-image">
            <a class="camera" href="#">
              <p class="fas fa-camera">
                {currentProfile?.name.charAt(0).toUpperCase()}
              </p>
            </a>
          </aside>
          <section class="profile-info">
            <h1 class="first-name">{currentProfile?.name}</h1>
            <h2>ABOUT</h2>
            <p>
              {Switch ? (
                <EditProfileForm
                  currentUser={currentUser}
                  setSwitch={setSwitch}></EditProfileForm>
              ) : (
                <ProfileBio currentProfile={currentProfile}></ProfileBio>
              )}
            </p>
          </section>
        </section>
        <section class="statistics">
          <button class="icon arrow left"></button>
          <button class="icon arrow right"></button>
          <p>
            <strong>29</strong> Followers
          </p>
          <p>
            <strong>184</strong> Following
          </p>
          <p>
            <strong>6</strong> Likes
          </p>
        </section>
        <button class="icon close">
          {currentUser?.result?._id === id && (
            <button
              type="button"
              onClick={() => setSwitch(true)}
              className="edit-profile-btn">
              Edit Profile
            </button>
          )}
        </button>
      </main>
    </div>
  );
}

export default UserProfile_;
