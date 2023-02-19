import * as api from "../api";

export const postBlog = (blogData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.postBlog(blogData);
    dispatch({ type: "POST_BLOG", payload: data });
    dispatch(fetchAllBlogs());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllBlogs = () => async (dispatch) => {
  try {
    const { data } = await api.fetchAllBlogs();
    dispatch({ type: "FETCH_ALL_BLOGS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = (id, navigate) => async (dispatch) => {
  try {
    const { data } = api.deleteBlog(id);
    dispatch(fetchAllBlogs());
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};

export const voteBlog = (id, value, userId) => async (dispatch) => {
  try {
    const { data } = await api.voteBlog(id, value, userId);
    dispatch(fetchAllBlogs());
  } catch (error) {
    console.log(error);
  }
};
/*-----------------------------------------------------------------------------*/

export const postComment = (commentData) => async (dispatch) => {
  try {
    const { id, commentBody, userCommented, userId } = commentData;
    console.log(commentData);
    const { data } = await api.postComment(
      id,
      commentBody,
      userCommented,
      userId
    );
    dispatch({ type: "POST_COMMENT", payload: data });
    dispatch(fetchAllBlogs());
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (id, commentId) => async (dispatch) => {
  try {
    const { data } = await api.deleteComment(id, commentId);
    dispatch(fetchAllBlogs());
  } catch (error) {
    console.log(error);
  }
};

export const editComment = (id, editedData) => async (dispatch) => {
  try {
    console.log(editedData);
    const { data } = await api.editComment(id, editedData);
    console.log(data);
    dispatch({ type: "EDIT_COMMENT", payload: data });
    dispatch(fetchAllBlogs());
  } catch (error) {
    console.log(error);
  }
};
