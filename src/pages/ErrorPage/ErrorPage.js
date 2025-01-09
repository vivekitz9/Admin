import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import errorPage from "../../styles/ErrorPage/errorPage";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Box sx={errorPage.mainContainer}>
      <Typography variant="h3" gutterBottom>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" gutterBottom>
        Oops! Contants does not exist.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ mt: 3 }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default ErrorPage;
