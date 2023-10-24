import { combineReducers } from "redux";
import User from "./user";
import Cart from "./cart";
import Items from "./items";

const appReducer = combineReducers({
  user: User,
  cart:Cart,
  items: Items
 

});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    // storage.removeItem('persist:otherKey')
    localStorage.removeItem("persist:root");

    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export default rootReducer;
