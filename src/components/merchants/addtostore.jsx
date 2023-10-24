import React, {useEffect, useState} from "react";
import DesktopDashNav from "./dashboard/desktopNav/desktopdashnav";
import AddProduct from "./addproduct/addProduct";
import MobileDashboard from "./dashboard/mobiledashnav";
import TopNavBar from "./topnavbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getExistingDoc } from "firebasedatas/firebaseAuth";

const AddToStore = () => {
    const {id} = useParams()
    const [merchant, setMerchant] = useState()
    const [merchantId, setmerchantId] = useState()
    const [key, setKey] = useState()
    const dispatch = useDispatch()
    const {currentUser} = useSelector((state) => state.user)
    //const imageFile = {};
  useEffect(() => {
    async function getUser () {
    await getExistingDoc(currentUser)
    .then((res) => {
     console.log(res)
     setMerchant(res.store)
        setKey(res.key)
     setmerchantId(res.userId)
    })
    .catch((err) => {
     console.log(err)
    })
     }
    
     getUser()
 },[]) 

 

 

 console.log(id)
 console.log(merchant)
    return (
        <div className="w-full h-full  bg-gray-50 inset-0 sm:pb-32 fixed overflow-y-auto overflow-x-hidden">
            <TopNavBar merchant={merchant}/>
            <DesktopDashNav />
            <AddProduct merchant={merchant} uid={merchantId} key={id}/>
            <MobileDashboard />
        </div>
    )
}

export default AddToStore