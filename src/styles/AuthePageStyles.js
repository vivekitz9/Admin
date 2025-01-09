const AuthPageStyles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    padding: "16px",
    overflow: "hidden",
    background: "linear-gradient(to right, #8e44ad, #f39c12)",
  },
  logoBox: {
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    width: 90,
    height: 90,
    objectFit: "cover",
    backgroundColor: "gray",
    overflow: "hidden",
  },
  card: {
    maxWidth: 400,
    width: "100%",
    margin: "auto",
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "16px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  },
  button: {
    marginTop: "8px",
    padding: "12px",
    background: "linear-gradient(to right, #8e44ad, #3498db)",
    transition: "background 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    "&:hover": { background: "linear-gradient(to right, #a469bd, #5cace2)" },
  },
  bottomText: {
    display: "flex",
    marginTop: 2,
  },
  authButton: {
    paddingLeft: 2,
    color: "#2196f3",
    "&:hover": {
      color: "#1769aa",
      cursor: "pointer",
    },
  },
};

export default AuthPageStyles;
