import * as type from "../Actions/Types";

const initailState = {
  cartItems: [],
  overallPrice: 0,
  numOfCartItems: 0,
};
const Cart = (state = initailState, action) => {
  switch (action.type) {
    case type.ADD_ITEMS_TO_CART:
      return {
        ...state,
        cartItems: action.payload,
      };

    case type.UPDATE_TOTAL_PRICE:
      return {
        ...state,
        overallPrice: action.payload,
      };

    case type.RESET_CART:
      return initailState;

    case type.NUM_OF_ITEMS:
      return {
        ...state,
        numOfCartItems: action.payload,
      };

    default:
      return state;
  }
};

export default Cart;
