import { Box, CardContent, Typography, Card } from "@mui/material";
import userSummeryStyle from "../../styles/Index/userSummeryStyle";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { baseURL } from "../../assets/BaseUrl";
import axios from "axios";

const GETAPI = `${baseURL}api/v1/users`;

// import indexStyle from "../../styles/Index/indexStyle";

const UserSummary = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [maleUsers, setMaleUsers] = useState([]);
  const [femaleUsers, setFemaleUsers] = useState([]);

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;

  const fetchAllUsers = async () => {
    console.log("fetch user function called");

    if (!token) {
      console.error("Authorization token is missing!");
      return;
    }

    try {
      const response = await axios.get(GETAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("API Response:", response);

      const users = response.data.data || []; // Extract users from API response
      setAllUsers(users);
      // console.log("genders  :  ", users[0].gender);

      // Filter users based on gender
      setMaleUsers(
        users.filter((user) => {
          console.log("gender --> : ", user.gender);
          return user.gender === "male";
        })
      );
      setFemaleUsers(
        users.filter((user) => {
          return user.gender === "female";
        })
      );
    } catch (err) {
      console.error(
        "Error fetching users:",
        err.response?.data?.message || "Failed to fetch users"
      );
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllUsers();
    }
  }, []);

  return (
    <Box sx={userSummeryStyle.cardContainer}>
      <Card sx={{ ...userSummeryStyle.small, ...userSummeryStyle.sCard1 }}>
        <CardContent>
          <Typography variant="h6">Total User</Typography>
          <Typography variant="h6">{allUsers.length}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ ...userSummeryStyle.small, ...userSummeryStyle.sCard2 }}>
        <CardContent>
          <Typography variant="h6">No Of Male</Typography>
          <Typography variant="h6">{maleUsers.length}</Typography>
        </CardContent>
      </Card>
      <Card sx={{ ...userSummeryStyle.small, ...userSummeryStyle.sCard3 }}>
        <CardContent>
          <Typography variant="h6">No Of Female</Typography>
          <Typography variant="h6">{femaleUsers.length}</Typography>
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
