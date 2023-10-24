import React,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getExistingDoc } from 'firebasedatas/firebaseAuth';
import { useNavigate } from 'react-router-dom';
import newimage from "../../assets/images/new.png"
import Header from 'components/Landing/minors/headers/header';
import GroupHeaders from 'components/groupHeadings/groupHeaders';
import MobileNav from 'components/mobilenav/mobileNav';
import {AiOutlineArrowRight} from 'react-icons/ai'
const UserInfo = () => {
    const {currentUser} = useSelector((state) => state.user)
    const [username, setUsername] = useState();
     const [email, setEmail] = useState()
     const dispatch = useDispatch()
     const navigate = useNavigate()
       //console.log(name, description, price.)
       useEffect(() => {
        if(!currentUser) return
       async function getUser () {
       await getExistingDoc(currentUser)
       .then((res) => {
        console.log(res)
        setUsername(res.name)
        setEmail(res.email)
       })
       .catch((err) => {
        console.log(err)
       })
        }
       
        getUser()
    },[])
    
    function handleLogout() {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        
      }
    

    return (
        <div className='w-full h-full'>

        <Header/>
        <GroupHeaders headings={'User Information'}/>
        <div className='px-3 py-6 mt-[18px]  max-[450px]:mt-[50px] relative bg-white rounded-lg mx-auto w-[95vw] h-fit'>
              
              {username && <button
              onClick={() => {
                handleLogout()
              }}
              className='absolute right-3 top-3 p-[2px] border  border-zinc-700'>Log out</button>}
                <div className=' items-center justify-start flex space-x-2'>
                    <div className='w-[50px] h-[50px]'>
                        <img src={newimage} alt="" className="w-full h-full object-cover" />

                    </div>

                   {username && <div className='text-zinc-700 space-y-2'>
                        <div>{`Name: ${username} `}</div>
                        <div>{`Email: ${email}`}</div>
                    </div>}
                    {!username && <div className='text-zinc-700 flex items-center space-x-2'>
                        <div
                        onClick={() => {
                            navigate("/signin")
                        }}
                        >Log in</div> <span>/</span>
                        <div
                          onClick={() => {
                            navigate("/signup")
                        }}
                        >Sign up</div>
                    </div>}
                </div>
        

       
        </div>
        <div className='w-[95vw] text-zinc-700  mx-auto px-3 my-4 py-6 bg-white '>
          <div
          onClick={() => {
            if (currentUser) {
              navigate(`/order-history/${currentUser}`)
            }
            else {
              navigate("/userinfo")
            }
            
          }}
          className='flex  items-center justify-between'>
          <span>Order History</span>
          <AiOutlineArrowRight className="text-[23px]"/>
          </div>
          
        </div>
        <MobileNav/>
        </div>
    )
}

export default UserInfo