const SideMenuStyle = {
  sidemenuContainer: {
    // background: "#FFD6D6",
    background: "#84764F",
    position: "relative",
    height: "100%",
    width: "270px",
    paddingLeft: 2,
    zIndex: 5,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track": {
      // background: "#FFD6D6",
      background: "#84764F",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      // background: "#FFB6B6",
      background: "#968860",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      // background: "#FF9090",
      background: "#968860",
      cursor: "pointer",
    },
  },
  list: {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
    marginTop: 0,
    padding: 0,
  },
  listItem: {
    background: "#84764F",
    marginBottom: "2px",
    "&:hover": {
      bgcolor: " #968860",
      color: "white",
      cursor: "pointer",
    },
    transition: "background-color 0.3s",
  },
  avatar: {
    background: "white",
    color: "#84764F",
  },
};
export default SideMenuStyle;
