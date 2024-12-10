// import React, { useState, useEffect } from "react";
// import pxl from "../../assets/images/pxl.jpg";
// import HidHeader from "components/Landing/minors/headers/hidHeader";
// import { BsCartPlus } from "react-icons/bs";
// import { BiArrowBack } from "react-icons/bi";
// import { MdPreview } from "react-icons/md";
// import WaveFooter from "components/Landing/minors/footer/footer";
// //import MobileNav from "components/mobilenav/mobileNav";
// //import AuthCard from "components/Landing/minors/authcard/authcard";
// import MobileBtns from "components/mobilenav/mobileBtns";
// import GroupHeaders from "components/groupHeadings/groupHeaders";
// import { useNavigate, useLocation, useParams } from "react-router-dom";
// import { itemsToCart, calculateTotal } from "Redux/Actions/ActionCreators";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-hot-toast";
// import timeFormat from "Utils/timeFormat";
// import { getExistingDoc } from "firebasedatas/firebaseAuth";
// import { HandlePayment } from "paystack/paystackInterface";
// import { getExistingProduct } from "firebasedatas/getExisting";
// import PaymentNotification from "components/paymentnotification/paymentNote";
// import { saveHistory } from "firebasedatas/transactionHistory";

// const PaymentGateway = () => {
//   const { id } = useParams();
//   //const { state } = useLocation();
//   //const { name, description, price, qty, storeName, images } = state;
//   const { cartItems } = useSelector((state) => state.cart);
//   const [isShow, setisShow] = useState(false);
//   const [username, setUsername] = useState();
//   const [name, setname] = useState();
//   const [description, setdescription] = useState();
//   const [qty, setQty] = useState();
//   const [storeName, setStorename] = useState();
//   const [images, setImages] = useState();
//   const [email, setEmail] = useState();
//   const [isVisible, setIsVisible] = useState(true);
//   const { currentUser, payStatus } = useSelector((state) => state.user);
//   const [isSlider, setisSlider] = useState(false);
//   const [price, setprice] = useState();
//   const [curPrice, setcurPrice] = useState();
//   const [curBNPL, setcurBNPL] = useState();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [count, setCount] = useState(1);
//   const [bnpl, setbnpl] = useState();
//   const [transHistory, setTransHistory] = useState();
//   const [isNote, setisNote] = useState(false);
//   const dt = new Date();
//   const month = dt.toLocaleString("default", { month: "long" });
//   const day = dt.getDate();
//   const year = dt.getFullYear();
//   let hours, minutes, seconds, amPm;
//   //console.log(name, description, price.)
//   useEffect(() => {
//     if (!currentUser) return;
//     async function getUser() {
//       await getExistingDoc(currentUser)
//         .then((res) => {
//           console.log(res);
//           setUsername(res.name);
//           setEmail(res.email);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }

//     getUser();
//   }, []);

//   useEffect(() => {
//     if (!id) return;

//     async function getProduct() {
//       await getExistingProduct(id)
//         .then((res) => {
//           console.log(res);
//           const { name, description, price, qty, storeName, image } = res;
//           setname(name);
//           setdescription(description);
//           setQty(qty);
//           setStorename(storeName);
//           setImages(image);
//           setprice(price);
//           setbnpl(parseInt(price) + parseInt(price * 0.1));
//           setcurBNPL(parseInt(price) + parseInt(price * 0.1));
//           setcurPrice(parseInt(price));
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }
//     getProduct();
//   }, []);

//   const incItem = () => {
//     setCount(count + 1);
//     setcurPrice(curPrice + parseInt(price));
//     setcurBNPL(curBNPL + bnpl);
//   };
//   const decItem = () => {
//     if (count > 1) {
//       setCount(count - 1);
//     } else {
//       setCount(1);
//     }
//     if (curPrice === parseInt(price)) {
//       setcurPrice(parseInt(price));
//       setcurBNPL(parseInt(price) + parseInt(price * 0.1));
//     } else {
//       setcurPrice(curPrice - parseInt(price));
//       setcurBNPL(curBNPL - bnpl);
//     }
//   };
//   const addToCart = () => {
//     if (!currentUser) {
//       toast.error("You must be logged in to add to cart");
//       return;
//     }
//     const payload = {
//       name: name,
//       price: parseInt(price),
//       image: images[0],
//       storeName,
//       userId:currentUser,
//       curPrice,
//       count,
//     };
//     dispatch(itemsToCart(payload, cartItems));

//     //navigate("/cart");
//     dispatch(calculateTotal(cartItems));
//     toast.success("Item added to cart successfully");
//   };

//   const handlePay =  () => {
//     if (!currentUser) {
//       toast.error("You must be logged in to buy");
//       return;
//     }
//     // await HandlePayment(email, parseFloat(curPrice), dispatch);
//     navigate(`/product/payment-gateway/${id}`)
//   };

//   /**
//    *
//    *

//    */

//   useEffect(() => {
//     const history = async () => {
//       if (payStatus) {
//         const payload = {
//           userId: currentUser,
//           name: name,
//           curPrice: parseInt(curPrice),
//           status: payStatus,
//           storeName,
//           count,
//         };

//         setTransHistory([payload]);

//         await saveHistory( {
//           type: "no-checkout",
//           date: `${day} ${month} ${year}`,
//           time: `${timeFormat(hours, minutes, seconds, amPm)}`,
//           createdAt: dt.getTime(),
//           ...payload,
//         })
//           .then((res) => {
//             console.log(res);
//           })
//           .catch((err) => {
//             console.log(err);
//           });

//         setisNote(true);
//       }
//     };

//     history();
//   }, [payStatus]);

//   const handleInstallment = () => {
//     if (!currentUser) {
//       toast.error("You must be logged in to buy");
//       return;
//     }
//     const url =
//       "https://wa.me/2348137960202?text=" +
//       "Username: " +
//       username +
//       "%0a" +
//       "Email:   " +
//       email +
//       "%0a" +
//       "Product Name:   " +
//       name +
//       "%0a" +
//       "Quantity:   " +
//       count +
//       "%0a" +
//       "Price:   " +
//       curBNPL +
//       "%0a" +
//       "Store:   " +
//       storeName +
//       "%0a" +
//       'Product link:  ' + `https://wave-budget-ecommerce.netlify.app/${id}` + '%0a';

//     window.open(url, "blank").focus();
//   };

//   return (
//     <div className='bg-[#0B8E8E] w-full min-h-screen flex flex-col items-center justify-center'>
//       <div className='w-28 h-28 rounded-full bg-white flex items-center justify-center my-10'>
//         <img src="/waveb.png" alt="wavebudget-logo" className='w-10 h-10' />
//       </div>
//       <div className='bg-white w-full max-w-[850px] rounded-md shadow-md grid grid-cols-2'>
//         <div className='bg-white overflow-hidden'>
//           <img src="/transfer.png" alt="transfer-logo" />
//         </div>
//         <div className='px-2 py-5'>
//           <h1 className='text-[#0B8E8E] text-2xl font-bold text-center'>Payment gateway</h1>
//           <p className='font-bold text-[#0B8E8E] my-4'>Notice: <span className='font-normal'>To complete order make a transfer to the account below.</span></p>
//           <div className='p-2'>
//             <div className='border border-solid border-[#08BEBE] p-2 rounded-md'>
//               <h3>Product Details:</h3>
//               <div className="flex flex-col justify-start space-y-[5%] text-zinc-800">
//                 <p>{setStorename}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//       )
// }

// export default PaymentGateway;

import React, { useState, useEffect } from "react";
import pxl from "../../assets/images/pxl.jpg";
import HidHeader from "components/Landing/minors/headers/hidHeader";
import { BsCartPlus } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { MdPreview } from "react-icons/md";
import WaveFooter from "components/Landing/minors/footer/footer";
//import MobileNav from "components/mobilenav/mobileNav";
//import AuthCard from "components/Landing/minors/authcard/authcard";
import MobileBtns from "components/mobilenav/mobileBtns";
import GroupHeaders from "components/groupHeadings/groupHeaders";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { itemsToCart, calculateTotal } from "Redux/Actions/ActionCreators";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import timeFormat from "Utils/timeFormat";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
import { HandlePayment } from "paystack/paystackInterface";
import { getExistingProduct } from "firebasedatas/getExisting";
import PaymentNotification from "components/paymentnotification/paymentNote";
import { saveHistory } from "firebasedatas/transactionHistory";
const PaymentGateway = () => {
  const { id } = useParams();
  //const { state } = useLocation();
  //const { name, description, price, qty, storeName, images } = state;
  const { cartItems } = useSelector((state) => state.cart);
  const [isShow, setisShow] = useState(false);
  const [username, setUsername] = useState();
  const [name, setname] = useState();
  const [description, setdescription] = useState();
  const [qty, setQty] = useState();
  const [storeName, setStorename] = useState();
  const [images, setImages] = useState();
  const [email, setEmail] = useState();
  const [isVisible, setIsVisible] = useState(true);
  const { currentUser, payStatus } = useSelector((state) => state.user);
  const [isSlider, setisSlider] = useState(false);
  const [price, setprice] = useState();
  const [curPrice, setcurPrice] = useState();
  const [curBNPL, setcurBNPL] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [bnpl, setbnpl] = useState();
  const [transHistory, setTransHistory] = useState();
  const [isNote, setisNote] = useState(false);
  const dt = new Date();
  const month = dt.toLocaleString("default", { month: "long" });
  const day = dt.getDate();
  const year = dt.getFullYear();
  let hours, minutes, seconds, amPm;
  //console.log(name, description, price.)
  useEffect(() => {
    if (!currentUser) return;
    async function getUser() {
      await getExistingDoc(currentUser)
        .then((res) => {
          console.log(res);
          setUsername(res.name);
          setEmail(res.email);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getUser();
  }, []);

  useEffect(() => {
    if (!id) return;

    async function getProduct() {
      await getExistingProduct(id)
        .then((res) => {
          console.log(res);
          const { name, description, price, qty, storeName, image } = res;
          setname(name);
          setdescription(description);
          setQty(qty);
          setStorename(storeName);
          setImages(image);
          setprice(price);
          setbnpl(parseInt(price) + parseInt(price * 0.1));
          setcurBNPL(parseInt(price) + parseInt(price * 0.1));
          setcurPrice(parseInt(price));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getProduct();
  }, []);

  const incItem = () => {
    setCount(count + 1);
    setcurPrice(curPrice + parseInt(price));
    setcurBNPL(curBNPL + bnpl);
  };
  const decItem = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      setCount(1);
    }
    if (curPrice === parseInt(price)) {
      setcurPrice(parseInt(price));
      setcurBNPL(parseInt(price) + parseInt(price * 0.1));
    } else {
      setcurPrice(curPrice - parseInt(price));
      setcurBNPL(curBNPL - bnpl);
    }
  };
  const addToCart = () => {
    if (!currentUser) {
      toast.error("You must be logged in to add to cart");
      return;
    }
    const payload = {
      name: name,
      price: parseInt(price),
      image: images[0],
      storeName,
      userId: currentUser,
      curPrice,
      count,
    };
    dispatch(itemsToCart(payload, cartItems));

    //navigate("/cart");
    dispatch(calculateTotal(cartItems));
    toast.success("Item added to cart successfully");
  };

  const handlePay = () => {
    if (!currentUser) {
      toast.error("You must be logged in to buy");
      return;
    }
    // await HandlePayment(email, parseFloat(curPrice), dispatch);
    navigate(`/product/payment-gateway/${id}`);
  };

  /**
   * 
   * 

  
   */

  useEffect(() => {
    const history = async () => {
      if (payStatus) {
        const payload = {
          userId: currentUser,
          name: name,
          curPrice: parseInt(curPrice),
          status: payStatus,
          storeName,
          count,
        };

        setTransHistory([payload]);

        await saveHistory({
          type: "no-checkout",
          date: `${day} ${month} ${year}`,
          time: `${timeFormat(hours, minutes, seconds, amPm)}`,
          createdAt: dt.getTime(),
          ...payload,
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

  const handleInstallment = () => {
    if (!currentUser) {
      toast.error("You must be logged in to buy");
      return;
    }
    const url =
      "https://wa.me/2348137960202?text=" +
      "Username: " +
      username +
      "%0a" +
      "Email:   " +
      email +
      "%0a" +
      "Product Name:   " +
      name +
      "%0a" +
      "Quantity:   " +
      count +
      "%0a" +
      "Price:   " +
      curBNPL +
      "%0a" +
      "Store:   " +
      storeName +
      "%0a" +
      "Product link:  " +
      `https://wave-budget-ecommerce.netlify.app/${id}` +
      "%0a";

    window.open(url, "blank").focus();
  };

  const handleShareReciept = () => {
    navigate("https://wa.me/+2348137960202");
  };

  return (
    <div className="w-full min-h-screen bg-[#0b8e8e] flex flex-col items-center justify-center ">
      <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center my-10">
        <img src="/waveb.png" alt="wavebudget-logo" className="w-10 h-10" />
      </div>
      <h1 className="text-white font-bold text-center text-4xl mb-8">Payment Gateway</h1>
      <div className="mb-[1rem] w-full max-w-[850px] bg-white px-2 py-16 gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="w-full min-[450px]:mt-0 mt-[35px] mx-auto">
          <div className="w-[93%] mx-auto flex flex-col cursor-pointer sm:row-span-2">
            <div className="w-full rounded-sm">
              <div className="bg-white overflow-hidden">
                <img src="/transfer.png" alt="transfer-logo" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-start space-y-[5%] text-zinc-800">
          <h1 className="text-2xl font-bold text-[#0b8e8e]">Product Details</h1>
          <div className="uppercase border-b p-2 w-full grid grid-cols-2 gap-[3.5rem] items-center">
            <span>
              <b>seller:</b>
            </span>
            <span>
              <b>{storeName}</b>
            </span>
          </div>

          <div className="capitalize border-b p-2 w-full grid grid-cols-2 gap-[3.5rem] items-center">
            <span>Product:</span>
            <span>
              <b>{name}</b>
            </span>
          </div>

          <div className="capitalize border-b p-2 w-full grid grid-cols-2 gap-[3.5rem] items-center">
            <span>Price:</span>
            <span>
              <b>{`₦${parseInt(price) || 0}`}</b>
            </span>
          </div>
          <button onClick={handlePay} className="text-white sm:w-full lg:w-full bg-[#009999] flex rounded-lg py-3 justify-center items-center w-[90%]">
            Share payment receipt
          </button>
        </div>
        <div className="flex flex-col justify-start space-y-[5%] text-zinc-800">
          <h1 className="text-2xl font-bold text-[#0b8e8e]">Bank Details</h1>
          <p className="font-bold text-[#0B8E8E] my-4">
            Notice: <span className="font-normal">To complete order make a transfer to the account below.</span>
          </p>
          <p className="font-bold text-[#0B8E8E] my-4">
            Account Name: <span className="font-normal">Wavebudget-FinTech</span>
          </p>
          <p className="font-bold text-[#0B8E8E] my-4">
            Account Number: <span className="font-normal">1234567890</span>
          </p>
          <p className="font-bold text-[#0B8E8E] my-4">
            Bank Name: <span className="font-normal">Wavebudget Bank</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
