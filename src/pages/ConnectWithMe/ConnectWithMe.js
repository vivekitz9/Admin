import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  TextField,
  Button,
  IconButton,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// Sample user list
const users = [
  {
    id: 1,
    name: "Alice",
    lastMessage: "Hey, how are you?",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Bob",
    lastMessage: "Let's catch up tomorrow!",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Charlie",
    lastMessage: "Can you send the file?",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "jone",
    lastMessage: "Can you send the file?",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 5,
    name: "Mayank",
    lastMessage: "Can you send the file?",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 6,
    name: "raj",
    lastMessage: "Can you send the file?",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 7,
    name: "raj2",
    lastMessage: "Can you send the file?",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 8,
    name: "raj3",
    lastMessage: "Can you send the file?",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 9,
    name: "raj4",
    lastMessage: "Can you send the file?",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
];

const ConnectWithMe = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState({});
  const chatEndRef = useRef(null);

  // Open chat with a selected user
  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setChatHistory((prev) => ({ ...prev, [user.id]: prev[user.id] || [] }));
  };

  // Send message
  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      const newMessage = { sender: "You", text: message };
      const userResponse = { sender: selectedUser.name, text: "Got it!" }; // Mock response

      setChatHistory((prev) => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), newMessage],
      }));

      setMessage("");

      // Simulated reply after 1 second
      setTimeout(() => {
        setChatHistory((prev) => ({
          ...prev,
          [selectedUser.id]: [...(prev[selectedUser.id] || []), userResponse],
        }));
      }, 1000);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

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
          {users.map((user) => (
            <ListItem
              key={user.id}
              button
              onClick={() => handleSelectUser(user)}
            >
              <Avatar src={user.avatar} sx={{ marginRight: 2 }} />
              <ListItemText primary={user.name} secondary={user.lastMessage} />
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
              Chat with {selectedUser.name}
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
              {chatHistory[selectedUser.id]?.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "You" ? "flex-end" : "flex-start",
                    marginBottom: 1,
                  }}
                >
                  <Box
                    sx={{
                      background: msg.sender === "You" ? "#84764F" : "#e0e0e0",
                      color: msg.sender === "You" ? "#fff" : "#000",
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
