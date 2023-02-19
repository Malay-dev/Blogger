import React from "react";
import CommentBody from "./CommentBody";

function DisplayComments({ blog }) {
  return (
    <div>
      {blog?.comment?.map((comment) => (
        <div key={comment._id}>
          <CommentBody key={comment._id} comment={comment}></CommentBody>
        </div>
      ))}
    </div>
  );
}

export default DisplayComments;
