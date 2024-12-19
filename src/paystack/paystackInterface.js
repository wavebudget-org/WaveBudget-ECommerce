import PaystackPop from "@paystack/inline-js";
import { toast } from "react-hot-toast";
//import { useDispatch } from 'react-redux';
import { getPaymentstatus } from "Redux/Actions/ActionCreators";
//pk_live_6beefc72a8a4e9825686d59f2b0287afe622b722
export const HandlePayment = async (email, amount, dispatch) => {
  const publicKey = "pk_test_7fb90bd8aa7b5f58930828f02a247d2a950ad4d2";
  const paystack = new PaystackPop();
  paystack.newTransaction({
    key: publicKey,
    email,
    amount: amount * 100,

    onSuccess: function (transaction) {
      const message = `Payment complete! Reference: ${transaction.reference}`;

      toast.success(message);
      console.log("success");
      dispatch(getPaymentstatus("success"));
    },
    onCancel: (response) => {
      toast.error(`Cancelled ${response.reference}`);
      dispatch(getPaymentstatus("failed"));
    },
  });
};
