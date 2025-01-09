const NavBarStyle = {
  mainContainer: {
    // background: "linear-gradient(90deg, #4e54c8, #8f94fb)",
    background: "#FFD6D6",
    color: "white",
    height: 80,
    padding: "0 20px",
    width: "100vw",
    position: "fixed",
    top: 0,
    zIndex: 1,
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  navContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 10px",
    backgroundColor: "inherit",
    color: "#fff",
    width: "90vw",
  },
  logoContainer: {
    cursor: "pointer",
    zIndex: 2,
  },
  logo: {
    marginRight: 2,
    fontFamily: "monospace",
    fontWeight: 700,
    letterSpacing: ".3rem",
    color: "inherit",
    textDecoration: "none",
  },
  navBarMenu: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(144, 8, 8, 0.32))",
    marginTop: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      marginLeft: -0.5,
      marginRight: 1,
      zIndex: 1,
    },
  },
  profileBtn: {
    marginLeft: 2,
    "--IconButton-hoverBg": "#ad5b5b",
  },
};

export default NavBarStyle;
