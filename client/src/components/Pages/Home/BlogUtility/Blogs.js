import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

function Blogs({ blog }) {
  return (
    <div className="display-blog-container">
      <div className="display-votes">
        {/* <p>{blog.upVote.length - blog.downVote.length}</p> */}
        <p>votes</p>
      </div>
      <div className="display-blog-details">
        <Link to={`/Post/${blog._id}`} className="display-blog-title">
          {blog.blogTitle}
        </Link>
        <div className="display-post-time">
          <p className="display-time">
            posted {moment(blog.postedOn).fromNow()} {blog.userPosted}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Blogs;
