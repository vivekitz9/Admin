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

const NavBar = () => {
  const [openClose, setOpenClose] = useState(null);
  const open = Boolean(openClose);
  const handleOpen = (event) => {
    setOpenClose(event.currentTarget);
  };
  const handleClose = () => {
    setOpenClose(null);
  };

  return (
    <Box sx={NavBarStyle.mainContainer}>
      <Container sx={NavBarStyle.navContainer}>
        <Box sx={NavBarStyle.logoContainer}>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={NavBarStyle.logo}
            onClick={() => (window.location.href = "/")}
          >
            LOGO
          </Typography>
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
                sx={NavBarStyle.navbarAvatar}
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
            <Avatar /> Profile
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
          <MenuItem onClick={handleClose}>
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
