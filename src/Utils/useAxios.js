import axios from "axios";

const FetchClient = () => {
  const defaultOptions = {
    baseURL: 'https://jekaeat-d4rs.onrender.com/api',
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  return instance;
};

export default FetchClient();
