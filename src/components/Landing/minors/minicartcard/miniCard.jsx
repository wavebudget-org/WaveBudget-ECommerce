import React from 'react';

const CartCard = ({isCart, name, items}) => {
    return (
        <>
        <div className={isCart && !name ? "h-fit z-40 absolute text-sm w-[300px] left-[-273px] bg-white bottom-[-50px] flex flex-col shadow-lg rounded-xl space-y-4 px-6 py-4 justify-center items-center": "hidden"}>
            <div className=" text-black">
                You are not yet a registered user
            </div>

        </div>
        <div className={isCart && name ? "h-fit z-40 absolute text-sm w-[300px] left-[-273px] bg-white bottom-[-50px] flex flex-col shadow-lg rounded-xl space-y-4 px-6 py-4 justify-center items-center": "hidden"}>
            <div className=" text-black">
                {`You have ${items} in your cart`}
            </div>

        </div>
        </>
    )
}

export default CartCard