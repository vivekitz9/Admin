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

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Edit } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import { baseURL } from "../../assets/BaseUrl";
import { PROD } from "../../assets/BaseUrl";
import axios from "axios";

const GETAPI = `${baseURL}api/v1/events`;
const POSTAPI = `${baseURL}api/v1/events`;
const PUTAPI = `${baseURL}api/v1/events/`;
const DELETEAPI = `${baseURL}api/v1/events/`;

const POSTNOTIFICATION = `${baseURL}api/v1/notification/sendNotification`;

const today = dayjs();

const Event = () => {
  const [eventList, setEventList] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    eventTitle: "",
    eventDescription: "",
    eventDate: "",
    eventStartTime: today,
    eventEndTime: today,
    image: null,
    uri: "",
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    eventTitle: "",
    eventDescription: "",
    eventDate: "",
    eventStartTime: null,
    eventEndTime: null,
    image: null,
    uri: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;
  const role = user?.user?.data?.role;

  //Fetch All Events
  const fetchAllEvent = async () => {
    try {
      const response = await axios.get(GETAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response?.data?.success) {
        console.log("response=======>", response);
        setEventList(
          response?.data?.data?.sort(
            (a, b) => new Date(b?.eventDate) - new Date(a?.eventDate)
          ) || []
        ); // Extract users from API response
      }
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  // Handle Modal Close
  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setNewEvent({
      eventTitle: "",
      eventDescription: "",
      eventDate: "",
      eventStartTime: null,
      eventEndTime: null,
      image: null,
    });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditData({
      eventTitle: "",
      eventDescription: "",
      eventDate: "",
      eventStartTime: null,
      eventEndTime: null,
      image: null,
    });
    setSelectedEvent(null);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedEvent(null);
  };

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewEvent((prev) => ({ ...prev, image: file }));
  };

  const handlePostEvent = async () => {
    console.log("new Event", newEvent);
    console.log("start Event time", newEvent.eventStartTime);
    console.log("End Event Time", newEvent.eventEndTime);
    if (
      newEvent.eventTitle &&
      newEvent.eventDescription &&
      newEvent.image &&
      newEvent.eventDate &&
      newEvent.eventStartTime &&
      newEvent.eventEndTime
    ) {
      const formData = new FormData();
      formData.append("eventTitle", newEvent.eventTitle);
      formData.append("eventDescription", newEvent.eventDescription);
      formData.append("eventDate", newEvent.eventDate);
      formData.append("eventStartTime", newEvent.eventStartTime);
      formData.append("eventEndTime", newEvent.eventEndTime);

      formData.append("uri", newEvent.eventEndTime);
      if (newEvent.image) {
        formData.append("file", newEvent.image);
      }
      console.log("form Data", formData);

      try {
        const response = await axios.post(POSTAPI, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          fetchAllEvent();
          closeUploadModal();
        }
      } catch (error) {
        console.error("Error posting Event:", error);
      }
    }
  };

  // Handle Edit
  const handleEdit = (event) => {
    console.log("event  :  ", event);
    setEditData({
      eventTitle: event.eventTitle,
      eventDescription: event.eventDescription,
      eventDate: event.eventDate,
      eventStartTime: event.eventStartTime,
      eventEndTime: event.eventEndTime,
      image: null,
    });
    setSelectedEvent(event);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedEvent || !selectedEvent.id) {
      console.error("No Event selected for editing");
      return;
    }

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const formData = new FormData();
    formData.append("eventTitle", editData.eventTitle);
    formData.append("eventDescription", editData.eventDescription);
    formData.append("eventDate", editData.eventDate);
    formData.append("eventStartTime", editData.eventStartTime);
    formData.append("eventEndTime", editData.eventEndTime);

    formData.append("uri", editData.uri);
    if (newEvent.image) {
      formData.append(
        "file",
        editData.image
          ? URL.createObjectURL(editData.image)
          : selectedEvent.image
      );
    }
    formData.append("eventType", "upcoming");

    try {
      const response = await axios.put(
        `${PUTAPI}/${selectedEvent.id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAllEvent();
      console.log("Event updated successfully:", response.data);

      closeEditModal();
    } catch (error) {
      console.error("Error updating Event:", error);
    }
  };

  // **************** Handle Delete ***************

  const handleDelete = async (event) => {
    if (!event?.id) {
      console.error("Invalid event object: Missing ID");
      return;
    }

    if (!token) {
      console.error("Authorization token is missing!");
      return;
    }

    // Show confirmation alert
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this event?`
    );
    if (!isConfirmed) {
      console.log("Delete action canceled.");
      return;
    }

    try {
      await axios.delete(`${DELETEAPI}/${event.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAllEvent();
    } catch (error) {
      console.error(
        "Error deleting Event:",
        error.response?.data?.message || error.message || "Unknown error"
      );
      alert("Failed to delete event. Please try again.");
    }
  };

  // Handle View
  const handleView = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  function getFirst20Words(text) {
    let words = text.split(/\s+/).slice(0, 20); // Split by spaces and take first 20 words
    return words.join(" ") + "..."; // Join back into a string
  }

  const postNotifiction = async (event) => {
    console.log("Post Notification --- > : ", event);
    if (event.eventTitle && event.eventDescription) {
      const formData = new FormData();
      formData.append("title", event.eventTitle);
      formData.append("description", getFirst20Words(event.eventDescription));
      if (event.image) {
        formData.append("file", event.image);
      }

      try {
        console.log("FormData Entries:");
        for (let pair of formData.entries()) {
          console.log(pair[0], pair[1]);
        }
        console.log("Post notification Url ---> ", POSTNOTIFICATION);
        const response = await axios.post(POSTNOTIFICATION, formData, {
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Post Notification response --> ", response);

        if (response.status === 200) {
          fetchAllEvent();
        }
      } catch (error) {
        console.error("Error posting Event:", error);
      }
    } else {
      console.log("Event data not found");
    }
  };

  // Toggle Active/Inactive
  const toggleActiveStatus = async (event) => {
    if (PROD) {
      if (event.toggle === "0") {
        await postNotifiction(event);
      }
    }
    const eventDate = event?.toggle === "0" ? "1" : "0"; // Determine new status

    if (!token) {
      console.error("No authentication token found");
      return;
    }
    const formData = new FormData();
    formData.append("toggle", eventDate);
    try {
      const response = await axios.put(`${PUTAPI}${event.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAllEvent();

      closeEditModal();
    } catch (error) {
      console.error("Error updating Event:", error);
    }
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset to first page on search
  };

  const filteredData = eventList.filter((row) =>
    row.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      fetchAllEvent();
    }
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", marginTop: 1 }}
        >
          Manage Events
        </Typography>

        {/* Events Upload Button */}
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <TextField
            label="Search User"
            sx={{ width: "300px", marginRight: "10px" }}
            InputProps={{
              sx: { height: "50px", fontSize: "16px", padding: "0 5px" },
            }}
            value={searchQuery}
            onChange={handleSearch}
          />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#84764F", marginTop: "5px" }}
            onClick={() => setUploadModalOpen(true)}
            startIcon={<CloudUploadIcon />}
          >
            Add Event
          </Button>
        </Box>
      </Box>

      <hr color="#84764F" style={{ marginTop: "-8px" }} />

      {/* Table View */}
      {eventList.length === 0 ? (
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "#888", marginTop: 20 }}
        >
          No Event Available
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>{event.eventTitle}</TableCell>
                    <TableCell>{event.eventDate}</TableCell>
                    <TableCell>{event.eventStartTime}</TableCell>
                    <TableCell>{event.eventEndTime}</TableCell>
                    <TableCell>
                      {role === "admin" && (
                        <Switch
                          checked={event?.toggle === "1"}
                          onChange={() => toggleActiveStatus(event)}
                          color="primary"
                        />
                      )}
                      <span
                        style={{
                          color: event.toggle === "1" ? "#1686b8" : "red",
                        }}
                      >
                        {event.toggle === "1" ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(event)}>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#84764F" }}
                          startIcon={<Edit />}
                          onClick={() => {
                            handleEdit(event);
                            closeViewModal();
                          }}
                        >
                          Edit
                        </Button>
                      </IconButton>

                      {role === "admin" && (
                        <Button
                          startIcon={<DeleteIcon />}
                          variant="contained"
                          sx={{ backgroundColor: "red" }}
                          onClick={() => {
                            handleDelete(event);
                          }}
                        >
                          DELETE
                        </Button>
                      )}

                      <Button
                        variant="contained"
                        sx={{ marginLeft: 1 }}
                        onClick={() => handleView(event)}
                      >
                        View
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
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {/* Upload Event Modal */}
      {/* <Dialog
        open={uploadModalOpen}
        onClose={closeUploadModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Upload New Event
          </Typography>
          <TextField
            fullWidth
            label="Event Title"
            value={newEvent.eventTitle}
            onChange={(e) =>
              setNewEvent((prev) => ({ ...prev, eventTitle: e.target.value }))
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Event Content"
            value={newEvent.eventDescription}
            onChange={(e) =>
              setNewEvent((prev) => ({
                ...prev,
                eventDescription: e.target.value,
              }))
            }
            multiline
            rows={7}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            type="date"
            value={newEvent.eventDate}
            onChange={(e) => {
              setNewEvent((prev) => ({ ...prev, eventDate: e.target.value }));
            }}
            sx={{ marginBottom: 2 }}
          />


          <Button variant="contained" component="label">
            Upload image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUploadModal} sx={{ color: "#808080" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePostEvent}
            sx={{ backgroundColor: "#84764F" }}
            disabled={
              !newEvent.eventTitle.trim() ||
              !newEvent.eventDescription.trim() ||
              !newEvent.eventDate.trim() ||
              !newEvent.image
            }
          >
            Post
          </Button>
        </DialogActions>
      </Dialog> */}

      {/* Edit Event Modal */}
      {/* <Dialog
        open={editModalOpen}
        onClose={closeEditModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Edit Event
          </Typography>
          <TextField
            fullWidth
            label="Event Headline"
            value={editData.eventTitle}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, eventTitle: e.target.value }))
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Event Content"
            value={editData.eventDescription}
            onChange={(e) =>
              setEditData((prev) => ({
                ...prev,
                eventDescription: e.target.value,
              }))
            }
            multiline
            rows={7}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            type="date"
            value={editData.eventDate}
            onChange={(e) => {
              setEditData((prev) => ({ ...prev, eventDate: e.target.value }));
            }}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" component="label">
            Change image
            <input
              type="file"
              hidden
              accept="image/*,video/*"
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, image: e.target.files[0] }))
              }
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal} sx={{ color: "#808080" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            sx={{ backgroundColor: "#84764F" }}
            disabled={
              !editData.eventTitle.trim() || !editData.eventDescription.trim()
            }
          >
            Save
          </Button>
        </DialogActions>
      </Dialog> */}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* Upload Event Modal */}
        <Dialog
          open={uploadModalOpen}
          onClose={closeUploadModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Upload New Event
            </Typography>
            <TextField
              fullWidth
              label="Event Title"
              value={newEvent.eventTitle}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, eventTitle: e.target.value }))
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Event Content"
              value={newEvent.eventDescription}
              onChange={(e) =>
                setNewEvent((prev) => ({
                  ...prev,
                  eventDescription: e.target.value,
                }))
              }
              multiline
              rows={7}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              value={newEvent.eventDate}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, eventDate: e.target.value }))
              }
              sx={{ marginBottom: 2 }}
            />

            <Box fullWidth>
              {/* Event Start Time Picker */}
              <TextField
                label="Event Start Time"
                value={newEvent.eventStartTime}
                onChange={(e) =>
                  setNewEvent((prev) => ({
                    ...prev,
                    eventStartTime: e.target.value,
                  }))
                }
                sx={{ marginBottom: 2, width: "45%" }}
              />
              {/* <TimePicker
              label="Event Start Time"
              defaultValue={today}
              onChange={(newValue) =>
                setNewEvent((prev) => ({ ...prev, eventStartTime: newValue }))
              }
              sx={{ marginBottom: 2 }}
            /> */}

              {/* Event End Time Picker */}
              <TextField
                // fullWidth
                label="Event End Time"
                value={newEvent.eventEndTime}
                onChange={(e) =>
                  setNewEvent((prev) => ({
                    ...prev,
                    eventEndTime: e.target.value,
                  }))
                }
                sx={{ marginBottom: 2, width: "45%", marginLeft: 5 }}
              />
              {/* <TimePicker
              label="Event End Time"
              defaultValue={today}
              format="DD/MM/YYYY"

              onChange={(newValue) =>
                setNewEvent((prev) => ({ ...prev, eventEndTime: newValue }))
              }
              sx={{ marginBottom: 2 }}
            /> */}
            </Box>

            <TextField
              fullWidth
              label="Uri"
              value={newEvent.uri}
              onChange={(e) =>
                setNewEvent((prev) => ({ ...prev, uri: e.target.value }))
              }
              sx={{ marginBottom: 2 }}
            />

            <Button variant="contained" component="label">
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeUploadModal} sx={{ color: "#808080" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handlePostEvent}
              sx={{ backgroundColor: "#84764F" }}
              disabled={
                !newEvent.eventTitle.trim() ||
                !newEvent.eventDescription.trim() ||
                !newEvent.eventDate.trim() ||
                !newEvent.image
              }
            >
              Post
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Event Modal */}
        <Dialog
          open={editModalOpen}
          onClose={closeEditModal}
          maxWidth="sm"
          fullWidth
        >
          <DialogContent>
            <Typography variant="h6" gutterBottom>
              Edit Event
            </Typography>
            <TextField
              fullWidth
              label="Event Headline"
              value={editData.eventTitle}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, eventTitle: e.target.value }))
              }
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              label="Event Content"
              value={editData.eventDescription}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  eventDescription: e.target.value,
                }))
              }
              multiline
              rows={7}
              sx={{ marginBottom: 2 }}
            />
            <TextField
              fullWidth
              type="date"
              value={editData.eventDate}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, eventDate: e.target.value }))
              }
              sx={{ marginBottom: 2 }}
            />

            {/* Event Start Time Picker */}
            <TextField
              fullWidth
              label="Event Start Time"
              value={editData.eventStartTime}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  eventStartTime: e.target.value,
                }))
              }
              // multiline
              // rows={7}
              sx={{ marginBottom: 2 }}
            />
            {/* <TimePicker
              label="Event Start Time"
              defaultValue={dayjs(editData.eventStartTime)}
              onChange={(newValue) =>
                setEditData((prev) => ({
                  ...prev,
                  eventStartTime: newValue.format("hh:mm A"),
                }))
              }
              sx={{ marginBottom: 2 }}
            /> */}

            {/* Event End Time Picker */}

            <TextField
              fullWidth
              label="Event End Time"
              value={editData.eventEndTime}
              onChange={(e) =>
                setEditData((prev) => ({
                  ...prev,
                  eventEndTime: e.target.value,
                }))
              }
              // multiline
              // rows={7}
              sx={{ marginBottom: 2 }}
            />
            {/* <TimePicker
              label="Event End Time"
              defaultValue={dayjs(editData.eventEndTime)}
              onChange={(newValue) =>
                setEditData((prev) => ({
                  ...prev,
                  eventEndTime: newValue.format("hh:mm A"),
                }))
              }
              sx={{ marginBottom: 2 }}
            /> */}

            <TextField
              fullWidth
              label="Uri"
              value={editData.uri}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, uri: e.target.value }))
              }
              sx={{ marginBottom: 2 }}
            />

            <Button variant="contained" component="label">
              Change Image
              <input
                type="file"
                hidden
                accept="image/*,video/*"
                onChange={(e) =>
                  setEditData((prev) => ({ ...prev, image: e.target.files[0] }))
                }
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeEditModal} sx={{ color: "#808080" }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSaveEdit}
              sx={{ backgroundColor: "#84764F" }}
              disabled={
                !editData.eventTitle.trim() || !editData.eventDescription.trim()
              }
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </LocalizationProvider>

      {/* View Event Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={closeViewModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h4" gutterBottom>
            {selectedEvent?.eventTitle}
          </Typography>
          <img
            src={selectedEvent?.image}
            alt={selectedEvent?.eventTitle}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {selectedEvent?.eventDescription}
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
              handleEdit(selectedEvent);
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Event;
