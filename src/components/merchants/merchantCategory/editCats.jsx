import React, {useEffect, useState} from "react";
import box from "../../../assets/images/box.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editItem } from "Redux/Actions/ActionCreators";
import { updateSingleItem } from "Redux/Actions/ActionCreators";
import { deleteProduct } from "firebasedatas/deleteProduct";
import { getExistingDoc } from "firebasedatas/firebaseAuth";
const EditCategories = ({ cats, uid }) => {
  const {currentUser} = useSelector((state) => state.user)
  const { singleCategory } = useSelector((state) => state.items);
  const [userId, setuserId] = useState()
  const [key, setKey] = useState()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("this is uid", uid);
  useEffect(() => {
    async function getUser () {
    await getExistingDoc(currentUser)
    .then((res) => {
     console.log(res)
      
        setKey(res.key)
        setuserId(res.userId)
    
    })
    .catch((err) => {
     console.log(err)
    })
     }
    
     getUser()
 },[]) 
console.log(singleCategory)
 console.log(userId)
 //console.log(singleCategory?.filter((val) => val.merchantId.stringValue !== userId))

  const editCat = (id) => {
    console.log(id);
    navigate(`/seller/store/${key}`);
    dispatch(editItem(id));
  };
 // console.log(id);
  const deleteItem = async (id) => {
    await deleteProduct(id)
      .then((res) => {
        console.log(res);
        dispatch(
          updateSingleItem(singleCategory?.filter((val) => val.id !== id))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="let swipeIn px-5 mt-[40px] text-zinc-700 min-[450px]:mt-[60px] w-full sm:w-[95%] min-[1000px]:w-[77%] xl:w-[83%] pb-[5rem] sm:pb-[5rem] space-y-[5%] float-right p-6 text-">
      <p className="text-zinc-700 sm:text-xl text-lg font-semibold collectio">
        {cats}
      </p>
      {singleCategory?.filter((val) => val.merchantId.stringValue === userId)?.length === 0 && (
        <div className="w-full max-[450px]:h-[100vw] h-[30vw] inset-0 relative">
          <div className=" m-auto absolute w-[320px] inset-0 flex flex-col justify-center items-center space-y-[4%] h-fit">
            <div className="w-[128px] h-[128px]">
              <img className="w-full h-full" src={box} alt="" />
            </div>
            <div>No item in this category yet</div>
          </div>
        </div>
      )}

      <div className="mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-[1rem]  text-zinc-700">
        {singleCategory?.length !== 0 &&
          singleCategory
            ?.filter((val) => val.merchantId.stringValue === userId)
            .map((item, index) => {
              return (
                <div
                  key={index}
                  className="pb-3 group w-[160px] flex flex-col space-y-2 overflow-hidden h-fit ld_widget bg-white rounded-md sm:rounded-lg"
                >
                  <div className="w-full h-full cursor-pointer duration-300">
                    <div className="w-full h-[140px] img_sz overflow-hidden">
                      <img
                        className="h-full w-full object-cover min-[450px]:object-fill transform duration-200 group-hover:scale-105"
                        src={item.images[0]}
                        alt=""
                      />
                    </div>
                    <div className="mt-2 px-2 min-[450px]:space-y-2 space-y-1 text-sm sm:text-[15px]">
                      <p className="truncate  w-[100vw] text-zinc-700 sm:pr-[10%]">
                        <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[150px] min-[450px]:w-[200px]">
                          {item.name.stringValue}
                        </span>
                      </p>
                      <p className="truncate w-[98vw] text-zinc-700 font-thin sm:pr-[10%] flex flex-wrap overflow-hidden">
                        <span className="text-ellipsis whitespace-nowrap overflow-hidden w-[150px] min-[450px]:w-[200px]">
                          {item.description.stringValue}
                        </span>
                      </p>
                    </div>
                    <div className="mt-2 min-[450px]:mt-5 px-2 text-[15px] font-medium sm:font-semibold text-zinc-700">
                      {" "}
                      {`₦${item.price.stringValue}`}
                    </div>
                  </div>

                  <div className="flex justify-between text-white px-2 items-center text-sm sm:text-[16px]">
                    <button
                      onClick={() => {
                        editCat(item.id);
                      }}
                      className="bg-zinc-600 p-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteItem(item.id);
                      }}
                      className="bg-red-600 p-1"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default EditCategories;
