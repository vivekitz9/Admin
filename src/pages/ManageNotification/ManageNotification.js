import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Switch,
  TablePagination,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import { baseURL } from "../../assets/BaseUrl";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const GETAPI = `${baseURL}api/v1/notification/fetchAllNotifications`;
const POSTAPI = `${baseURL}api/v1/notification/createNotification`;
const PUTAPI = `${baseURL}api/v1`;
const SENDNOTIFICATION = `${baseURL}api/v1/notification/sendNotification`;

const ManageNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: "",
    content: "",
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
  });
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // For Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;
  const role = user?.user?.data?.role;
  const userName = user?.user?.data?.userName;

  const fetchAllNotifications = async () => {
    try {
      const response = await axios.get(GETAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response : ", response.data.data.Items);

      setNotifications(response.data.data.Items || []); // Extract users from API response
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  // Handle Modal Close
  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setNewNotification({ title: "", content: "" });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditData({ title: "", content: "" });
    setSelectedNotification(null);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedNotification(null);
  };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   setNewNotification((prev) => ({ ...prev, file }));
  // };

  const handlePostNotification = async () => {
    console.log("New Notification ---> ", newNotification);

    if (newNotification?.title && newNotification?.content) {
      const formData = new FormData();
      formData.append("notificationTitle", newNotification.title);
      formData.append("notificationDescription", newNotification.content);

      //  Debugging - Check if FormData is correctly populated
      console.log("FormData Entries:");
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      try {
        const response = await axios.post(POSTAPI, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response from API:", response);

        if (response.status === 200) {
          // fetchAllNotifications(); // Uncomment if needed
          closeUploadModal();
          fetchAllNotifications();
        }
      } catch (error) {
        if (error.response) {
          console.error(
            "Server responded with error:",
            error.response.status,
            error.response.data
          );
        } else if (error.request) {
          console.error(
            "No response received. Possible network issue:",
            error.request
          );
        } else {
          console.error("Error in request setup:", error.message);
        }
      }
    } else {
      console.error("Title and content are required!");
    }
  };

  // Handle Edit
  const handleEdit = (notification) => {
    setEditData({
      title: notification.title,
      content: notification.content,
    });
    setSelectedNotification(notification);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedNotification || !selectedNotification.id) {
      console.error("No Notification selected for editing");
      return;
    }

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const formData = new FormData();
    formData.append("title", editData.title);
    formData.append("content", editData.content);

    try {
      const response = await axios.put(
        `${PUTAPI}/${selectedNotification.id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAllNotifications();
      console.log("Notifications updated successfully:", response.data);

      closeEditModal();
    } catch (error) {
      console.error("Error updating Notifications:", error);
    }
  };

  // Handle View
  const handleView = (notification) => {
    setSelectedNotification(notification);
    setViewModalOpen(true);
  };

  const handleSendNotifiction = async (notification) => {
    console.log(notification);
    if (
      notification.notificationTitle &&
      notification.notificationDescription
    ) {
      const formData = new FormData();
      formData.append("title", notification.notificationTitle);
      formData.append("description", notification.notificationDescription);

      try {
        console.log("FormData Entries:");
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }
        const response = await axios.post(SENDNOTIFICATION, formData, {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Post Notification response --> ", response);
      } catch (error) {
        console.error("Error posting Notification:", error);
      }
    } else {
      console.log("News data not found");
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

  useEffect(() => {
    if (token) {
      fetchAllNotifications();
    }
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            Manage Notification
          </Typography>

          {/* Notification Upload Button */}
          <Box sx={{ textAlign: "center", marginBottom: 3 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#84764F" }}
              onClick={() => setUploadModalOpen(true)}
              startIcon={<CloudUploadIcon />}
            >
              Add Notification
            </Button>
          </Box>
        </Box>
        <hr color="#84764F" style={{ marginTop: "-8px" }} />
      </Box>

      {/* Table View */}
      {notifications.length === 0 ? (
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "#888", marginTop: 20 }}
        >
          No Notifications Available
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((notification, index) => (
                  <TableRow key={index}>
                    <TableCell>{notification.notificationTitle}</TableCell>
                    <TableCell>
                      {/* <IconButton onClick={() => handleEdit(notification)}>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#84764F" }}
                          startIcon={<Edit />}
                          onClick={() => {
                            handleEdit(notification);
                            closeViewModal();
                          }}
                        >
                          Edit
                        </Button>
                      </IconButton> */}
                      <Button
                        variant="contained"
                        sx={{ marginLeft: 1 }}
                        onClick={() => handleView(notification)}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        sx={{ marginLeft: 1 }}
                        startIcon={<SendIcon />}
                        onClick={() => handleSendNotifiction(notification)}
                      >
                        Send Notification
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={notifications.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {/* Upload Notification Modal */}
      <Dialog
        open={uploadModalOpen}
        onClose={closeUploadModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Upload New Notification
          </Typography>
          <TextField
            fullWidth
            label="Notification Title"
            value={newNotification.title}
            onChange={(e) =>
              setNewNotification((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Notification Description"
            value={newNotification.content}
            onChange={(e) =>
              setNewNotification((prev) => ({
                ...prev,
                content: e.target.value,
              }))
            }
            multiline
            rows={7}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUploadModal} sx={{ color: "#808080" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePostNotification}
            sx={{ backgroundColor: "#84764F" }}
            disabled={
              !newNotification.title.trim() || !newNotification.content.trim()
            }
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Notification Modal */}
      <Dialog
        open={editModalOpen}
        onClose={closeEditModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Edit Notification
          </Typography>
          <TextField
            fullWidth
            label="Notification Title"
            value={editData.title}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Notification Description"
            value={editData.content}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, content: e.target.value }))
            }
            multiline
            rows={7}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal} sx={{ color: "#808080" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            sx={{ backgroundColor: "#84764F" }}
            disabled={!editData.title.trim() || !editData.content.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Notification Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={closeViewModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h4" gutterBottom>
            {selectedNotification?.notificationTitle}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {selectedNotification?.notificationDescription}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeViewModal} sx={{ color: "#808080" }}>
            Close
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#84764F" }}
            startIcon={<Edit />}
            onClick={() => {
              closeViewModal();
              handleEdit(selectedNotification);
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageNotification;
