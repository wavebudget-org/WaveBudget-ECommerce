import React from "react";
import { IoIosClose } from "react-icons/io";
import pix from "../../../assets/images/pxl2.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseSingleCartItems,
  decreaseSingleCartItems,
  removeFromCart
} from "Redux/Actions/ActionCreators";
const CartCards = ({ name, price, quantity, id, image }) => {
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
        <div className="w-[60px] h-[60px] min-[450px]:w-[80px] min-[450px]:h-[80px] rounded-md">
          <img
            className="w-full h-full object-cover rounded-md"
            src={image}
            alt=""
          />
        </div>
        <div>{name}</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="w-4 h-4 bg-none"></div>
        <div class="w-[30%] my-2 flex border text-zinc-800 font-semibold bg-white h-8 sm:h-12 items-center rounded-sm sm:rounded-md">
          <button
            onClick={incItem}
            class="p-2 flex justify-center items-center hover:text-white rounded-l-md hover:bg-zinc-800 h-full w-4/12"
          >
            <div>+</div>
          </button>
          <button class="p-2 border-l border-r h-full w-5/12">
            {quantity}
          </button>
          <button
            onClick={decItem}
            class="p-2 flex justify-center items-center rounded-r-md hover:text-white hover:hover:bg-zinc-800 h-full w-4/12"
          >
            <div>-</div>
          </button>
        </div>
        <div>
          <span className="ml-3">Price:</span>{" "}
          <span>
            <b>{`₦${price}`}</b>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartCards;
