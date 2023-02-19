import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./Blogs.css";
function Blogs({ blog }) {
  return (
    <div className="story">
      <div className="display-blog-details">
        <Link to={`/Post/${blog._id}`} className="each-story-heading">
          {blog.blogTitle}
        </Link>
        <div className="display-post-time">
          <p className="display-time">
            {moment(blog.postedOn).fromNow()} by {blog.userPosted}
          </p>
        </div>
      </div>
      <div className="display-votes">
        <p>{blog.upVote.length - blog.downVote.length}</p>
        <p>votes</p>
      </div>
    </div>
  );
}

export default Blogs;
