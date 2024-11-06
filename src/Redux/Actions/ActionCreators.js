// Action Creators
import * as type from "./Types";
import axios from "../../Utils/useAxios";
import toast from "react-hot-toast";

const GetUsersSuccess = (data) => {
  return {
    type: type.FETCH_USER_SUCCESS,
    payload: data,
  };
};

const loginSuccess = (data) => {
  return {
    type: type.LOGIN_SUCCESS,
    payload: data,
  };
};

const getPaymentstatus = (data) => {
  return {
    type: type.PAYMENT_STATUS,
    payload: data,
  };
};
const logout = () => {
  return {
    type: type.LOGOUT,
  };
};

const IncreaseCount = (data) => {
  return {
    type: type.GET_ITEMS_COUNT_INCREMENT,
    payload: data,
  };
};

const decreaseCount = (data) => {
  return {
    type: type.GET_ITEMS_COUNT_DECREMENT,
    payload: data,
  };
};

const getItem = (data) => {
  return {
    type: type.GET_ITEMS,
    payload: data,
  };
};
const editItem = (data) => {
  return {
    type: type.EDIT_ITEM,
    payload: data,
  };
};
const updateTotal = (data) => {
  return {
    type: type.UPDATE_TOTAL_PRICE,
    payload: data,
  };
};

const resetStackPrice = () => {
  return {
    type: type.RESET_STACK_PRICE,
  };
};

const getNums = (data) => {
  return {
    type: type.NUM_OF_ITEMS,
    payload: data,
  };
};
const updateSingleItem = (data) => {
  return {
    type: type.UPDATE_SINGLE_ITEM,
    payload: data,
  };
};

// const getPreviousOrders = () => {
//   return {
//     type: type.GET_PREVIOUS_ORDERS,
//   };
// };
const itemsToCart = (payload, cartItems) => {
  return (dispatch) => {
    cartItems.push(payload);
    dispatch(updatedCart(cartItems));
  };
};
const updatedCart = (payload) => {
  return {
    type: type.ADD_ITEMS_TO_CART,
    payload,
  };
};

const resetCart = () => {
  // return (dispatch) => {
  //   dispatch({ type: type.ADD_FOODITEMS_TO_CART, payload: [] });
  //   dispatch({ type: "UPDATE_TOTAL_PRICE", payload: 0 });
  // };
  return {
    type: type.RESET_CART,
  };
};

const calculateTotal = (cartItems) => {
  return (dispatch) => {
    let total = cartItems.map((value) => value.curPrice);
    let nums = total.reduce((acc, item) => acc + parseFloat(item || 0), 0);

    dispatch(updateTotal(nums));
    let numItems = cartItems.map((value) => value.count);
    let totalCount = numItems.reduce((acc, item) => acc + item, 0);
    dispatch(getNums(totalCount));
  };
};

/**
 * 
 const calculateTotalPrice = () => {
  return (dispatch, getState) => {
    const { cartItems } = getState().cart;
  
    const calculatedTotal = cartItems.reduce(
      (acc, curr) => acc + parseFloat(curr.totalPrice || 0),
      0
    );
    console.log(calculatedTotal);
    dispatch({ type: "UPDATE_TOTAL_PRICE", payload: calculatedTotal });
  };
};

ms
const addFoodItemsToCart = (data) => {
  return (dispatch, getState) => {
    const { cartItems } = getState().cart;
    data.quantity = 1;
    data.totalPrice = data.quantity * +data.unitprice;
    data.id = generateRandomID(10);
    const updatedCart = [...cartItems, data];
    toast.success("Item added successfully");
   dispatch({ type: "ADD_ITEMS_TO_CART", payload: updatedCart });
    //dispatch(calculateTotalPrice());
  };
};
 */

const increaseSingleCartItems = (id, cartItems) => {
  return (dispatch) => {
    let item = cartItems[id];
    item.count += 1;
    item.curPrice = item.curPrice + item.price;
    cartItems[id].count = item.count;
    cartItems[id].curPrice = item.curPrice;
    dispatch(updatedCart(cartItems));
    let total = cartItems.map((value) => value.curPrice);
    let nums = total.reduce((acc, item) => acc + parseFloat(item || 0), 0);

    dispatch(updateTotal(nums));
    let numItems = cartItems.map((value) => value.count);
    let totalCount = numItems.reduce((acc, item) => acc + item, 0);
    dispatch(getNums(totalCount));
    //let itemc = cartItems.find((val) => val.id === id)
    /**
     * 
    const getCart = getState().cart.cartItems;
    const getItem = getCart.find((item) => item.id === id);
    getItem.quantity += 1;
    getItem.totalPrice = getItem.quantity * +getItem.unitprice;
    const getItemIndex = getCart.findIndex((item) => item.id === id);
    getCart.splice(getItemIndex, 1, getItem);
    dispatch({ type: "ADD_ITEMS_TO_CART", payload: getCart });
    console.log("vdv");
    dispatch(calculateTotalPrice());
     */
  };
};

const decreaseSingleCartItems = (id, cartItems) => {
  return (dispatch) => {
    let item = cartItems[id];
    if (item.count > 1) {
      item.count -= 1;
      item.curPrice = item.curPrice - item.price;
      cartItems[id].count = item.count;
      cartItems[id].curPrice = item.curPrice;
      dispatch(updatedCart(cartItems));
      let total = cartItems.map((value) => value.curPrice);
      let nums = total.reduce((acc, item) => acc + parseFloat(item || 0), 0);

      dispatch(updateTotal(nums));
      let numItems = cartItems.map((value) => value.count);
      let totalCount = numItems.reduce((acc, item) => acc + item, 0);
      dispatch(getNums(totalCount));
    }

    /**
    * 
   const getCart = getState().cart.cartItems;
    const getItem = getCart.find((item) => item.id === id);
    const getItemIndex = getCart.findIndex((item) => item.id === id);
    if (getItem.quantity > 1) {
      getItem.quantity -= 1;
      getItem.totalPrice = getItem.quantity * +getItem.unitprice;
      getCart.splice(getItemIndex, 1, getItem);
      dispatch({ type: type.ADD_ITEMS_TO_CART, payload: getCart });
      dispatch(calculateTotalPrice());
    }
    */
  };
};

const removeFromCart = (id, cartItems) => {
  return (dispatch) => {
    //let item = cartItems[id];
    //let itemc = cartItems.find((val) => val.id === id)
    cartItems.splice(id, 1);
    dispatch(updatedCart(cartItems));
    let total = cartItems.map((value) => value.curPrice);
    let nums = total.reduce((acc, item) => acc + parseFloat(item || 0), 0);

    dispatch(updateTotal(nums));
    let numItems = cartItems.map((value) => value.count);
    let totalCount = numItems.reduce((acc, item) => acc + item, 0);
    dispatch(getNums(totalCount));
    toast.success("Item removed successfully");
    //dispatch(calculateTotalPrice());
    /**
     const getCart = getState().cart.cartItems;
    const getItemIndex = getCart.findIndex((item) => item.id === id);
    getCart.splice(getItemIndex, 1);
    dispatch({ type: type.ADD_ITEMS_TO_CART, payload: getCart });
     */
  };
};

const addMealPackToCart = (data) => {
  return {
    type: type.ADD_MEALPACK_TO_CART,
    payload: data,
  };
};

const showCartCount = () => {
  return {
    type: type.SHOW_CART_COUNT,
  };
};
const updateCategory = (data) => {
  return {
    type: type.GET_CATEGORY,
    payload: data,
  };
};
const getUserPreviousOrderInfo = (data) => {
  return {
    type: type.GET_USER_PREVIOUS_ORDER_INFO,
    payload: data,
  };
};

const getUserPersonalInformation = (data) => {
  return {
    type: type.GET_USER_PERSONAL_INFORMATION,
    payload: data,
  };
};

const registration = (registrationParams, navigate, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    await axios
      .post("/auth/signup", registrationParams)
      .then((res) => {
        // console.log(res.data.data);
        const payload = res.data.data;

        dispatch(getUserPersonalInformation(payload));
        toast.success("Registration Successful");
        navigate("/main/vendors");
        setLoading(false);
      })
      .catch((error) => {
        //console.log(error.response.data.error.message);
        toast.error(error.response.data.error.message);
      });
  };
};

// const fetchUser = (token, navigate) => {
//   return (dispatch) => {
//     try {
//       axios
//         .get("/user/profile/me", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => {
//           dispatch(GetUsersSuccess(res.data.data));
//           if (res.data.data.role.toLowerCase() === "student") {
//             navigate("/dashboard");
//           } else {
//             toast.error("Please Login as a student");
//             navigate("/");
//           }
//         });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

const LoginAction = (loginParams, navigate, setLoading) => {
  return async (dispatch) => {
    setLoading(true);
    await axios
      .post("/auth/login", loginParams)
      .then((res) => {
        // console.log(res.data.data);
        const { user } = res.data.data;
        dispatch(GetUsersSuccess(user));
        const { token } = res.data.data.accessToken;
        dispatch(loginSuccess(token));
        dispatch(getUserPersonalInformation(user));
        navigate("/main/vendors");
        setLoading(false);
        toast.success("Login successful");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response.data.error.message);
        toast.error(error.response.data.error.message);
      });
  };
};

export {
  getUserPreviousOrderInfo,
  showCartCount,
  resetCart,
  increaseSingleCartItems,
  decreaseSingleCartItems,
  getNums,
  addMealPackToCart,
  updateTotal,
  resetStackPrice,
  removeFromCart,
  GetUsersSuccess,
  getItem,
  itemsToCart,
  decreaseCount,
  IncreaseCount,
  LoginAction,
  loginSuccess,
  logout,
  updatedCart,
  calculateTotal,
  registration,
  updateCategory,
  editItem,
  updateSingleItem,
  getPaymentstatus,
};
