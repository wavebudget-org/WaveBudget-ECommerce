import React from "react";
import { IoIosClose } from "react-icons/io";
import pix from "../../../assets/images/pxl2.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseSingleCartItems,
  decreaseSingleCartItems,
  removeFromCart
} from "Redux/Actions/ActionCreators";
const CartCardsPay = ({ name, price, quantity, id, image }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const incItem = () => {
    dispatch(increaseSingleCartItems(id, cartItems));
  };

  const decItem = () => {
    dispatch(decreaseSingleCartItems(id, cartItems));
  };
  const removeItem = () => {
    dispatch(removeFromCart(id,cartItems))
  }
  return (
    <div className="relative w-full flex flex-col space-y-[2%] bg-white rounded-md p-3 min-[450px]:p-4">
      <IoIosClose
      onClick={(e) => {
        e.stopPropagation()
        removeItem()
      } }
      className="absolute right-2 top-2 text-black text-[22px] sm:text-[25px]" />
      <div className="flex items-center justify-start space-x-2 min-[450px]:space-x-3">
        <div>Product Name: <b>{name}</b></div>
      </div>
      <div className="flex items-center justify-start space-x-2 min-[450px]:space-x-3">
        <div>Product Price: <b>{`₦${price}`}</b></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-4 h-4 bg-none"></div>
      </div>
    </div>
  );
};

export default CartCardsPay;
