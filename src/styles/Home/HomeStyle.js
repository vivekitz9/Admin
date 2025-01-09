const HomeStyle = {
  mainContainer: {
    display: "flex",
    gap: 2,
    position: "absolute",
    marginLeft: 0,
    marginRight: 0,
    padding: 0,
    marginTop: 10,
    background: "#e8f4fd",
    height: "88vh",
    width: "100vw",
    overflow: "hidden",
  },
  leftContainer: {
    // border: "2px black blue",
    position: "relative",
    width: "280px",
    overflowY: "auto",
  },
  rightContainer: {
    position: "relative",
    height: "100%",
    flex: 1,
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    // border: "2px solid red",
  },
};
export default HomeStyle;
