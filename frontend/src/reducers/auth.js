export default (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...action.user };
    case "ADD_GROUP":
      return { ...state, groupToken: action.groupToken };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
