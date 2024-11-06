import React from "react";
import LandingWidget from "./landingWidget/landingWidget";
import { useNavigate } from "react-router-dom";
const ProductWidget = ({ items }) => {
  //const { items } = useSelector((state) => state.items);
  //const [data, setdata] = useState(items);
  const navigate = useNavigate();

  return (
    <div className="mt-[1rem] px-[2%] md:px-[1%] lg:px-[2%] space-y-[1rem]">
      <p className=" top_heading">Just for You</p>

      <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
        {items?.map(({ name, description, id, image, price }, idx) => {
          return (
            <div
              key={idx}
              onClick={() => {
                navigate(`/product/${id}`);
              }}>
              <LandingWidget name={name} image={image.values[0].mapValue.fields.url.stringValue} id={id} descriptions={description} price={price} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductWidget;
