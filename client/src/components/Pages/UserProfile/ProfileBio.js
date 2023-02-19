import React from "react";

function ProfileBio({ currentProfile }) {
  return (
    <div>
      <div>
        {currentProfile?.about ? (
          <>
            {/* <h4>About</h4> */}
            {currentProfile?.about}
          </>
        ) : (
          <p>No Bio Found</p>
        )}
      </div>
    </div>
  );
}

export default ProfileBio;
