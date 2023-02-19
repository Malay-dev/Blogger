import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateProfile } from "../../../actions/users";
import moment from "moment";

function EditProfileForm({ currentUser, setSwitch }) {
  const [Name, setName] = useState(currentUser?.result?.name);
  const [About, setAbout] = useState(currentUser?.result?.about);
  const [Dob, setDob] = useState(currentUser?.result?.dob);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile(currentUser?.result?._id, {
        Name,
        About,
        Dob,
      })
    );
    setSwitch(false);
  };
  return (
    <div>
      <h1 className="edit-profile-title">Edit your Profile</h1>
      <h2 className="edit-profile-title-2">Public Information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display Name</h3>
          <input
            type="text"
            name="name"
            id="name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="Date of Birth">
          <h3>Date of Birth</h3>
          <input
            type="date"
            name="date_of_birth"
            id="Date of Birth"
            value={moment(Dob).format("YYYY-MM-DD")}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            name="about"
            id="about"
            value={About}
            cols="30"
            rows="10"
            onChange={(e) => setAbout(e.target.value)}></textarea>
        </label>

        <br />
        <input type="submit" value="Save Profile" className="user-submit-btn" />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setSwitch(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProfileForm;
