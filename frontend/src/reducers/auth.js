export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.user };
    case "ADD_GROUP":
      return { ...state, groupToken: action.groupToken };
    case "UPDATE_FEEDBACK":
      return { ...state, hasStar: action.hasStar };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
