import React, { useState } from "react";
import NavBarStyle from "../../styles/Home/NavBarStyle";
import logoImage from "../../assets/images/logoImage.jpg";
import {
  Box,
  Container,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  ListItemIcon,
  IconButton,
  Tooltip,
} from "@mui/material";
import { PersonAdd, Settings, Logout } from "../../assets/icons/icons";
import shivdeepLogo from "../../assets/images/shivdeepLogo.jpeg";

const NavBar = () => {
  const [openClose, setOpenClose] = useState(null);
  const open = Boolean(openClose);
  const handleOpen = (event) => {
    setOpenClose(event.currentTarget);
  };

  const handleClose = () => {
    setOpenClose(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <Box sx={NavBarStyle.mainContainer}>
      <Container sx={NavBarStyle.navContainer}>
        <Box sx={NavBarStyle.logoContainer}>
          <Avatar
            alt="logo"
            src={shivdeepLogo}
            sx={{
              width: 50,
              height: 50,
              marginTop: "5px",
              border: "3px solid white",
              boxShadow: "0 0 5px rgba(0,0,0,0.3)",
            }}
            onClick={() => (window.location.href = "/")}
          />
        </Box>
        <Box sx={NavBarStyle.navBarProfile}>
          <Tooltip /* title="Account settings" */>
            <IconButton
              onClick={handleOpen}
              size="small"
              sx={NavBarStyle.profileBtn}
              aria-controls={open ? "account-menu" : ""}
              aria-haspopup="true"
              aria-expanded={open ? "true" : ""}
            >
              <Avatar
                alt="logo"
                src={logoImage}
                sx={{
                  width: 40,
                  height: 40,
                  marginTop: "5px",
                  border: "3px solid white",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={openClose}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          sx={NavBarStyle.navBarMenu}
          disableAutoFocusItem
          disablePortal
        >
          <MenuItem onClick={handleClose}>
            <Avatar />
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Avatar /> My account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Container>
    </Box>
  );
};

export default NavBar;
