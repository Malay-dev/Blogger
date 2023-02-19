import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const logIn = (authData) => API.post("/user/login", authData);
export const signUP = (authData) => API.post("/user/signup", authData);
export const fetchAllUsers = () => API.get("/user/getAllUsers");
/*------------------------------------------------------------------------------*/

export const postBlog = (question) => API.post("/blogs/post", question);
export const fetchAllBlogs = () => API.get("/blogs/get");
export const deleteBlog = (id) => API.delete(`/blogs/delete/${id}`);
export const voteBlog = (id, value, userId) =>
  API.patch(`/blogs/vote/${id}`, { value, userId });

/*------------------------------------------------------------------------------*/
export const postComment = (id, commentBody, userCommented, userId) =>
  API.patch(`/comments/post/${id}`, {
    commentBody,
    userCommented,
    userId,
  });
export const deleteComment = (id, commentId) =>
  API.patch(`/comments/delete/${id}`, { commentId });
export const editComment = (id, editedData) =>
  API.patch(`/comments/edit/${id}`, editedData);
/*------------------------------------------------------------------------------*/
export const updateProfile = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

export const getLocation = (id) => API.get(`/location/get`);
