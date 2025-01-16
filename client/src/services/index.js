import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // mengecek apakah token ada
    const accessToken = Cookies.get("accessToken") || null;

    // jika ada request diteruskan dengan mengirim token di header
    if (accessToken) {
      console.log("accessToken ditemukan dan proses dilanjutkan");
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      // jika tidak maka akan dilanjutkan ke proses refresh token
      console.log("accessToken tidak ditemukan");
    }

    return config;
  },

  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config.__isRetryRequest
    ) {
      try {
        console.log("melakukan proses refresh dari access token");
        const response = await axios.get(
          "http://localhost:5000/api/auth/refresh",
          {
            withCredentials: true,
          }
        );

        const newAccessToken = response.data.accessToken;
        console.log("mencetak error config", error.config);
        console.log(
          "accesstoken diperbaharui dan mengulang proses pengecekan authentication"
        );
        Cookies.set("accessToken", newAccessToken, { expires: 1 / 96 });

        error.config.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(error.config);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
