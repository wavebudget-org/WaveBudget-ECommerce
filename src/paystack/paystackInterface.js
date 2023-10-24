import PaystackPop from '@paystack/inline-js';
import { toast } from 'react-hot-toast';
//import { useDispatch } from 'react-redux';
import { getPaymentstatus } from 'Redux/Actions/ActionCreators';
//pk_live_6beefc72a8a4e9825686d59f2b0287afe622b722
export const HandlePayment = async (email, amount, dispatch) => {
  

  const paystack = new PaystackPop();
paystack.newTransaction({
	key: 'pk_live_6beefc72a8a4e9825686d59f2b0287afe622b722 ',
  email,
  amount: amount * 100,


  onSuccess: function (transaction) { 
    const message =  `Payment complete! Reference: ${transaction.reference}`
    
    toast.success(message)
    console.log('success')
    dispatch(getPaymentstatus('success'))
    
  },
  onCancel: (response) => {
    toast.error(`Cancelled ${response.reference}`)
    dispatch(getPaymentstatus('failed'))

   
  }
});

 
}