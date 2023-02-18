const postsReducer = (state = { data: null }, action) => {
  // console.log(action);
  switch (action.type) {
    case "POST_BLOG":
      return { ...state };
    case "FETCH_ALL_BLOGS":
      return { ...state, data: action.payload };
    case "POST_COMMENT":
      return { ...state };
    default:
      return state;
  }
};
export default postsReducer;
