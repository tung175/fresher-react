import { USER_LOGIN, USER_LOGOUT } from "../actions/userAction";

const INITIAL_STATE = {
  user: {
    email: "",
    auth: false,
  },
};

const UserReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        count: state.count + 1,
      };

    case USER_LOGOUT:
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state;
  }
};

export default UserReducer;
