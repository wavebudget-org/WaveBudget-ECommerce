import React, { useEffect, useState } from "react";
import AdminDesktopDashboard from "../dashboard/admindesktopDash";
import AdminMobileDashboard from "../dashboard/adminmobileDash";
import AdminTopBar from "../dashboard/adminTopBar";
import CloudinaryUploadWidget from "cloudinary/cloudinaryWidget";
import { createBanner } from "firebasedatas/addProduct";
import toast from "react-hot-toast";
import { getBanner } from "firebasedatas/getProducts";
import { CgClose } from "react-icons/cg";

const AdminBanner = () => {
  const [publicId, setPublicId] = useState({ id: "", url: "" });
  const [images, setImages] = useState([]);
  const [uploadPreset] = useState("wavebudget");
  const [isSubmit, setisSubmit] = useState(false);
  const [cloudName] = useState("ddkb4x2w4");
  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    folder: "wavebudget",
    maxImageFileSize: 2000000,
  });
  useEffect(() => {
    if (publicId.id !== "" && publicId.url !== "") {
      setImages((prevItems) => [...prevItems, publicId]);
      setPublicId({ id: "", url: "" });
    }
  }, [publicId]);

  useEffect(() => {
    async function getData() {
      await getBanner()
        .then((res) => {
          const data = [];
          res.values.forEach((doc) => {
            const { fields } = doc.mapValue;
            const item = {
              id: fields.id.stringValue,
              url: fields.url.stringValue,
            };

            data.push(item);
          });
          setImages(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    getData();
  }, []);

  const add = async () => {
    setisSubmit(false);
    await createBanner(images)
      .then((res) => {
        toast.success("Saved successfully");
        setImages([]);
        setisSubmit(false);
      })
      .catch((err) => {
        setisSubmit(false);
        console.log(err);
      });
  };

  const deleteImage = (e) => {
    const image = images?.filter((_, index) => {
      return index !== e;
    });

    setImages(image);
  };
  return (
    <div className="w-full h-full">
      <AdminTopBar />
      <div className="let mx-auto swipeIn mt-[35px] text-zinc-700 min-[450px]:mt-[65px] w-full sm:w-[95%] min-[1000px]:w-[80%] xl:w-[83%] pb-[5rem] sm:pb-[5rem] space-y-[5%] float-right p-6 text-">
        <div className="rounded-md relative p-3 sm:p-6 border space-y-[5%] border-zinc-700">
          <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />
          {images && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images?.map((item, index) => {
                // const myImage = cld.image(item.id);
                return (
                  <div className="relative w-full border text-sm h-[160px] sm:h-[230px] rounded-md border-zinc-700" key={index}>
                    <CgClose className="absolute text-white font-medium text-[24px] top-2 right-2 cursor-pointer" onClick={() => deleteImage(index)} />
                    <div className="w-full h-[160px] sm:h-[230px] rounded md">
                      {/* <AdvancedImage style={{ maxWidth: "100%" }} cldImg={myImage} plugins={[responsive(), placeholder()]} /> */}
                      <img src={item.url} alt="" className="w-full h-full object-cover rounded-md" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <button className="rounded-md text-white p-2  font-medium bg-[#009999] hover:bg-[#009999f4]" onClick={add}>
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
      <AdminDesktopDashboard />
      <AdminMobileDashboard />
    </div>
  );
};

export default AdminBanner;
