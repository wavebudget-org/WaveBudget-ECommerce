import React, {useState} from 'react';
import buy from "../../../assets/images/buy.jpg";
import viewpassword from "../../../assets/Svg/viewpassword.svg";
import logo from "../../../assets/images/waveb.png"
import { useNavigate } from "react-router-dom";
import { userlogin, getUserData, getExistingDoc } from 'firebasedatas/firebaseAuth';
import Loader from 'components/UI/Loader';
import { toast } from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { GetUsersSuccess } from "Redux/Actions/ActionCreators";

const SignIn = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    
  const handleSubmit = async() => {
    const customersId=[]
    const sellersId = []
    setLoading(true)
    await userlogin(email, password)
    .then(async (res) => {
      console.log(res)
      const {uid} = res.user
      await getUserData(customersId, sellersId)
      .then (async (res) => {
        console.log(res)
        const {customersId, sellersId} = res
        if(customersId && customersId.includes(uid)) {
          navigate(-1)
        dispatch(GetUsersSuccess(uid))
        }
        if (sellersId && sellersId.includes(uid)) {
          await getExistingDoc(uid)
          .then ((res) => {
            console.log(res)
            if (res.key) {
              navigate(`/seller/store/${res.key}`)
              dispatch(GetUsersSuccess(uid))
            }
            else {
              //please remove this
             // dispatch(GetUsersSuccess(uid))
              navigate("/seller/not-activated")
            }
          })
          .catch((err) => {
            console.log(err)
          })
          //navigate("/store")
          
        }
       
      })
      .catch((err) => {
        console.log(err)
      })
      setLoading(false)
    })
    .catch((err) => {
      console.log(err)
      setLoading(false)
      toast.error(err.code)
    })


}

    return (

        <div className='w-full h-full cursor-pointer fixed inset-0 '>
            <div className='w-full h-full'>
            <div className='bg-white py-3 px-6 min-[450px]:py-4 min-[450px]:px-4'>
            <div
            onClick={() => {
              navigate("/")
            }}
            className="flex space-x-2 items-center" >
                <div className="w-10 h-6">
                    <img className="w-full h-full" src={logo} alt="" />
                </div>
                <div className="flex flex-col justify-start">
                <div className="uppercase font-semibold text-[#009999]">Wave</div>
                <div className="uppercase font-semibold text-[#009999]">Budget</div>
                </div>
            </div>
            </div>
            <div className='bg-teal-100 flex justify-around  w-full h-full items-center'>

                <div className='hidden md:block md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]'>
                    <img className='w-full h-full mix-blend-multiply' src={buy} alt="buy" />
 
                </div>

                <div className='w-[80vw] h-fit min-[450px]:w-[60%] text-sm md:w-[350px]  lg:w-[400px]  flex flex-col justify-center items-center bg-white p-4 space-y-3 rounded-xl shadow-lg'>
              <p className='text-zinc-800 font-semibold'>Log In</p>
                <div className="form-group space-y-3 w-full">
          <label className="block font-semibold text-zinc-800" htmlFor="email">
            Email Address
          </label>
          <input
            className="block form__input input-field border border-black  rounded-md focus:outline-none w-full h-10 sm:h-11 px-4"
            type="email"
            placeholder=""
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group space-y-3 w-full">
          <label
            className="block font-semibold text-zinc-800"
            htmlFor="password"
          >
            Password
          </label>
          <div className="relative">
            <input
              className="block form__input input-field border pr-6 border-black rounded-md focus:outline-none w-full  h-10 sm:h-11 px-4"
              type={showPassword ? "text" : "password"}
              placeholder=""
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="absolute right-3 max-[450px]:top-[0.5rem] top-3"
            >
              <img
                src={viewpassword}
                alt="viewpassword"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <button
        onClick={handleSubmit}
        className="bg-[#009999] text-white sm:py-3 py-2 rounded-md flex items-center w-full justify-center"
        >{loading ? <Loader/> : <span>Log in</span>}</button>


              <span>Don't have an account yet? <span 
              onClick={() => {
                navigate("/signup")
              }}
              className='mr-3 text-blue-700'>Sign up</span></span>

                </div>
            </div>

            
            </div>
          
        
        </div>
    )
}

export default SignIn