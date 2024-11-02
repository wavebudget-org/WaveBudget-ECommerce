import React, { useState, useEffect } from "react";
import { categories } from "./data";
import "./addproduct.scss";
import { MdOutlinePhotoSizeSelectActual } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { sendToStore } from "firebasedatas/addProduct";
import { getExistingProduct } from "firebasedatas/getExisting";
import { useSelector, useDispatch } from "react-redux";
import { editItem } from "Redux/Actions/ActionCreators";
const AddProduct = ({ merchant, uid, key }) => {
  const [selectedImage, setselectedImage] = useState(null);
  const [isEditButton, setisEditButton] = useState(false);
  const [downloadedImage, setdownloadedImage] = useState(null);
  const [price, setprice] = useState(0);
  const { itemId } = useSelector((state) => state.items);
  //const [selectedCategory, setselectedCategory] = useState("");
  const [isChecked, setisChecked] = useState(false);
  const [description, setdescription] = useState("");
  const [qty, setQty] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setname] = useState("");
  const [isSubmit, setisSubmit] = useState(false);
  const [selectedCat, setselectedCat] = useState();
  const [id, setId] = useState(itemId);
  const [imagedata, setimagedata] = useState({
    first: { img: null, isEdit: false },
    second: { img: null, isEdit: false },
    third: { img: null, isEdit: false },
    forth: { img: null, isEdit: false },
  });
  const [selectedImageObj, setselectedImageObj] = useState({
    first: null,
    second: null,
    third: null,
    forth: null,
  });
  //const selectedImageObj = ;

  useEffect(() => {
    //if (!itemId) return

    async function getData() {
      if (itemId) {
        console.log(itemId);
        await getExistingProduct(itemId)
          .then((res) => {
            console.log(res);
            dispatch(editItem(null));
            const { name, qty, description, category, price, image } = res;
            setname(name);
            setdescription(description);
            setselectedCat(category);
            setprice(price);
            setQty(qty);

            setselectedImageObj({
              first: image[0],
              second: image[1],
              third: image[2],
              forth: image[3],
            });

            setimagedata({
              first: { img: image[0], isEdit: false },
              second: { img: image[1], isEdit: false },
              third: { img: image[2], isEdit: false },
              forth: { img: image[3], isEdit: false },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    getData();
  }, [itemId]);

  const chooseImage = (e) => {
    const newImgObj = { ...selectedImageObj };
    const newImgdata = { ...imagedata };
    if (e.target.files[0]) {
      const file = e.target.files[0];
      //selectedImageObj[e.target.id] = file;
      newImgdata[e.target.id].img = file;
      newImgdata[e.target.id].isEdit = true;
      if (file.size > 3000000) {
        toast.error("Image size should not exceeds 3MB");
        return;
      }
      // console.log(imageData)
      newImgObj[e.target.id] = URL.createObjectURL(file);

      setselectedImageObj(newImgObj);

      // console.log(selectedImageObj[e.target.id])
    }
  };
  const removeImage = (e) => {
    const newImgObj = { ...selectedImageObj };
    const newImgdata = { ...imagedata };
    newImgObj[e.target.id] = null;
    newImgdata[e.target.id].img = null;
    newImgdata[e.target.id].isEdit = true;

    setimagedata(newImgdata);
    setselectedImageObj(newImgObj);
  };

  const selectedFn = (cat) => {
    setselectedCat(cat);
    console.log(cat);
  };
  console.log(imagedata);
  const { first, second, third, forth } = selectedImageObj;
  console.log(uid, key);
  const saveToDatabse = async () => {
    setisSubmit(true);
    const validateData = {
      name,
      description,
      price,
      qty,
      image: imagedata,
      category: selectedCat,
    };

    for (let i in validateData) {
      if (validateData[i] === "") {
        this.$toast.error(`${i} is empty`);
        setisSubmit(false);
        return;
      }
    }

    let count = 0;
    Object.values(imagedata).forEach((val) => {
      if (val.img === null) {
        count++;
        if (count >= 4) {
          toast.error("Image cannot be empty");
          setisSubmit(false);
          count = 0;
          return;
        }
      }
    });

    const payload = {
      name,
      description,
      storeName: merchant,
      merchantId: uid,
      qty,
      image: imagedata,
      category: selectedCat,
      price,
      id,
    };

    await sendToStore(payload)
      .then((res) => {
        console.log(res);
        setisSubmit(false);
        toast.success("Saved successfully");

        setname("");
        setdescription("");
        setQty("");
        //this.imageFile = null;
        setselectedCat("");
        setprice(0);
        setselectedImageObj({
          first: null,
          second: null,
          third: null,
          forth: null,
        });
        setimagedata({
          first: { img: null, isEdit: false },
          second: { img: null, isEdit: false },
          third: { img: null, isEdit: false },
          forth: { img: null, isEdit: false },
        });
        //this.editCategory(null);
        //this.$toast.error("Error");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //console.log('from first',selectedImageObj.first)

  return (
    <div className="let swipeIn mt-[40px] text-zinc-700 min-[450px]:mt-[60px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[83%] pb-[5rem] sm:pb-[5rem] space-y-[5%] float-right p-6 text-">
      <div className="space-y-[5%] w-full sm:w-[80%] mx-auto">
        <div className="flex items-center justify-between">
          <div className="w-6 h-6 bg-none"></div>
          <p className="font-medium text-center text-lg sm:text-xl uppercase">product details</p>
          <div className="w-6 h-6 bg-none"></div>
        </div>

        <div className="rounded-md relative p-3 sm:p-6 border space-y-[5%] border-zinc-700">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative w-full border text-sm h-[160px] sm:h-[230px] rounded-md border-zinc-700">
              <div className={first ? "w-full h-[160px] sm:h-[230px] rounded md" : "hidden"}>
                <img src={first} alt="" className="w-full h-full object-cover rounded-md" />
              </div>
              <div className={first ? "hidden" : "w-[50%] absolute inset-0 m-auto h-fit flex flex-col justify-center items-center"}>
                <div className="w-8 h-8 sm:w-6 sm:h-6">
                  <MdOutlinePhotoSizeSelectActual className="text-[25px] text-zinc-700" />
                </div>
                <div className="flex flex-row">
                  <label className="label text-center">
                    <input
                      type="file"
                      name="file"
                      id="first"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={(e) => {
                        chooseImage(e);
                      }}
                    />
                    <span className="font-normal text-zinc-900">Select an image</span>
                  </label>
                </div>
              </div>
              <button
                onClick={(e) => {
                  removeImage(e);
                }}
                id="first"
                className={first ? "absolute text-white py-1 px-2 bg-zinc-700 rounded-md right-0 top-0" : "hidden"}>
                Edit
              </button>
            </div>

            <div className="relative w-full text-sm border h-[160px] sm:h-[230px] rounded-md border-zinc-700">
              <div className={second ? "w-full h-[160px] sm:h-[230px] rounded md" : "hidden"}>
                <img src={second} alt="" className="w-full h-full object-cover rounded-md" />
              </div>
              <div className={second ? "hidden" : "w-[50%] absolute inset-0 m-auto h-fit flex flex-col justify-center items-center"}>
                <div className="w-8 h-8 sm:w-6 sm:h-6">
                  <MdOutlinePhotoSizeSelectActual className="text-[25px] text-zinc-700" />
                </div>
                <div className="flex flex-row">
                  <label className="label text-center">
                    <input
                      type="file"
                      name="file"
                      id="second"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={(e) => {
                        chooseImage(e);
                      }}
                    />
                    <span className="font-normal text-zinc-700">Select an image</span>
                  </label>
                </div>
              </div>
              <button
                onClick={(e) => {
                  removeImage(e);
                }}
                id="second"
                className={second ? "absolute text-white py-1 px-2 bg-zinc-700 rounded-md right-0 top-0" : "hidden"}>
                Edit
              </button>
            </div>

            <div className="relative w-full text-sm border h-[160px] sm:h-[230px] rounded-md border-zinc-700">
              <div className={third ? "w-full h-[160px] sm:h-[230px] rounded md" : "hidden"}>
                <img src={third} alt="" className="w-full h-full object-cover rounded-md" />
              </div>
              <div className={third ? "hidden" : "w-[50%] absolute inset-0 m-auto h-fit flex flex-col justify-center items-center"}>
                <div className="w-8 h-8 sm:w-6 sm:h-6">
                  <MdOutlinePhotoSizeSelectActual className="text-[25px] text-zinc-700" />
                </div>
                <div className="flex flex-row">
                  <label className="label text-center">
                    <input
                      type="file"
                      name="file"
                      id="third"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={(e) => {
                        chooseImage(e);
                      }}
                    />
                    <span className="font-normal text-center text-zinc-700">Select an image</span>
                  </label>
                </div>
              </div>
              <button
                onClick={(e) => {
                  removeImage(e);
                }}
                id="third"
                className={third ? "absolute text-white py-1 px-2 bg-zinc-700 rounded-md right-0 top-0" : "hidden"}>
                Edit
              </button>
            </div>

            <div className="relative w-full text-sm border h-[160px] sm:h-[230px] rounded-md border-zinc-700">
              <div className={forth ? "w-full h-[160px] sm:h-[230px] rounded md" : "hidden"}>
                <img src={forth} alt="" className="w-full h-full object-cover rounded-md" />
              </div>
              <div className={forth ? "hidden" : "w-[50%] absolute inset-0 m-auto h-fit flex flex-col justify-center items-center"}>
                <div className="w-8 h-8 sm:w-6 sm:h-6">
                  <MdOutlinePhotoSizeSelectActual className="text-[25px] text-zinc-700" />
                </div>
                <div className="flex flex-row">
                  <label className="label text-center">
                    <input
                      type="file"
                      name="file"
                      id="forth"
                      accept="image/jpeg, image/png, image/jpg"
                      onChange={(e) => {
                        chooseImage(e);
                      }}
                    />
                    <span className="font-normal text-zinc-700">Select an image</span>
                  </label>
                </div>
              </div>
              <button
                onClick={(e) => {
                  removeImage(e);
                }}
                id="forth"
                className={forth ? "absolute text-white py-1 px-2 bg-zinc-700 rounded-md right-0 top-0" : "hidden"}>
                Edit
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <p className="text-sm text-[16px] font-medium">
              <span>Select Category</span>
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 items-center justify-center">
              {categories.map(({ cats }, idx) => {
                return (
                  <label key={idx} className="container text-sm mr-1">
                    {cats}
                    <input
                      type="checkbox"
                      checked={selectedCat === cats}
                      onChange={() => {
                        selectedFn(cats);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="form-group space-y-3">
            <label className="block form__label text-sm text-[16px] font-medium" htmlFor="">
              <span>Name</span>
            </label>
            <input
              onChange={(e) => {
                setname(e.target.value);
              }}
              className="block form__input input-field h-8 sm:h-11 px-2 border-zinc-700 rounded-md focus:outline-none text-zinc-700"
              type="text"
              name="name"
              placeholder="Name of item"
              value={name}
            />
          </div>
          <div className="form-group space-y-3">
            <label className="block form__label text-sm text-[16px] font-medium" htmlFor="">
              <span>Price</span>
            </label>
            <input
              onChange={(e) => {
                setprice(e.target.value);
              }}
              className="block form__input input-field  h-8 sm:h-11 px-2 border-zinc-700 rounded-md focus:outline-none text-zinc-700"
              type="number"
              name="price"
              placeholder="Price in ₦"
              value={price}
            />
          </div>
          <div className="form-group space-y-3">
            <label className="block form__label text-sm text-[16px] font-medium" htmlFor="">
              <span>Available Qty.</span>
            </label>
            <input
              onChange={(e) => {
                setQty(e.target.value);
              }}
              className="block form__input input-field  h-8 sm:h-11 px-2 border-zinc-700 rounded-md focus:outline-none text-zinc-700"
              type="number"
              name="quantity"
              placeholder="quantities"
              value={qty}
            />
          </div>
          <div className="form-group relative space-y-3">
            <label className="block form__label text-sm text-[16px] font-medium " htmlFor="desc">
              <span>Description</span>
            </label>

            <textarea
              className="block form__input p-3 border border-zinc-700 focus:outline-none resize-none relative rounded-md w-full h-[200px]"
              type="text"
              rows="5"
              cols="30"
              placeholder="Description of product"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}></textarea>
          </div>

          <button onClick={saveToDatabse} className="rounded-md text-white p-2 w-full font-medium bg-[#009999] hover:bg-[#009999f4]">
            {!isSubmit ? (
              <span>Submit</span>
            ) : (
              <div className="flex justify-center items-center">
                <div className="rounded-full border-2 animate-spin border-r-0 border-b-0 w-6 h-6 border-slate-50"></div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
