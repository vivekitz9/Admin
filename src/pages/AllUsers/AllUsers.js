import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Alert,
  Box,
  Paper,
  TablePagination,
  TextField,
} from "@mui/material";

const API = "http://shivdeeplande.com:8001/api/v1/users";

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset to first page on search
  };

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;

  let usersCount = 0;
  let adminCount = 0;

  for (let user of allUsers) {
    if (user.userrole === "user") usersCount++;
    else adminCount++;
  }

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAllUsers(response.data.data || []); // Extract users from API response
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Handle Pagination

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = allUsers.filter((row) =>
    row.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (token) {
      fetchAllUsers();
    }
  }, [token]);

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          All Users
        </Typography>
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <TextField
            label="Search User"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            sx={{ width: "400px" }}
          />
        </Box>
      </Box>
      <hr color="#800000" style={{ marginTop: "-8px" }} />
      <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
        <CardContent>
          {/* Loading Indicator */}
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {/* Error Message */}
          {error && <Alert severity="error">{error}</Alert>}

          {/* User List */}
          {!loading && !error && (
            <List>
              {filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(
                    (user) =>
                      user.userrole != "admin" && (
                        <Paper key={user.id} sx={{ my: 1, p: 1 }}>
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar
                                src={
                                  user.image || "https://via.placeholder.com/50"
                                }
                                alt={user.fullName}
                                sx={{ width: 50, height: 50 }}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${user.fullName} (${user.userName})`}
                              secondary={
                                <>
                                  {user.email} | <b>Role:</b> {user.userrole}
                                </>
                              }
                            />
                          </ListItem>
                        </Paper>
                      )
                  )
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No users found.
                </Typography>
              )}
            </List>
          )}
        </CardContent>
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={usersCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
};

export default AllUsers;
