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
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";

import { Edit } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import { baseURL } from "../../assets/BaseUrl";
import axios from "axios";

const GETAPI = `${baseURL}api/v1/events`;
const POSTAPI = `${baseURL}api/v1/events`;
const PUTAPI = `${baseURL}api/v1/events`;

const Event = () => {
  const [eventList, setEventList] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    eventTitle: "",
    eventDescription: "",
    eventDate: "",
    eventStartTime: null,
    eventEndTime: null,
    image: null,
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    eventTitle: "",
    eventDescription: "",
    eventDate: "",
    eventStartTime: null,
    eventEndTime: null,
    image: null,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;

  //Fetch All Events
  const fetchAllEvent = async () => {
    try {
      const response = await axios.get(GETAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEventList(response.data.data || []); // Extract users from API response
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
      if (newEvent.image) {
        formData.append("image", newEvent.image);
      }

      console.log("form Data", formData);

      try {
        const response = await axios.post(POSTAPI, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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

    const updatedEventList = {
      eventTitle: editData.eventTitle,
      eventDescription: editData.eventDescription,
      eventDate: editData.eventDate,
      eventStartTime: editData.eventStartTime,
      eventEndTime: editData.eventEndTime,
      image: editData.image
        ? URL.createObjectURL(editData.image)
        : selectedEvent.image,
    };

    try {
      const response = await axios.put(
        `${PUTAPI}/${selectedEvent.id}`,
        updatedEventList,
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

  // Handle View
  const handleView = (event) => {
    setSelectedEvent(event);
    setViewModalOpen(true);
  };

  // Toggle Active/Inactive
  const toggleActiveStatus = (event) => {
    const updatedEventList = eventList.map((n) =>
      n === event ? { ...n, isActive: !n.isActive } : n
    );
    setEventList(updatedEventList);
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
      fetchAllEvent();
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
          Manage Events
        </Typography>

        {/* Events Upload Button */}
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#84764F" }}
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
              {eventList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((event, index) => (
                  <TableRow key={index}>
                    <TableCell>{event.eventTitle}</TableCell>
                    <TableCell>{event.eventDate}</TableCell>
                    <TableCell>{event.eventStartTime}</TableCell>
                    <TableCell>{event.eventEndTime}</TableCell>
                    <TableCell>
                      <Switch
                        checked={event.isActive}
                        onChange={() => toggleActiveStatus(event)}
                        color="primary"
                      />
                      {event.isActive ? "Active" : "Inactive"}
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
            count={eventList.length}
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

            {/* Event Start Time Picker */}
            <TimePicker
              label="Event Start Time"
              value={newEvent.eventStartTime}
              onChange={(newValue) =>
                setNewEvent((prev) => ({ ...prev, eventStartTime: newValue }))
              }
              sx={{ marginBottom: 2 }}
            />

            {/* Event End Time Picker */}
            <TimePicker
              label="Event End Time"
              value={newEvent.eventEndTime}
              onChange={(newValue) =>
                setNewEvent((prev) => ({ ...prev, eventEndTime: newValue }))
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
            <TimePicker
              label="Event Start Time"
              value={editData.eventStartTime}
              onChange={(newValue) =>
                setEditData((prev) => ({
                  ...prev,
                  eventStartTime: newValue.format("hh:mm A"),
                }))
              }
              sx={{ marginBottom: 2 }}
            />

            {/* Event End Time Picker */}
            <TimePicker
              label="Event End Time"
              value={editData.eventEndTime}
              onChange={(newValue) =>
                setEditData((prev) => ({
                  ...prev,
                  eventEndTime: newValue.format("hh:mm A"),
                }))
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

// Previous code
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
//   Paper,
//   Fab,
//   Avatar,
//   Switch,
// } from "@mui/material";
// import eventStyle from "../../styles/Event/event";
// import AddEvent from "../../components/Events/AddEvent";
// import EditIcon from "@mui/icons-material/Edit";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import Model from "../../components/Model";
// import { Link } from "react-router-dom";
// import { baseURL } from "../../assets/BaseUrl";
// import axios from "axios";

// const GETAPI = `${baseURL}api/v1/events`;
// const PUTAPI = `${baseURL}api/v1/events`;

// const Event = () => {
//   const [isConfirm, setConfirm] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [tableData, setTableData] = useState([
//     // {
//     //   id: 1,
//     //   title: "first event",
//     //   description: "campion for bihar",
//     //   date: "15-01-2025",
//     //   image: "",
//     //   active: 0,
//     // },
//     // {
//     //   id: 2,
//     //   title: "second event",
//     //   description: "campion for bihar",
//     //   date: "15-01-2025",
//     //   image: "",
//     //   active: 0,
//     // },
//     // {
//     //   id: 3,
//     //   title: "third event",
//     //   description: "campion for bihar",
//     //   date: "15-01-2025",
//     //   image: "",
//     //   active: 0,
//     // },
//     // {
//     //   id: 4,
//     //   title: "four event",
//     //   description: "campion for bihar",
//     //   date: "15-01-2025",
//     //   image: "",
//     //   active: 0,
//     // },
//   ]);

//   const fetchAllEvents = async () => {
//     try {
//       const response = await axios.get(GETAPI);

//       setTableData(response.data.data || []); // Extract users from API response
//     } catch (err) {
//       console.log(err.response?.data?.message);
//     }
//   };

//   useEffect(() => {
//     fetchAllEvents();
//   }, []);

//   const handleActive = async (id, active) => {
//     //call api for active
//     console.log("handleactive api");
//     let response = true;
//     // this is for test
//     if (response) {
//       setTableData((prev) =>
//         prev.map((item) => {
//           return item.id === id ? { ...item, active: !active } : item;
//         })
//       );
//     }
//   };

//   const handleOpenModel = () => {
//     setOpen(true);
//   };
//   const handleCloseModel = () => {
//     setOpen(false);
//   };

//   const handleConfirm = async () => {
//     setConfirm(true);
//     handleCloseModel();
//   };
//   return (
//     <Box sx={eventStyle.mainContianer}>
//       {/* <AddEvent /> */}
//       <Model
//         handleConfirm={handleConfirm}
//         handleCloseModel={handleCloseModel}
//         open={open}
//       />
//       {tableData.length === 0 ? (
//         <AddEvent />
//       ) : (
//         <Link to={"add-event"}>
//           <Fab
//             variant="extended"
//             size="medium"
//             color="primary"
//             sx={{ marginBottom: "10px" }}
//           >
//             <AddBoxIcon sx={{ mr: 1 }} />
//             Add Event
//           </Fab>
//         </Link>
//       )}
//       {tableData.length !== 0 && (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>
//                   <Typography>Title</Typography>
//                 </TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Date </TableCell>
//                 <TableCell>Image</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tableData.map((data) => (
//                 <TableRow key={data.id}>
//                   <TableCell>{data.eventTitle}</TableCell>
//                   <TableCell>{data.eventDescription}</TableCell>
//                   <TableCell>{data.eventDate}</TableCell>
//                   <TableCell>
//                     <Avatar
//                       variant="square"
//                       src={data.image}
//                       sx={{
//                         width: 120,
//                         height: 120,
//                         borderRadius: "0.3rem",
//                       }}
//                       alt="event image"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Switch
//                       color="secondary"
//                       checked={data.active}
//                       onChange={() => handleActive(data.id, data.active)}
//                       onClick={handleOpenModel}
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Fab size="small" variant="extended" component="label">
//                       <EditIcon sx={{ mr: 1 }} />
//                       <Typography onClick={e}> Edit</Typography>
//                     </Fab>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// };

// export default Event;
