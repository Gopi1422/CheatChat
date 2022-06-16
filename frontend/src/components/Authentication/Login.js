import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Select,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialFormState = {
  name: "",
  email: "",
  code: "+91",
  phone: "",
  pic: "",
  otp: "",
};

const initialLoadingState = {
  sendOtp: false,
  login: false,
};

const Login = (props) => {
  const [form, setForm] = useState(initialFormState);
  const isSignUp = props.isSignUp;
  const [loading, setLoading] = useState(initialLoadingState);
  const [isDisabled, setIsDisabled] = useState(true);
  const toast = useToast();
  const history = useHistory();
  const [hidden, setHidden] = useState(true);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const postDetails = (pics) => {};

  const sendOtp = async () => {
    setLoading({ ...loading, sendOtp: true });
    if (
      (!isSignUp && !form.phone) ||
      (isSignUp && (!form.phone || !form.email || !form.phone))
    ) {
      toast({
        title: `${
          isSignUp
            ? "Please fill all the field.."
            : "Please enter the phone number.."
        }`,
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading({ ...loading, sendOtp: false });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // console.log(form.code + form.phone);
      // await axios.get("/auth/test", {}, config);

      const { data } = await axios.post(
        "/auth/sendOtp",
        {
          name: `${form.name}`,
          phone: `${form.code + form.phone}`,
          email: `${form.email}`,
          isLogin: !isSignUp,
        },
        config
      );
      // console.log("Data..");
      console.log("Your OTP: " + data.otp);
      localStorage.setItem("userTempInfo", JSON.stringify(data));
      setLoading({ ...loading, sendOtp: false });
      setHidden(false);
      setIsDisabled(false);
    } catch (error) {
      let title = "";

      if (!error.response.data.data) title = error.response.data;
      else title = error.response.data.data;
      toast({
        title: `${title}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading({ ...loading, sendOtp: false });
    }
  };

  const submitHandler = async () => {
    const userInfo = await JSON.parse(localStorage.getItem("userTempInfo"));
    // console.log(userInfo);
    setLoading({ ...loading, login: true });

    if (!userInfo) {
      toast({
        title: "User Information can't be retrieved!!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading({ ...loading, login: false });
    }

    if (!form.otp) {
      toast({
        title: "Please fill all the field..",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading({ ...loading, login: false });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/auth/verifyOtp",
        {
          name: `${userInfo.name}`,
          phone: `${userInfo.phone}`,
          email: `${userInfo.email}`,
          hash: `${userInfo.hash}`,
          otp: `${form.otp}`,
          isLogin: `${userInfo.isLogin}`,
          withCredentials: true,
        },
        config
      );
      // console.log(data);
      toast({
        title: `${
          userInfo.isLogin ? "Login Successful!!" : "Registration Successful!!"
        }`,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      const userAccessToken = {
        authSession: data.authSession,
        expiry: data.accessExpiry,
      };
      const userRefreshToken = {
        refreshTokenID: data.refreshTokenID,
        expiry: data.refreshExpiry,
      };
      localStorage.setItem("accessToken", JSON.stringify(userAccessToken));
      localStorage.setItem("refreshToken", JSON.stringify(userRefreshToken));
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.removeItem("userTempInfo");
      setLoading({ ...loading, login: false });
      history.push("/chats");
    } catch (error) {
      // console.log(error);
      toast({
        title: `${error.response.data.data}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading({ ...loading, login: false });
    }
  };

  return (
    <VStack spacing="5px">
      {isSignUp && (
        <>
          <FormControl id="first-name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              placeholder="Enter Your Name"
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              placeholder="Enter Your Email"
              onChange={handleChange}
            />
          </FormControl>
        </>
      )}
      <FormControl id="login_phone" isRequired>
        <FormLabel>Phone No.</FormLabel>
        <HStack spacing="5px">
          {/* placeholder="Select Code" */}
          <Select
            name="code"
            defaultValue="+91"
            width="8rem"
            onChange={handleChange}
          >
            <option value="+91">+91</option>
            <option value="+10">+10</option>
            <option value="+88">+88</option>
          </Select>
          <Input
            name="phone"
            type="number"
            placeholder="Enter Your phone number"
            onChange={handleChange}
          />
        </HStack>
      </FormControl>
      <Button
        colorScheme="blue"
        width="50%"
        style={{ marginTop: 15 }}
        onClick={sendOtp}
        placeSelf="flex-end"
        isLoading={loading.sendOtp}
      >
        Send OTP
      </Button>

      <FormControl id="otp" visibility={hidden ? "collapse" : "visible"}>
        <FormLabel>OTP</FormLabel>
        <Input
          name="otp"
          type="number"
          placeholder="Enter Your OTP"
          onChange={handleChange} // (e) => setOtp(e.target.value)
        />
      </FormControl>

      {isSignUp && (
        <FormControl id="pic">
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            name="pic"
            type="file"
            p={1.5}
            accept="image/*"
            placeholder="Enter Your Email"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl>
      )}

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        disabled={isDisabled}
        isLoading={loading.login}
      >
        {isSignUp ? "Sign Up" : "Login"}
      </Button>

      {!isSignUp && (
        <Button
          variant="solid"
          colorScheme="red"
          width="100%"
          onClick={() => {
            // setPhone("123456789");
          }}
        >
          Get Guest User Credentials
        </Button>
      )}
    </VStack>
  );
};

export default Login;

// import { Button } from "@chakra-ui/button";
// import { FormControl, FormLabel } from "@chakra-ui/form-control";
// import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
// import { VStack } from "@chakra-ui/layout";
// import { useState } from "react";
// import axios from "axios";
// import { useToast } from "@chakra-ui/react";
// import { useHistory } from "react-router-dom";

// const Login = () => {
//   const [show, setShow] = useState(false);
//   const handleClick = () => setShow(!show);
//   const toast = useToast();
//   const [email, setEmail] = useState();
//   const [password, setPassword] = useState();
//   const [loading, setLoading] = useState(false);

//   const history = useHistory();

//   const submitHandler = async () => {
//     setLoading(true);
//     if (!email || !password) {
//       toast({
//         title: "Please Fill all the Feilds",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }

//     // console.log(email, password);
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };

//       const { data } = await axios.post(
//         "/api/user/login",
//         { email, password },
//         config
//       );

//       // console.log(JSON.stringify(data));
//       toast({
//         title: "Login Successful",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setLoading(false);
//       history.push("/chats");
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: error.response.data.message,
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//     }
//   };

//   return (
//     <VStack spacing="10px">
//       <FormControl id="email" isRequired>
//         <FormLabel>Email Address</FormLabel>
//         <Input
//           value={email}
//           type="email"
//           placeholder="Enter Your Email Address"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>
//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup size="md">
//           <Input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             type={show ? "text" : "password"}
//             placeholder="Enter password"
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>
//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         isLoading={loading}
//       >
//         Login
//       </Button>
//       <Button
//         variant="solid"
//         colorScheme="red"
//         width="100%"
//         onClick={() => {
//           setEmail("guest@example.com");
//           setPassword("123456");
//         }}
//       >
//         Get Guest User Credentials
//       </Button>
//     </VStack>
//   );
// };

// export default Login;
