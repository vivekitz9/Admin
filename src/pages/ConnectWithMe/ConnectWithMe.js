import { Box, Typography } from "@mui/material";
import React from "react";

const ConnectWithMe = () => {
  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          Messages
        </Typography>
      </Box>
      <hr color="#84764F" style={{ marginTop: "-8px" }} />
      {/* here the list of the users who Massegesed */}
    </Box>
  );
};

export default ConnectWithMe;
