const SideMenuStyle = {
  sidemenuContainer: {
    background: "#FFD6D6",
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
      background: "#FFD6D6",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#FFB6B6",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#FF9090",
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
    background: "#FFD6D6",
    marginBottom: "2px",
    "&:hover": {
      bgcolor: " #ef9a9a",
      color: "white",
      cursor: "pointer",
    },
    transition: "background-color 0.3s",
  },
  avatar: {
    background: "#800000",
    color: "white",
  },
};
export default SideMenuStyle;
