import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// import { isAuthenticated } from "../services/utills/authentication/login";
// import { useToast } from "@chakra-ui/react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const history = useHistory();
  // const toast = useToast();
  // const isAuth = isAuthenticated(toast);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) history?.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  console.log(user);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
