import { Box, CardContent, Typography, Card } from "@mui/material";
import userSummeryStyle from "../../styles/Index/userSummeryStyle";
// import indexStyle from "../../styles/Index/indexStyle";

const UserSummary = () => {
  return (
    <Box sx={userSummeryStyle.cardContainer}>
      <Card sx={{ ...userSummeryStyle.small, ...userSummeryStyle.sCard1 }}>
        <CardContent>
          <Typography variant="h6">Total User</Typography>
          <Typography variant="h6">5 M</Typography>
        </CardContent>
      </Card>
      <Card sx={{ ...userSummeryStyle.small, ...userSummeryStyle.sCard2 }}>
        <CardContent>
          <Typography variant="h6">No Of Male</Typography>
          <Typography variant="h6">3 M</Typography>
        </CardContent>
      </Card>
      <Card sx={{ ...userSummeryStyle.small, ...userSummeryStyle.sCard3 }}>
        <CardContent>
          <Typography variant="h6">No Of Female</Typography>
          <Typography variant="h6">2 M</Typography>
        </CardContent>
      </Card>
      <Card sx={{ ...userSummeryStyle.small, ...userSummeryStyle.sCard4 }}>
        <CardContent>
          <Typography variant="h6">Active User</Typography>
          <Typography variant="h6">3.5 M</Typography>
        </CardContent>
      </Card>
      <Card sx={{ ...userSummeryStyle.small, ...userSummeryStyle.sCard5 }}>
        <CardContent>
          <Typography variant="h6">Inactive User</Typography>
          <Typography variant="h6">1.5 M</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default UserSummary;
