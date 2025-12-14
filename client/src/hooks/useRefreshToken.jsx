import axios from "../api/axios";
import useAuth from "./useAuth";
import { apis } from "../api/axios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post(
      apis.refresh,
      {},
      {
        withCredentials: true,
      },
    );

    setAuth((prev) => {
      return { ...prev, accessToken: response.data.access };
    });
    return response.data.access;
  };

  return refresh;
};

export default useRefreshToken;
