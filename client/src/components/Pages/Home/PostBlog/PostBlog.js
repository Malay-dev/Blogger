import React from "react";
import { useState } from "react";
import "./PostBlog.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postBlog } from "../../../../actions/post";

function PostBlog() {
  const [blogTitle, setblogTitle] = useState("");
  const [blogBody, setblogBody] = useState("");
  const [blogTags, setblogTags] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentUserReducer);
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      postBlog(
        {
          blogTitle,
          blogBody,
          blogTags,
          userPosted: User?.result?.name,
          userId: User?.result?._id,
        },
        navigate
      )
    );
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setblogBody(blogBody + "\n");
    }
  };
  return (
    <div className="post-blog">
      <div className="container">
        <form onSubmit={handleSubmit} className="compose-form">
          <div className="compose">
            <h1 className="compose-title">Your blog</h1>
            <div>
              <label htmlFor="post-blog-title" className="compose-label">Title</label>
              <input
                type="text"
                name="post-blog-title"
                id="post-blog-title"
                onChange={(e) => {
                  setblogTitle(e.target.value);
                }}
                required
              />
              <label htmlFor="post-blog-body" className="compose-label">Body</label>
              <textarea
                name="post-blog-body"
                id="post-blog-body"
                onChange={(e) => {
                  setblogBody(e.target.value);
                }}
                onKeyPress={handleEnter}
                cols="30"
                rows="10"
                required></textarea>
              <label htmlFor="post-blog-tags" className="compose-label">Tags</label>
              <input
                type="text"
                id="post-blog-tags"
                onChange={(e) => {
                  setblogTags(e.target.value.split(" "));
                }}
                required
              />
            </div>
            <button className="post-btn">Post your blog</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostBlog;
