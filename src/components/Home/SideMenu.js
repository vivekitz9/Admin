import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  HomeIcon,
  //   InfoIcon,
  GoalIcon,
  PeopleIcon,
  EventIcon,
  PhotoLibraryIcon,
  ArticleIcon,
  AnnouncementIcon,
  MailIcon,
  HelpIcon,
  LockIcon,
  GavelIcon,
  ExitToAppIcon,
} from "../../assets/icons/icons";
import SideMenuStyle from "../../styles/Home/SideMenuStyle";
import { Link, NavLink } from "react-router-dom";

const SideMenu = () => {
  const navItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "Mission & Vision", icon: <GoalIcon />, path: "mission-vision" },
    { text: "Member", icon: <PeopleIcon />, path: "member" },
    { text: "Events", icon: <EventIcon />, path: "events" },
    { text: "Gallery", icon: <PhotoLibraryIcon />, path: "gallery" },
    { text: "Blogs", icon: <ArticleIcon />, path: "blogs" },
    { text: "News", icon: <AnnouncementIcon />, path: "news" },
    { text: "Write to Me", icon: <MailIcon />, path: "write-to-me" },
    { text: "Help & Support", icon: <HelpIcon />, path: "help-support" },
    { text: "Privacy Policy", icon: <LockIcon />, path: "pravacy-policy" },
    { text: "Terms & Conditions", icon: <GavelIcon />, path: "term-condition" },
    { text: "Log Out", icon: <ExitToAppIcon />, path: "login" },
  ];
  return (
    <Box sx={SideMenuStyle.sidemenuContainer}>
      <List sx={SideMenuStyle.list}>
        {navItems.map((item, index) => (
          <ListItem
            key={index}
            component={NavLink}
            to={item.path}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
              width: "100%",
              background: isActive ? "#ef9a9a" : "#FFD6D6",
            })}
            sx={SideMenuStyle.listItem}
          >
            {/* <NavLink
              to={item.path}
              style={({ isActive }) => ({
                textDecoration: "none",
                color: "inherit",
                background: isActive ? "#ef9a9a" : "",
                display: "flex",
                alignItems: "center",
                width: "110%",
              })}
            > */}
            <ListItemAvatar>
              <Avatar sx={SideMenuStyle.avatar}>{item.icon}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={item.text} />
            {/* </NavLink> */}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
export default SideMenu;
