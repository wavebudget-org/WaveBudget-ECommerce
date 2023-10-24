import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";
import {
  HomePage,
  SignIn,
  SignUp,
  ProductDetail,
  UserCart,
  DetailPage,
  ActivationCard,
  MerchantSignUp,
  AddToStore,
  AwaitActivation,
  EditStore,
  UserInfo,
  MerchantSignIn,
  MerchantInfo,
  MerchantHome,
  AdminHome,
  AdminCustomer,
  UserDetail,
  AdminMerchant,
  MerchantDetail,
  UserHistory,

} from "Pages";

import Scrolltotop from "components/UI/ScrollToTop";

const App = () => {
  return (
    <div className="app_wrapper bg-gray-200 sm:text-[16px] text-sm">
      <div>
        <Toaster
          toastOptions={{
            duration: 5000,
            position: "top-center",
            success: {
              style: {
                background: "#222",
                color: "#fff",
              },
            },
            error: {
              duration: 5000,
              position: "top-center",
              style: {
                background: "red",
                color: "#fff",
              },
            },
          }}
        />
      </div>
      <Router>
        <Scrolltotop />
        <Routes>
          {/*    LANDING PAGE */}

          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<UserCart />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/seller/activate-account" element={<ActivationCard />} />
          <Route path="/seller/not-activated" element={<AwaitActivation />} />
          <Route path="/seller/register" element={<MerchantSignUp />} />
          <Route path="/seller/store/:id" element={<AddToStore />} />
          <Route path="/seller/edit-item" element={<EditStore />} />
          <Route path="/userinfo" element={<UserInfo />} />
          <Route path="/order-history/:id" element={<UserHistory />} />
          <Route path="/seller/login" element={<MerchantSignIn />} />
          <Route path="/seller/userinfo" element={<MerchantInfo />} />
          <Route path="/seller/home" element={<MerchantHome />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/customer" element={<AdminCustomer />} />
          <Route path="/admin/userdetail/:id" element={<UserDetail />} />
          <Route path="/admin/merchant" element={<AdminMerchant />} />
          <Route path="/admin/merchantdetail/:id" element={<MerchantDetail />} />
         
          {/*    AUTH PAGE */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
