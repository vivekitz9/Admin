import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  TextField,
  IconButton,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { baseURL } from "../../assets/BaseUrl";
import axios from "axios";
import { useSelector } from "react-redux";

const ConnectWithMe = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageText, setMessageText] = useState("");
  // const [chatHistory, setChatHistory] = useState({});
  const chatEndRef = useRef(null);
  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;
  const [userData, setUserData] = useState([])
  const [messages, setMessages] = useState([]);
  const [sendSuccess, setSendSuccess] = useState(false)


  // Open chat with a selected user
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setMessages([]);
  };
  // Send message
  const handleSendMessage = async () => {
    if (messageText.trim() && selectedUser) {
      const newMessage = { sender: user?.user?.data?.fullName, text: messageText, id: user?.user?.data?.id };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      try {
        const photo = {
          // uri: imageUri,
          type: 'image/jpeg',
          name: 'test.jpg',
        };
        const payload = new FormData();
        payload.append('senderId', user?.user?.data?.id);
        payload.append('receiverId', selectedUser?.id);
        payload.append('message', messageText);
        console.log('payload----->', payload);

        await fetch(baseURL + "api/v1/chat/send", {
          method: "POST",
          body: payload,
          headers: {
            "Authorization": `Bearer ${token}`,
            Accept: "*",
          },
        }).then(response => {
          console.log('res----->', response);
          return response.json();
        }).then(res => {
          if (res?.success) {
            setSendSuccess(true)
            setMessages([]);
            setMessageText('')
          }
        })
      } catch (error) {
        console.log('error----->', error);
      }

    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    async function fetchUserList() {
      console.log('user---->', user);
      try {
        if(user){
        const response = await axios.get(baseURL + "api/v1/chat/admin/" + user?.user?.data?.id, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response?.data?.success) {
          setUserData(response?.data?.data?.data)
        }
      }
      } catch (error) {
        console.log('error get user------>', error);
      }

    }
    fetchUserList()
  }, [])

  useEffect(() => {
    async function handleGetMessage() {
      try {
        console.log('selectedUser----->', selectedUser);
        if (selectedUser !== null) {
          const response = await axios.get(baseURL + "api/v1/chat/user/" + selectedUser?.id + '/' + user?.user?.data?.id, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response?.data?.success) {
            if (response?.data?.data?.length > 0) {
              response?.data?.data?.map((item) => {
                if (item?.senderId === user?.user?.data?.id) {
                  const newMessage = { sender: user?.user?.data?.fullName, text: item?.text, id: item?.senderId }
                  setMessages((prevMessages) => [...prevMessages, newMessage]);
                } else {
                  const userResponse = { sender: selectedUser.fullName, text: item?.text, id: item?.senderId }
                  setMessages((prevMessages) => [...prevMessages, userResponse]);
                }
              })
            }
          }
        }
      } catch (error) {
        console.log('error get user------>', error);
      }
    }
    handleGetMessage();
  }, [selectedUser, sendSuccess])




  console.log('userData---->', user);
  return (
    <Box
      sx={{
        display: "flex",
        height: "600px",
        width: "100%",
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      {/* Left Sidebar: User List */}
      <Paper
        sx={{ width: "30%", overflowY: "auto", borderRight: "1px solid #ddd" }}
      >
        <Typography
          variant="h6"
          sx={{ textAlign: "center", padding: 2, background: "#f5f5f5" }}
        >
          Chats
        </Typography>
        <List>
          {userData?.length !== 0 && userData?.map((item) => (
            <ListItem
              key={item?.id}
              button
              onClick={() => handleSelectUser(item)}
            >
              <Avatar src={item?.image} sx={{ marginRight: 2 }} />
              <ListItemText primary={item?.fullName} secondary={item?.lastMessage} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Right Side: Chat Box */}
      <Box
        sx={{
          width: "70%",
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {selectedUser ? (
          <>
            <Typography
              variant="h6"
              sx={{ textAlign: "center", padding: 2, background: "#f5f5f5" }}
            >
              Chat with {selectedUser?.fullName}
            </Typography>

            {/* Chat Messages */}
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
                padding: 2,
                background: "#fafafa",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {messages?.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: msg?.id === user?.user?.data?.id ? "flex-end" : "flex-start",
                    marginBottom: 1,
                  }}
                >
                  <Box
                    sx={{
                      background: msg?.id === user?.user?.data?.id ? "#84764F" : "#e0e0e0",
                      color: msg?.id === user?.user?.data?.id ? "#fff" : '#000',
                      padding: 1,
                      borderRadius: "10px",
                      maxWidth: "75%",
                    }}
                  >
                    <Typography variant="body2">{msg.text}</Typography>
                  </Box>
                </Box>
              ))}

              <div ref={chatEndRef} />
            </Box>

            {/* Message Input */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 2,
                borderTop: "1px solid #ddd",
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <IconButton onClick={handleSendMessage} color="primary">
                <SendIcon />
              </IconButton>
            </Box>
          </>
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginTop: "40%", color: "#808080" }}
          >
            Select a user to start chatting
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ConnectWithMe;
