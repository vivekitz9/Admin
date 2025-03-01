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
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import SideMenuStyle from "../../styles/Home/SideMenuStyle";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const SideMenu = () => {
  const user = useSelector((store) => store.auth);
  const role = user?.user?.data?.role;

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const navItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "View Users", icon: <PeopleIcon />, path: "all-users" },
    { text: "Mission & Vision", icon: <GoalIcon />, path: "mission-vision" },
    { text: "Member", icon: <PeopleIcon />, path: "member" },
    { text: "Events", icon: <EventIcon />, path: "events" },
    { text: "Banner", icon: <ViewCarouselIcon />, path: "banner" },
    { text: "Gallery", icon: <PhotoLibraryIcon />, path: "gallery" },
    { text: "Blogs", icon: <ArticleIcon />, path: "blogs" },
    { text: "News", icon: <AnnouncementIcon />, path: "news" },
    { text: "Connect with Me", icon: <MailIcon />, path: "write-to-me" },
    { text: "Help & Support", icon: <HelpIcon />, path: "help-support" },
    { text: "Privacy Policy", icon: <LockIcon />, path: "privacy-policy" },
    {
      text: "Terms & Conditions",
      icon: <GavelIcon />,
      path: "terms-conditions",
    },
    {
      text: "Log Out",
      icon: <ExitToAppIcon />,
      action: logout,
    },
  ];

  const navItemsForSubadmin = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "News", icon: <AnnouncementIcon />, path: "news" },
    {
      text: "Log Out",
      icon: <ExitToAppIcon />,
      action: logout,
    },
  ];

  return (
    <Box sx={SideMenuStyle.sidemenuContainer}>
      <List sx={SideMenuStyle.list}>
        {(role === "subadmin" ? navItemsForSubadmin : navItems).map(
          (item, index) => (
            <ListItem
              key={index}
              component={item.path ? NavLink : ""}
              to={item.path ? item.path : undefined}
              onClick={item.action ? item.action : undefined}
              style={
                item.path
                  ? ({ isActive }) => ({
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      background: isActive ? "#968860" : "#84764F",
                    })
                  : {}
              }
              sx={SideMenuStyle.listItem}
            >
              <ListItemAvatar>
                <Avatar sx={SideMenuStyle.avatar}>{item.icon}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.text} sx={{ color: "white" }} />
            </ListItem>
          )
        )}
      </List>
    </Box>
  );
};

export default SideMenu;
