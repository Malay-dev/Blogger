import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import DisplayComments from "./DisplayComments";
import Avatar from "../../Avatar/Avatar";
import "./Blog.css";
import moment from "moment";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteBlog, voteBlog } from "../../../actions/post";
import { postComment } from "../../../actions/post";

const upVote = (
  <svg
    className="votes-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512">
    <path d="M9.39 265.4l127.1-128C143.6 131.1 151.8 128 160 128s16.38 3.125 22.63 9.375l127.1 128c9.156 9.156 11.9 22.91 6.943 34.88S300.9 320 287.1 320H32.01c-12.94 0-24.62-7.781-29.58-19.75S.2333 274.5 9.39 265.4z" />
  </svg>
);
const downVote = (
  <svg
    className="votes-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512">
    <path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z" />
  </svg>
);

function BlogDetails() {
  const { id } = useParams();
  const blogsList = useSelector((state) => state.postsReducer);

  // var blogsList = [
  //   {
  //     _id: "1",
  //     upVotes: 3,
  //     downVotes: 2,
  //     blogTitle: "What is a function?",
  //     blogBody: "It meant to be",
  //     userPosted: "mano",
  //     userId: 1,
  //     postedOn: "jan 1",
  //   },
  //   {
  //     _id: "2",
  //     upVotes: 3,
  //     downVotes: 2,
  //     blogTitle: "What is a function?",
  //     blogBody: "It meant to be",
  //     userPosted: "mano",
  //     userId: 1,
  //     postedOn: "jan 1",
  //   },
  //   {
  //     _id: "3",
  //     upVotes: 3,
  //     downVotes: 2,
  //     blogTitle: "What is a function?",
  //     blogBody: "It meant to be",
  //     userPosted: "mano",
  //     userId: 1,
  //     postedOn: "jan 1",
  //   },
  // ];

  const user = useSelector((state) => state.currentUserReducer);

  //   const url = `https://stack-overflow-x.netlify.app${location.pathname}`;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");
  const handleCommentSubmit = (e) => {
    console.log(comment);
    e.preventDefault();
    if (user == null) {
      alert("Login or SignUp to post a comment");
      navigate("/Auth");
    } else {
      if (comment === "") {
        alert("Enter an comment before submitting");
      } else {
        dispatch(
          postComment({
            id,
            commentBody: comment,
            userCommented: user?.result?.name,
            userId: user?.result?._id,
          })
        );
      }
    }
  };

  const handleDelete = () => {
    dispatch(deleteBlog(id, navigate));
  };
  const handleUpVote = () => {
    try {
      dispatch(voteBlog(id, "upVote", user.result._id));
    } catch (error) {
      alert("Please Log in to up Vote");
    }
  };
  const handleDownVote = () => {
    try {
      dispatch(voteBlog(id, "downVote", user.result._id));
    } catch (error) {
      alert("Please Log in to donw Vote");
    }
  };

  return (
    <div className="blog">
      {blogsList.data === null ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {blogsList.data
            .filter((blog) => blog._id === id)
            .map((blog) => (
              <div key={blog._id}>
                <section className="blog-details-container">
                  <h1 className="blog-title">{blog.blogTitle}</h1>
                  <div className="blog-details-container-2">
                    <div style={{ width: "100%" }}>
                      <p className="blog-content ">{blog.blogBody}</p>

                      <div className="blog-actions-user">
                        <div>
                          <div>
                            {user?.result?._id === blog?.userId && (
                              <button
                                type="button"
                                className="btn btn-delete"
                                onClick={handleDelete}>
                                <span className="mdi mdi-delete mdi-24px"></span>
                                <span className="mdi mdi-delete-empty mdi-24px"></span>
                                <span>Delete</span>
                              </button>
                            )}
                          </div>
                          <div className="user-posted-details">
                            <p>posted {moment(blog.postedOn).fromNow()}</p>
                            <Link
                              to={`/Users/${blog.userId}`}
                              className="user-link"
                              style={{ color: "#0086d8" }}>
                              <Avatar
                                backgroundColor={"grey"}
                                px="50px"
                                py="50px"
                                borderRadius="50px">
                                {blog?.userPosted
                                  ?.charAt(0)
                                  ?.toLocaleUpperCase()}
                              </Avatar>
                            </Link>
                            <div className="author">{blog.userPosted}</div>
                          </div>
                        </div>
                        <div className="blog-votes">
                          <div style={{ width: "18px" }} onClick={handleUpVote}>
                            {upVote}
                          </div>
                          <p>{blog.upVote.length - blog.downVote.length}</p>
                          <div
                            style={{ width: "18px" }}
                            onClick={handleDownVote}>
                            {downVote}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h4>Comments</h4>
                  <DisplayComments key={blog._id} blog={blog}></DisplayComments>
                  <section className="comment-comtainer">
                    <form
                      onSubmit={(e) => {
                        handleCommentSubmit(e);
                      }}>
                      <input
                        type="text"
                        name="comment"
                        id="comment"
                        className="input-comment"
                        placeholder="Add a comment"
                        autoComplete="off"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      />
                    </form>
                  </section>
                </section>
                <section>
                  <p className="post-btn">
                    <Link
                      to="/PostBlog"
                      style={{
                        textDecoration: "none",
                        color: "#fff",
                      }}>
                      Post your own blog
                    </Link>
                  </p>
                </section>
              </div>
            ))}
        </>
      )}
    </div>
  );
}

export default BlogDetails;
