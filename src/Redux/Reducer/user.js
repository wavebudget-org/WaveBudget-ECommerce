import * as type from "../Actions/Types";

const initailState = {
  currentUser: "",
  payStatus:'',
  token: "",
};
const User = (state = initailState, action) => {
  switch (action.type) {
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
      };
    case type.FETCH_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
      };
   
      case type.PAYMENT_STATUS:
        return {
          ...state,
          payStatus: action.payload,
        };
     

    case type.LOGOUT:
      return {
        ...state,
        currentUser: null,
        token: "",
      };

    default:
      return state;
  }
};

export default User;
