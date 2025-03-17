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
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { baseURL } from "../../assets/BaseUrl";
import axios from "axios";

const GETAPI = `${baseURL}api/v1/banner`;
const POSTAPI = `${baseURL}api/v1/banner`;
const PUTAPI = `${baseURL}api/v1/banner`;
const DELETEAPI = `${baseURL}api/v1/banner`;

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newBanner, setNewBanner] = useState({
    title: "",
    content: "",
    file: null,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    content: "",
    file: null,
  });
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // For Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;

  const role = user?.user?.data?.role;

  const fetchAllBanners = async () => {
    try {
      const response = await axios.get(GETAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBanners(response.data.data || []); // Extract users from API response
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  // Handle Modal Close
  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setNewBanner({ title: "", content: "", file: null });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditData({ title: "", content: "", file: null });
    setSelectedBanner(null);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedBanner(null);
  };

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewBanner((prev) => ({ ...prev, file }));
  };

  const handlePostBanner = async () => {
    if (newBanner.title && newBanner.content && newBanner.file) {
      const formData = new FormData();
      formData.append("title", newBanner.title);
      formData.append("content", newBanner.content);
      if (newBanner.file) {
        formData.append("file", newBanner.file);
      }

      try {
        const response = await axios.post(POSTAPI, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          fetchAllBanners();
          closeUploadModal();
        }
      } catch (error) {
        console.error("Error posting Banner:", error);
      }
    }
  };

  // Handle Edit
  const handleEdit = (banner) => {
    setEditData({
      title: banner.title,
      content: banner.content,
      file: null,
    });
    setSelectedBanner(banner);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedBanner || !selectedBanner.id) {
      console.error("No banner selected for editing");
      return;
    }

    if (!token) {
      console.error("No authentication token found");
      return;
    }

    const updatedBanner = {
      title: editData.title,
      content: editData.content,
      image: editData.file
        ? URL.createObjectURL(editData.file)
        : selectedBanner.image,
    };

    try {
      const response = await axios.put(
        `${PUTAPI}/${selectedBanner.id}`,
        updatedBanner,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAllBanners();
      console.log("Banner updated successfully:", response.data);

      closeEditModal();
    } catch (error) {
      console.error("Error updating Banner:", error);
    }
  };

  const handleDelete = async (banner) => {
    if (!banner?.id) {
      console.error("Invalid event object: Missing ID");
      return;
    }

    if (!token) {
      console.error("Authorization token is missing!");
      return;
    }

    // Show confirmation alert
    const isConfirmed = window.confirm(
      `Are you sure you want to delete this banner?`
    );
    if (!isConfirmed) {
      console.log("Delete action canceled.");
      return;
    }

    try {
      await axios.delete(`${DELETEAPI}/${banner.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAllBanners();
    } catch (error) {
      console.error(
        "Error deleting Banner:",
        error.response?.data?.message || error.message || "Unknown error"
      );
      alert("Failed to delete Banner. Please try again.");
    }
  };

  // Handle View
  const handleView = (banner) => {
    setSelectedBanner(banner);
    setViewModalOpen(true);
  };

  const toggleActiveStatus = async (banner) => {
    console.log("banner Data  :  ", banner);

    const newStatus = banner.isActive === "0" ? "1" : "0"; // Determine new status
    const confirmation = window.confirm(
      `Are you sure you want to ${
        newStatus === "1" ? "activate" : "deactivate"
      } this banner?`
    );

    if (!confirmation) {
      console.log("Toggle action cancelled");
      return; // Stop execution if the user clicks Cancel
    }

    const formData = new FormData();
    formData.append("title", banner.title);
    formData.append("content", banner.content);

    // Handle image properly
    if (banner.image && typeof banner.image !== "string") {
      formData.append("image", banner.image); // If it's a File object
    } else if (typeof banner.image === "string") {
      formData.append("imageUrl", banner.image); // If it's a URL, store as a string
    }

    // Toggle status correctly
    formData.append("isActive", newStatus);

    console.log("Form Data:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // Log each key-value pair
    }

    try {
      const response = await axios.put(`${PUTAPI}/${banner.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Correct Content-Type for FormData
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAllBanners();
    } catch (error) {
      console.error("Error updating banner:", error);
      alert("Something went wrong. Please try again.");
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
      fetchAllBanners();
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
            Manage Banner
          </Typography>

          {/* Banner Upload Button */}
          <Box sx={{ textAlign: "center", marginBottom: 3 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#84764F" }}
              onClick={() => setUploadModalOpen(true)}
              startIcon={<CloudUploadIcon />}
            >
              Add Banner
            </Button>
          </Box>
        </Box>
        <hr color="#84764F" style={{ marginTop: "-8px" }} />
      </Box>

      {/* Table View */}
      {banners.length === 0 ? (
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "#888", marginTop: 20 }}
        >
          No Banner Available
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banners
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((banner, index) => (
                  <TableRow key={index}>
                    <TableCell>{banner.title}</TableCell>
                    <TableCell>
                      <img
                        src={banner.image}
                        alt={banner.title}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {role === "admin" && (
                        <Switch
                          checked={banner.isActive === "1"}
                          onChange={() => toggleActiveStatus(banner)}
                          color="primary"
                        />
                      )}

                      {/* {banner.isActive === "1" ? "Active" : "Inactive"} */}
                      <span
                        style={{
                          color: banner.isActive === "1" ? "#1686b8" : "red",
                        }}
                      >
                        {banner.isActive === "1" ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(banner)}>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#84764F" }}
                          startIcon={<Edit />}
                          onClick={() => {
                            handleEdit(banner);
                            closeViewModal();
                          }}
                        >
                          Edit
                        </Button>
                      </IconButton>
                      <Button
                        variant="contained"
                        sx={{ marginLeft: 1 }}
                        onClick={() => handleView(banner)}
                      >
                        View
                      </Button>
                      <Button
                        startIcon={<DeleteIcon />}
                        variant="contained"
                        sx={{ backgroundColor: "red", marginLeft: "15px" }}
                        onClick={() => {
                          handleDelete(banner);
                        }}
                      >
                        DELETE
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
            count={banners.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}

      {/* Upload Blog Modal */}
      <Dialog
        open={uploadModalOpen}
        onClose={closeUploadModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Upload New Banner
          </Typography>
          <TextField
            fullWidth
            label="Banner Title"
            value={newBanner.title}
            onChange={(e) =>
              setNewBanner((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Banner Description"
            value={newBanner.content}
            onChange={(e) =>
              setNewBanner((prev) => ({ ...prev, content: e.target.value }))
            }
            multiline
            rows={7}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" component="label">
            Choose Image
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
            onClick={handlePostBanner}
            sx={{ backgroundColor: "#84764F" }}
            disabled={
              !newBanner.title.trim() ||
              !newBanner.content.trim() ||
              !newBanner.file
            }
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Banner Modal */}
      <Dialog
        open={editModalOpen}
        onClose={closeEditModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Edit Banner
          </Typography>
          <TextField
            fullWidth
            label="Banner Title"
            value={editData.title}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Banner Description"
            value={editData.content}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, content: e.target.value }))
            }
            multiline
            rows={7}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" component="label">
            Change Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, file: e.target.files[0] }))
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
            disabled={!editData.title.trim() || !editData.content.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Banner Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={closeViewModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h4" gutterBottom>
            {selectedBanner?.title}
          </Typography>
          <img
            src={selectedBanner?.image}
            alt={selectedBanner?.title}
            // style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {selectedBanner?.content}
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
              handleEdit(selectedBanner);
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Banner;

//Previous code
// import AddBanner from "../../components/Banner/AddBanner";
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
//   Divider,
// } from "@mui/material";

// import eventStyle from "../../styles/Event/event";
// import EditIcon from "@mui/icons-material/Edit";
// import AddBoxIcon from "@mui/icons-material/AddBox";
// import Model from "../../components/Model";
// import { Link } from "react-router-dom";

// const Banner = () => {
//   const [isConfirm, setConfirm] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [tableData, setTableData] = useState([
//     {
//       id: 1,
//       title: "banner1",
//       description: "campion for bihar",
//       date: "15-01-2025",
//       image: "",
//       active: 0,
//     },
//     {
//       id: 2,
//       title: "banner2",
//       description: "campion for bihar",
//       date: "15-01-2025",
//       image: "",
//       active: 0,
//     },
//     {
//       id: 3,
//       title: "banner3",
//       description: "campion for bihar",
//       date: "15-01-2025",
//       image: "",
//       active: 0,
//     },
//   ]);
//   useEffect(() => {
//     // call api for table data
//     console.log("call api for table data");
//   }, [isConfirm]);
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
//       <Model
//         handleConfirm={handleConfirm}
//         handleCloseModel={handleCloseModel}
//         open={open}
//       />
//       {tableData.length === 0 ? (
//         <AddBanner />
//       ) : (
//         <Link to={"add-banner"}>
//           <Fab
//             variant="extended"
//             size="medium"
//             color="primary"
//             sx={{ marginBottom: "10px" }}
//           >
//             <AddBoxIcon sx={{ mr: 1 }} />
//             Add Banner
//           </Fab>
//         </Link>
//       )}
//       {tableData.length !== 0 && (
//         <TableContainer component={Paper}>
//           <Typography variant="h5" sx={{ p: 3 }}>
//             Banner List
//           </Typography>
//           <Divider textAlign="left" />
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>
//                   <Typography>Title</Typography>
//                 </TableCell>
//                 <TableCell>Description</TableCell>
//                 <TableCell>Image</TableCell>
//                 <TableCell>Status</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {tableData.map((data) => (
//                 <TableRow key={data.id}>
//                   <TableCell>{data.title}</TableCell>
//                   <TableCell>{data.description}</TableCell>
//                   <TableCell>
//                     <Avatar
//                       variant="square"
//                       // src={data.image}
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
//                       <Typography> Edit</Typography>
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

// export default Banner;
