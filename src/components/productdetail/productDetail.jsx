import React, { useState, useEffect } from "react";
import pxl from "../../assets/images/pxl.jpg";
import HidHeader from "components/Landing/minors/headers/hidHeader";
import { BsCartPlus } from "react-icons/bs";
import { BiArrowBack } from "react-icons/bi";
import { MdPreview } from "react-icons/md";
import WaveFooter from "components/Landing/minors/footer/footer";
//import MobileNav from "components/mobilenav/mobileNav";
import ImageSlider from "./imageslider/imageSlider";
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
const ProductDetail = () => {
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
      userId:currentUser,
      curPrice,
      count,
    };
    dispatch(itemsToCart(payload, cartItems));

    //navigate("/cart");
    dispatch(calculateTotal(cartItems));
    toast.success("Item added to cart successfully");
  };

  const handlePay = async () => {
    if (!currentUser) {
      toast.error("You must be logged in to buy");
      return;
    }
    await HandlePayment(email, parseFloat(curPrice), dispatch);
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

        await saveHistory( {
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
      'Product link:  ' + `https://wavebudget.vercel.app/${id}` + '%0a';

    window.open(url, "blank").focus();
  };

  return (
    <div className="w-full h-full ">
      <HidHeader isVisibles={isVisible} />
      <GroupHeaders headings={"Product Descriptions"} />
      <div className=" flex justify-start items-center space-x-2 max-[450px]:hidden text-zinc-700">
        <BiArrowBack className="text-[20px]" />
        Back
      </div>
      <div className="mt-[56px] min-[450px]:mt-[60px] sm:mt-[80px] mb-[1rem] w-full bg-white p-2 min-[450px]:p-3 gap-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <div className="w-full min-[450px]:mt-0 mt-[35px] mx-auto">
          <div className="w-[93%] mx-auto flex flex-col cursor-pointer sm:row-span-2">
            <div className="w-full h-[300px] min-[450px]:h-[400px]  rounded-sm">
              {images && (
                <img
                  className="w-full h-full rounded-sm"
                  src={images[0]}
                  alt="pxl"
                />
              )}
            </div>
            <button
              onClick={() => {
                setisSlider(!isSlider);
              }}
              className="flex justify-center space-x-2 items-center border rounded-sm min-[450px]:py-4 text-zinc-800 bg-white py-2"
            >
              <MdPreview className="text-[16px]" />{" "}
              <span className="">View image detail</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-start space-y-[5%] text-zinc-800">
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
            <span>Outright price:</span>
            <span>
              <b>{`₦${parseInt(price) || 0}`}</b>
            </span>
          </div>
          <div className="capitalize border-b p-2 w-full grid grid-cols-2 gap-[3.5rem] items-center">
            <span> BNPL price:</span>
            <span>
              <b>{`₦${parseInt(price) + parseInt(price * 0.1) || 0}`}</b>
            </span>
          </div>
          <div className="capitalize border-b p-2 w-full grid grid-cols-2 gap-[3.5rem] items-center">
            <span> Available Qty: </span>
            <span>
              <b>{`${qty || 0} pieces`}</b>
            </span>
          </div>

          <div class="w-[50%] my-2 flex border text-zinc-800 font-semibold bg-white h-10 sm:h-14 items-center rounded-sm sm:rounded-md">
            <button
              onClick={incItem}
              class="p-2 flex justify-center items-center hover:text-white rounded-l-md hover:bg-zinc-800 h-full w-4/12"
            >
              <div>+</div>
            </button>
            <button class="p-2 border-l border-r h-full w-5/12">{count}</button>
            <button
              onClick={decItem}
              class="p-2 flex justify-center items-center rounded-r-md hover:text-white hover:hover:bg-zinc-800 h-full w-4/12"
            >
              <div>-</div>
            </button>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center space-y-[3%] p-2 min-[450px]:p-4">
          <div className=" flex w-[90%] sm:w-full lg:w-[90%] justify-between items-center p-2">
            <span>Outright price:</span>{" "}
            <span>
              <b>{`₦${curPrice || 0}`}</b>
            </span>
          </div>
          <div className=" flex w-[90%] sm:w-full lg:w-[90%] justify-between items-center p-2">
            <span>Installment price:</span>{" "}
            <span>
              <b>{`₦${curBNPL || 0}`}</b>
            </span>
          </div>
          <button
            onClick={handlePay}
            className="text-white sm:w-full lg:w-[90%] bg-[#009999] flex rounded-lg py-3 justify-center items-center w-[90%]"
          >
            Buy now
          </button>
          <button
            onClick={handleInstallment}
            className="bg-white sm:w-full lg:w-[90%] border-[#009999] py-3  rounded-lg border flex justify-center items-center w-[90%]"
          >
            Buy on installment
          </button>
          <button
            onClick={addToCart}
            className="text-white sm:w-full lg:w-[90%] bg-sky-900 border py-3 space-x-2   rounded-lg flex justify-center items-center w-[90%]"
          >
            <span>
              <BsCartPlus />
            </span>
            <span className="mr-2">Add to cart</span>
          </button>
        </div>
      </div>

      <div className="mb-[1rem] bg-white w-full overflow-hidden flex flex-col justify-start p-2 min-[450px]:p-4 space-y-[2%]">
        <p className="text-[#009999] font-semibold">Product Details</p>
        <p className=" font-semibold">Overview</p>
        <div className="leading-7 min-[450px]:leading-8">{description}</div>
        <div className="grid grid-cols-1 min-[450px]:grid-cols-2 xl:grid-cols-3">
          {images &&
            images.length > 1 &&
            images.map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-[400px] rounded-sm object-cover"
                >
                  <img
                    className="w-full h-full rounded-sm"
                    src={item}
                    alt="pxl"
                  />
                </div>
              );
            })}
        </div>
      </div>

      <ImageSlider
        isSlider={isSlider}
        setisSlider={setisSlider}
        images={images}
      />
      <PaymentNotification
        isNote={isNote}
        setisNote={setisNote}
        transHistory={transHistory}
      />
      <WaveFooter />
      <MobileBtns
        name={name}
        price={parseInt(price)}
        image={images && images[0]}
        bnpl={curBNPL}
        count={count}
        store={storeName}
        curPrice={parseFloat(curPrice)}
        plink={`https://wavebudget.vercel.app/${id}`}
      />
    </div>
  );
};

export default ProductDetail;
