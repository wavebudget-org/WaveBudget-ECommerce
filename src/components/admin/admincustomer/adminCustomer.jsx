import React, {useState, useEffect} from 'react';
import AdminTopBar from '../dashboard/adminTopBar';
import AdminDesktopDashboard from '../dashboard/admindesktopDash';
import AdminMobileDashboard from '../dashboard/adminmobileDash';
import { getCustomers } from 'firebasedatas/userInformation';
import { useNavigate } from 'react-router-dom';
import loading from  "../../../assets/Svg/loading.svg"

const AdminCustomer = () => {
    const [myCustomers, setCustomers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const customers = []
       
    async function getUsers () {
        await getCustomers (customers)
        .then((res) => {
            console.log(res)
         
            setCustomers(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getUsers()
    },[])
    return  (
        <div className='w-full h-full'>

            <AdminTopBar/>
            <div className="let mx-auto swipeIn py-2 mt-[55px] text-zinc-700 min-[450px]:mt-[68px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[82%] pb-[5rem] sm:pb-[5rem] float-right px-2 text-">
                <div className='grid grid-cols-3 px-2  border-zinc-700 w-full mx-auto '>
                    
                      <div className='w-full justify-center flex items-center'>
                      <span>Name</span>
                        </div>
                        <div className='w-full justify-center flex items-center'>
                        <span className='max-[600px]:hidden'>ID</span>
                        <span className='bg-none min-[600px]:hidden w-2 h-2'></span>
                        </div>
                        <div className='w-full justify-center flex items-center'>
                      
                        <span className='bg-none w-2 h-2'></span>
                        </div>
                        
                         
                       
                     
                    
                    </div>

                    {myCustomers.length === 0 && 
                    <div className='w-full flex items-center justify-center'>
                     <img src={loading} alt="" />
                    </div>
                   }

                    {myCustomers?.map(({name, userId}, idx) => {
                        return (
                            <div
                            key={idx}
                            className='grid grid-cols-3  py-2 px-2 border-b border-zinc-400 w-full items-center mx-auto b'>
                            <div className='flex space-x-2 items-center justify-start max-[600px]:col-span-2'>
                            <span>{idx + 1}</span>
                            <span className="truncate w-[98vw] text-zinc-700 sm:pr-[10%] flex flex-wrap overflow-hidden">
                      <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[190px] min-[450px]:w-[190px]">
                       {name.stringValue}
                      </span>
                    </span>
                            </div>
                        <div className='max-[600px]:hidden'>{userId.stringValue}</div>
                        
                        <div className='w-full flex justify-end'>
                        <button
                        onClick={() => {
                            navigate(`/admin/userdetail/${userId.stringValue}`)
                        }}
                        className=' flex justify-center items-center w-fit p-2 rounded-md bg-[#009999] bg-opacity-25 text-[#009999]'>
                                View Detail
                            </button>
                        </div>
                           
        
                        </div>
                        )
                    })}
                 
                
                </div>

            <AdminDesktopDashboard/>
            <AdminMobileDashboard/>

        </div>
    )
}

export default AdminCustomer