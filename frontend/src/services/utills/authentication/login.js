import axios from "axios";

axios.defaults.withCredentials = true;

export const isAuthenticated = (toast) => {
  let authenticated = false;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  let isAccess = true;

  // console.log(userInfo);

  // const checkExpiry = async () => {
  if (userInfo && new Date().getTime() > userInfo.accessExpiry) {
    localStorage.removeItem("userInfo");
  }

  if (accessToken && new Date().getTime() > accessToken.expiry) {
    isAccess = false;
    localStorage.removeItem("accessToken");
  }

  // if (refreshToken && new Date().getTime() > refreshToken.expiry) {
  //   localStorage.removeItem("refreshToken");
  // }
  // };

  // await checkExpiry();

  if (accessToken && refreshToken && isAccess) {
    authenticated = true;
    // console.log(authenticated);
    return authenticated;
  }

  if (!refreshToken || !accessToken || !isAccess) {
    if (accessToken) localStorage.removeItem("accessToken");
    if (userInfo) localStorage.removeItem("userInfo");
    if (refreshToken) localStorage.removeItem("refreshToken");

    // console.log("Refresh Token not found, please login again...");
    authenticated = false;
    // console.log(authenticated);
    return authenticated;
  }
  // if ((!accessToken || isAccess) && refreshToken) {
  //   try {
  //     authenticated = true;
  //     console.log("Inside...");

  //     const config = {
  //       headers: {
  //         authorization: "Bearer " + userInfo?.refreshToken,
  //       },
  //     };

  //     const { data } = await axios.post(
  //       "/auth/refresh",
  //       {
  //         withCredentials: true,
  //       },
  //       config
  //     );
  //     const userAccessToken = {
  //       authSession: data.authSession,
  //       expiry: data.accessExpiry,
  //     };
  //     const userInfoNew = {
  //       _id: userInfo._id,
  //       name: userInfo.name,
  //       email: userInfo.email,
  //       phone: userInfo.phone,
  //       data: `Device Again Verified!!`,
  //       accessToken: data.accessToken,
  //       refreshToken: userInfo.refreshToken,
  //       accessExpiry: data.accessExpiry,
  //       refreshExpiry: userInfo.refreshExpiry,
  //     };

  //     localStorage.setItem("userInfo", JSON.stringify(userInfoNew));
  //     localStorage.setItem("accessToken", JSON.stringify(userAccessToken));
  //   } catch (error) {
  //     console.log(error.response.data);
  //     authenticated = false;
  //     toast({
  //       title: `${error.response.data.data}`,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //       position: "bottom",
  //     });
  //   }

  //   console.log(authenticated);

  //   return authenticated;
  // }
};
