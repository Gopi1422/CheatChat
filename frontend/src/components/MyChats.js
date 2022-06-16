import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  // const [loggedUser, setLoggedUser] = useState();
  // const loggedUser = JSON.parse(localStorage.getItem("userInfo"));

  const { selectedChat, setSelectedChat, user, setUser, chats, setChats } =
    ChatState();

  const toast = useToast();

  // console.log(user._id);
  // console.log(loggedUser._id);

  const fetchChats = async (loggedUser) => {
    // console.log(user._id);
    // console.log(loggedUser.accessToken);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${loggedUser.accessToken}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (err) {
      // console.log(err);
      toast({
        title: "Failed to Load the chats!",
        description: "Please Refresh Page...",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("userInfo"));
    setUser(loggedUser);
    fetchChats(loggedUser);
    // eslint-disable-next-line
  }, [fetchAgain]);

  // console.log(error);

  // console.log(user._id);
  // console.log(loggedUser._id);
  // console.log(chats);
  // if (!chats) history.push("/");

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      overflow={"hidden"}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="87%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                {/* {selectedChat?.users[1].name} */}
                <Text>
                  {!chat.isGroupChat
                    ? getSender(user, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
