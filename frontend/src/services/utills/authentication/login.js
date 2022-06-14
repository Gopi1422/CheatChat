import axios from "axios";

axios.defaults.withCredentials = true;

export const isAuthenticated = async (toast) => {
  let authenticated = false;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));

  // console.log(userInfo);

  if (userInfo && new Date().getTime() > userInfo.refreshExpiry) {
    localStorage.removeItem("userInfo");
  }

  if (accessToken && new Date().getTime() > accessToken.expiry) {
    localStorage.removeItem("accessToken");
  }

  if (refreshToken && new Date().getTime() > refreshToken.expiry) {
    localStorage.removeItem("refreshToken");
  }

  if (accessToken && refreshToken) {
    authenticated = true;
    console.log(authenticated);
    return authenticated;
  }

  if (!refreshToken) {
    if (accessToken) localStorage.removeItem("accessToken");
    if (userInfo) localStorage.removeItem("userInfo");

    console.log("Refresh Token not found, please login again...");

    // toast({
    //   title: `Refresh Token not found, please login again...`,
    //   status: "error",
    //   duration: 5000,
    //   isClosable: true,
    //   position: "bottom",
    // });
  }
  if (!accessToken && refreshToken) {
    try {
      authenticated = true;

      const config = {
        headers: {
          authorization: "Bearer " + userInfo?.refreshToken,
        },
      };

      const { data } = await axios.post(
        "/auth/refresh",
        {
          withCredentials: true,
        },
        config
      );
      const userAccessToken = {
        authSession: data.authSession,
        expiry: data.accessExpiry,
      };
      const userInfoNew = {
        _id: userInfo._id,
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        msg: `Device Verified!!`,
        accessToken: data.accessToken,
        refreshToken: userInfo.refreshToken,
        accessExpiry: data.accessExpiry,
        refreshExpiry: userInfo.refreshExpiry,
      };

      localStorage.setItem("userInfo", JSON.stringify(userInfoNew));
      localStorage.setItem("accessToken", JSON.stringify(userAccessToken));
    } catch (error) {
      console.log(error.response.data);
      authenticated = false;
      toast({
        title: `${error.response.data.msg}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    console.log(authenticated);

    return authenticated;
  }
};
