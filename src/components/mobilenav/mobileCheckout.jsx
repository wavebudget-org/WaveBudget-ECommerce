import { HandlePayment } from "paystack/paystackInterface";
import React,{useState, useEffect} from "react";
import { toast } from "react-hot-toast";
import timeFormat from "Utils/timeFormat";
import { useSelector, useDispatch } from "react-redux";
import PaymentNotification from "components/paymentnotification/paymentNote";
import { saveHistory } from "firebasedatas/transactionHistory";
const MobileCheckout = ({ email, total }) => {
  //const { pathname } = useLocation();
  const {currentUser, payStatus} = useSelector((state) => state.user)
  const {cartItems} = useSelector((state) => state.cart)
  const [isNote, setisNote] = useState()
  const [transHistory, setTransHistory] = useState()
  const dispatch = useDispatch()
  const dt = new Date();
  const month = dt.toLocaleString("default", { month: "long" });
  const day = dt.getDate();
  const year = dt.getFullYear();
  let hours, minutes, seconds, amPm;

  useEffect(() => {
    const history = async () => {
      if (payStatus) {
        setTransHistory(cartItems);

        await saveHistory({
          status: payStatus,
          userId:currentUser,
          type: 'checkout',
          cart: cartItems,
          date:`${day} ${month} ${year}`,
          time:`${timeFormat(hours, minutes, seconds, amPm)}`,
          createdAt: dt.getTime()
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

        setisNote(true);
      }
    };

    history();
  
  }, [payStatus]);
  return (
    <>
    <div className="min-[650px]:hidden fixed w-full border-t shadow-lg items-center bg-white inset-x-0 flex gap-3 justify-between p-4 rounded-t-xl bottom-0">
      <div className="text-[16px]">
        <b>
          <span className="mr-3 ">Total:</span>
          <span>{`₦${total}`}</span>
        </b>
      </div>
    
      <button
      onClick={()=> {
        if (!currentUser) {
          toast.error("You must be logged in to buy")
          return
        }
        HandlePayment(email, parseFloat(total), dispatch)
      }}
      className="text-white py-3 bg-[#009999] rounded-2xl flex justify-center items-center w-[100px] ">
        CheckOut
      </button>

    
    </div>
    <PaymentNotification
      isNote={isNote}
      setisNote={setisNote}
      transHistory={transHistory}
    />
    </>
  );
};

export default MobileCheckout;
