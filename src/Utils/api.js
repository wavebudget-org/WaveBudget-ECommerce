import axios from "Utils/useAxios";

//Vendors

export const getVendors = (token) => {
  return axios.get("/vendors?page=1&limit=20", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const getSingleVendor = (token, id) => {
  return axios.get(`/vendors/${id}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const getSingleVendorMeal = (token, vendorId) => {
  return axios.get(`/meals/${vendorId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
export const getPreviousOrderFromAVendor= (token, vendorId) => {
  return axios.get(`/orders/customer/my-order-by-vendor/${vendorId}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};