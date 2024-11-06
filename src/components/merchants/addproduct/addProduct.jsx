import React, { useState, useEffect } from "react";
import { categories } from "./data";
import "./addproduct.scss";
import { toast } from "react-hot-toast";
import { sendToStore } from "firebasedatas/addProduct";
import { getExistingProduct } from "firebasedatas/getExisting";
import { useSelector, useDispatch } from "react-redux";
import { editItem } from "Redux/Actions/ActionCreators";
import { useForm } from "react-hook-form";
// import { Cloudinary } from "@cloudinary/url-gen";
import CloudinaryUploadWidget from "cloudinary/cloudinaryWidget";
// import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";

const AddProduct = ({ merchant, uid }) => {
  const { itemId } = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const [isSubmit, setisSubmit] = useState(false);
  const [selectedCat, setselectedCat] = useState();
  const [publicId, setPublicId] = useState({ id: "", url: "" });
  const [images, setImages] = useState([]);

  const [cloudName] = useState("temfad");
  // Replace with your own upload preset
  const [uploadPreset] = useState("wavebudget");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    folder: "wavebudget",
    maxImageFileSize: 2000000,
  });

  // Create a Cloudinary instance and set your cloud name.
  // const cld = new Cloudinary({
  //   cloud: {
  //     cloudName,
  //   },
  // });

  useEffect(() => {
    if (publicId.id !== "" && publicId.url !== "") images.push(publicId);
  }, [publicId, images]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    async function getData() {
      if (itemId) {
        await getExistingProduct(itemId)
          .then((res) => {
            dispatch(editItem(null));
            const { name, qty, description, category, price, image } = res;
            setValue("name", name);
            setValue("description", description);
            setValue("price", price);
            setValue("quantity", qty);
            setselectedCat(category);
            setImages(image);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    getData();
  }, [itemId, dispatch, setValue]);

  const selectedFn = (cat) => {
    setselectedCat(cat);
  };

  const saveToDatabse = async (e) => {
    setisSubmit(true);

    const payload = {
      name: e.name,
      description: e.description,
      storeName: merchant,
      merchantId: uid,
      qty: e.quantity,
      image: images,
      category: selectedCat,
      price: e.price,
      id: itemId,
    };

    await sendToStore(payload)
      .then((res) => {
        console.log(res);
        setisSubmit(false);
        toast.success("Saved successfully");
        setselectedCat("");
        reset();
        setImages([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="let swipeIn mt-[40px] text-zinc-700 min-[450px]:mt-[60px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[83%] pb-[5rem] sm:pb-[5rem] space-y-[5%] float-right p-6 text-">
      <div className="space-y-[5%] w-full sm:w-[80%] mx-auto">
        <div className="flex items-center justify-between">
          <div className="w-6 h-6 bg-none"></div>
          <p className="font-medium text-center text-lg sm:text-xl uppercase">product details</p>
          <div className="w-6 h-6 bg-none"></div>
        </div>

        <form className="rounded-md relative p-3 sm:p-6 border space-y-[5%] border-zinc-700" onSubmit={handleSubmit(saveToDatabse)}>
          <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
          {images && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images?.map((item, index) => {
                // const myImage = cld.image(item.id);
                return (
                  <div className="relative w-full border text-sm h-[160px] sm:h-[230px] rounded-md border-zinc-700" key={index}>
                    <div className="w-full h-[160px] sm:h-[230px] rounded md">
                      {/* <AdvancedImage style={{ maxWidth: "100%" }} cldImg={myImage} plugins={[responsive(), placeholder()]} /> */}
                      <img src={item.url} alt="" className="w-full h-full object-cover rounded-md" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

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
              <span>Name of Item</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="block form__input input-field h-8 sm:h-11 px-2 border-zinc-700 rounded-md focus:outline-none text-zinc-700"
              type="text"
              name="name"
              placeholder="Name of item"
            />
            {errors.name && <span className="font-small text-[#FF0000]">{errors.name.message}</span>}
          </div>
          <div className="form-group space-y-3">
            <label className="block form__label text-sm text-[16px] font-medium" htmlFor="">
              <span>Price</span>
            </label>
            <input
              {...register("price", { required: "Price is required" })}
              className="block form__input input-field  h-8 sm:h-11 px-2 border-zinc-700 rounded-md focus:outline-none text-zinc-700"
              type="number"
              name="price"
              placeholder="Price in ₦"
            />
            {errors.price && <span className="font-small text-[#FF0000]">{errors.price.message}</span>}
          </div>
          <div className="form-group space-y-3">
            <label className="block form__label text-sm text-[16px] font-medium" htmlFor="">
              <span>Available Qty.</span>
            </label>
            <input
              {...register("quantity", { required: "Quantity is required" })}
              className="block form__input input-field  h-8 sm:h-11 px-2 border-zinc-700 rounded-md focus:outline-none text-zinc-700"
              type="number"
              name="quantity"
              placeholder="Quantities"
            />
            {errors.quantity && <span className="font-small text-[#FF0000]">{errors.quantity.message}</span>}
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
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <span className="font-small text-[#FF0000]">{errors.description.message}</span>}
          </div>

          <button type="submit" className="rounded-md text-white p-2 w-full font-medium bg-[#009999] hover:bg-[#009999f4]">
            {!isSubmit ? (
              <span>Submit</span>
            ) : (
              <div className="flex justify-center items-center">
                <div className="rounded-full border-2 animate-spin border-r-0 border-b-0 w-6 h-6 border-slate-50"></div>
              </div>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
