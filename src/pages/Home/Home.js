import { Box, Container } from "@mui/material";
import NavBar from "../../components/Home/NavBar";
import SideMenu from "../../components/Home/SideMenu";
import HomeStyle from "../../styles/Home/HomeStyle";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <NavBar />
      <Box sx={HomeStyle.mainContainer}>
        {/* <Box sx={HomeStyle.leftContainer}> */}
        <SideMenu />
        {/* </Box> */}
        <Box sx={HomeStyle.rightContainer}>
          <Container
            sx={{
              marginLeft: 12,
              marginRight: 0,
              width: "100%",
              position: "relative",
            }}
          >
            <Outlet />
          </Container>
        </Box>
      </Box>
    </>
  );
};
export default Home;
