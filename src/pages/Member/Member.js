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
import { useNavigate } from "react-router-dom";

const GETAPI = `${baseURL}api/v1/users`;

const Member = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedUser, setSelectedUser] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset to first page on search
  };

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;

  let memberCount = 0;

  for (let user of allUsers) {
    if (user.isMember === "true") memberCount++;
  }

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(GETAPI, {
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

  // Download Card Function
  const downloadCard = (userData) => {
    navigate("/member-card", { state: { userData } });
    console.log("Print User Data to Member Component : ", userData);
  };

  // Handle View

  const handleView = (temp) => {
    setSelectedUser(temp);
    setViewModalOpen(true);
  };

  // Handle Close View
  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedUser(null);
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
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          All Members
        </Typography>
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <TextField
            label="Search Member"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            sx={{ width: "400px" }}
          />
        </Box>
      </Box>
      <hr color="#84764F" style={{ marginTop: "-8px" }} />
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
                      user.isMember === "true" && (
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
                            <Button
                              variant="contained"
                              sx={{ marginLeft: 1 }}
                              onClick={() => handleView(user)}
                            >
                              View Details
                            </Button>
                            <Button
                              variant="contained"
                              sx={{ marginLeft: 1 }}
                              // startIcon={<FileDownloadIcon />}
                              onClick={() => downloadCard(user)}
                            >
                              View Card
                            </Button>
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
          count={memberCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Open view Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={closeViewModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" margin={2}>
            FULL NAME : {selectedUser?.fullName}
          </Typography>
          <Typography variant="h6" margin={2}>
            USER NAME : {selectedUser?.userName}
          </Typography>
          <Typography variant="h6" margin={2}>
            PHONE NUMBER : {selectedUser?.mobile}
          </Typography>
          <Typography variant="h6" margin={2}>
            MEMBER ID : {selectedUser?.memberId}
          </Typography>
          <Typography variant="h6" margin={2}>
            DATE OF BIRTH : {selectedUser?.dob}
          </Typography>
          <Typography variant="h6" margin={2}>
            GRNDER : {selectedUser?.gender}
          </Typography>
          <Typography variant="h6" margin={2}>
            DISTRICT : {selectedUser?.district}
          </Typography>
          <Typography variant="h6" margin={2}>
            State : {selectedUser?.state}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeViewModal} variant="contained">
            Close
          </Button>
          <Button
            variant="contained"
            sx={{ marginLeft: 1 }}
            // startIcon={<FileDownloadIcon />}
            onClick={() => downloadCard(selectedUser)}
          >
            View Card
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Member;
