import { useNavigate } from "react-router-dom";
import { formatter } from "Utils/helpers";
const MobileCheckout = ({ total }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="min-[650px]:hidden fixed w-full border-t shadow-lg items-center bg-white inset-x-0 flex gap-3 justify-between p-4 rounded-t-xl bottom-0">
        <div className="text-[16px]">
          <b>
            <span className="mr-3 ">Total:</span>
            <span>{formatter.format(total)}</span>
          </b>
        </div>

        <button onClick={() => navigate("/billing")} className="text-white py-3 bg-[#009999] rounded-2xl flex justify-center items-center w-[100px] ">
          Checkout
        </button>
      </div>
    </>
  );
};

export default MobileCheckout;
