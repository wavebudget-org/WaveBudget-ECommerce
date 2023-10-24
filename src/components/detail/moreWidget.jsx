import LandingWidget from "components/Landing/minors/landingWidget/landingWidget";
import React,{useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import box from "../../assets/images/box.png"
const MoreWidget = ({payload}) => {
   // const {items} = useSelector((state) => state.items)
    const [data, setdata]  = useState(payload)
    const navigate = useNavigate()
    return (
        <>
        {data?.length === 0 &&
        
        <div className="w-full h-full inset-0 relative"> 
            <div className=" m-auto absolute w-[320px] inset-0 flex flex-col justify-center items-center space-y-[4%] h-fit">
          <div className="w-[128px] h-[128px]">
            <img className="w-full h-full" src={box} alt="" />
          </div>
          <div>No item in this category yet</div>
          <button
          onClick={() => {
            navigate("/")
          }}
          className="text-white sm:w-[50%] bg-sky-900 border py-2 space-x-2   rounded-lg flex justify-center items-center w-[50%]">
            Go back
          </button>
        </div>

        </div>
        
        }
     

        {data?.length !== 0  && <div className="mt-[4rem] min-[450px]:mt-[2rem] px-[2%] md:px-[1%] lg:px-[2%] space-y-[1rem] pb-[60px]" > 

            <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
            {data?.map (({name, description, storeName, id,qty, images, price, available}, idx) => {
                return (
                    <div
                    onClick={() => {
                        navigate(`/product/${id}`)
                    }}
                    >
                     <LandingWidget
                     name={name.stringValue}
                     image={images[0]}
                     id={id}
                     descriptions={description.stringValue}
                     price={price.stringValue}
                    />
                    </div>
                
                )
            })}
        
           
           
            </div>
            
        </div>}
        </>
    )
}

export default MoreWidget