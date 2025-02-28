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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { baseURL } from "../../assets/BaseUrl";

const GETAPI = `${baseURL}api/v1/contactus`;

const ContactUs = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset to first page on search
  };

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(GETAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllUsers(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedUser(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (token) {
      fetchAllUsers();
    }
  }, [token]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", mb: 2 }}
        >
          Contact Us
        </Typography>
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <TextField
            label="Search User"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            sx={{ width: "400px" }}
          />
        </Box>
      </Box>
      <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
        <CardContent>
          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
              <CircularProgress />
            </Box>
          )}

          {error && <Alert severity="error">{error}</Alert>}

          {!loading && !error && (
            <List>
              {filteredData.length > 0 ? (
                filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((user) => (
                    <Paper key={user.id} sx={{ my: 1, p: 1 }}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ width: 50, height: 50 }} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={user.name}
                          secondary={
                            <>
                              {user.email} | <b>Phone:</b> {user.mobile}
                            </>
                          }
                        />
                        <Button
                          variant="contained"
                          sx={{ ml: 1 }}
                          onClick={() => handleView(user)}
                        >
                          View
                        </Button>
                      </ListItem>
                    </Paper>
                  ))
              ) : (
                <Typography variant="body1" color="textSecondary">
                  No users found.
                </Typography>
              )}
            </List>
          )}
        </CardContent>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={allUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Dialog
        open={viewModalOpen}
        onClose={closeViewModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography>Name: {selectedUser?.name}</Typography>
        </DialogContent>
        <DialogContent>
          <Typography>Phone: {selectedUser?.mobile}</Typography>
        </DialogContent>
        <DialogContent>
          <Typography>Email: {selectedUser?.email}</Typography>
        </DialogContent>
        <DialogContent>
          <Typography>Description: {selectedUser?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeViewModal} variant="contained">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ContactUs;
