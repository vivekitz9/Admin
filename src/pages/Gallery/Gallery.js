import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CardMedia,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  List,
  ListItem,
  CircularProgress,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { baseURL } from "../../assets/BaseUrl";
import axios from "axios";

const GETAPI = `${baseURL}api/v1/gallery`;
const POSTAPI = `${baseURL}api/v1/gallery`;
const PUTAPI = `${baseURL}api/v1/gallery`;

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newImage, setNewImage] = useState({ title: "", file: null });

  const [editData, setEditData] = useState({
    title: "",
    file: null,
  });

  const [selectedImage, setSelectedImage] = useState(null); // To hold the image to be edited
  console.log(selectedImage);

  // console.log(images);

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;

  const role = user?.user?.data?.role;

  // Fetch All Image
  const fetchAllImage = async () => {
    try {
      const response = await axios.get(GETAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(response.data.data || []);
    } catch (error) {
      console.log(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Handle Modal Close
  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setNewImage({ title: "", file: null });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedImage(null);
    setEditData({ title: "", file: null });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setEditData((prev) => ({ ...prev, file }));
    setNewImage((prev) => ({ ...prev, file }));
  };

  // Handle Post Image
  const handlePostImage = async () => {
    if (newImage.file && newImage.title) {
      const formData = new FormData();
      formData.append("title", newImage.title);
      if (newImage.file) {
        formData.append("file", newImage.file);
      }
      try {
        const response = await axios.post(POSTAPI, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response?.status === 200) {
          fetchAllImage();
          closeUploadModal();
        }
      } catch (error) {
        console.log("Error Posting Image", error);
      }
    }
  };

  const handleEdit = (image) => {
    setEditData({
      title: image.title,
      file: null,
    });
    setSelectedImage(image);
    setEditModalOpen(true);
  };

  const handleEditImage = async () => {
    if (selectedImage.id && editData.title && editData.file) {
      const formData = new FormData();
      formData.append("title", editData.title);
      if (editData.file) {
        formData.append("file", editData.file);
      }

      try {
        const response = await axios.put(
          `${PUTAPI}/${selectedImage.id}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        fetchAllImage();
        closeEditModal();
      } catch (error) {
        console.log("Error Updating Image: ", error);
      }
    }
  };

  const handleToggle = async (image) => {
    console.log("image Data  :  ", image);

    const newStatus = image.toggle === "0" ? "1" : "0"; // Determine new status
    const confirmation = window.confirm(
      `Are you sure you want to ${
        newStatus === "1" ? "activate" : "deactivate"
      } this Image?`
    );

    if (!confirmation) {
      console.log("Toggle action cancelled");
      return; // Stop execution if the user clicks Cancel
    }

    const formData = new FormData();
    formData.append("title", image.title);

    // Handle image properly
    if (image.image && typeof image.image !== "string") {
      formData.append("image", image.image); // If it's a File object
    } else if (typeof image.image === "string") {
      formData.append("imageUrl", image.image); // If it's a URL, store as a string
    }

    // Toggle status correctly
    formData.append("toggle", image.toggle === "0" ? "1" : "0");

    console.log("Form Data:");
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // Log each key-value pair
    }

    try {
      const response = await axios.put(`${PUTAPI}/${image.id}`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      fetchAllImage();
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllImage();
    }
  }, []);

  console.log('newImage---->', newImage);

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          Manage Gallery
        </Typography>

        {/* Image Upload Button */}
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#84764F" }}
            onClick={() => setUploadModalOpen(true)}
            startIcon={<CloudUploadIcon />}
          >
            Add Image
          </Button>
        </Box>
      </Box>

      <hr color="#84764F" style={{ marginTop: "-8px" }} />

      {/* Show message if no images uploaded */}
      {images.length === 0 ? (
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "#888", marginTop: 20 }}
        >
          No Image Available
        </Typography>
      ) : (
        <List>
          {images.map((image) => (
            <ListItem key={image.image} sx={{ borderBottom: "1px solid #ddd" }}>
              <CardMedia
                component="img"
                image={image.image}
                alt={image.title}
                sx={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: 2,
                }}
              />

              <ListItemText
                primary={image.title}
                secondary={
                  <>
                    Status:{" "}
                    <Typography
                      component="span"
                      sx={{ color: image.toggle === "1" ? "#1686b8" : "red" }}
                    >
                      {image.toggle === "1" ? "Active" : "Inactive"}
                    </Typography>
                  </>
                }
              />

              <ListItemSecondaryAction>
                {role === "admin" && (
                  <Switch
                    checked={image.toggle === "1"}
                    onChange={() => handleToggle(image)}
                    color="primary"
                  />
                )}

                <Button
                  onClick={() => {
                    handleEdit(image);
                  }}
                  startIcon={<EditIcon />}
                  sx={{ marginLeft: 2 }}
                >
                  Edit
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}

      {/* Upload Image Modal */}
      <Dialog
        open={uploadModalOpen}
        onClose={closeUploadModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Upload New Image
          </Typography>
          <TextField
            fullWidth
            label="Image Title"
            value={newImage.title}
            onChange={(e) =>
              setNewImage((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" component="label">
            Choose File
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUploadModal} sx={{ color: "#808080" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePostImage}
            sx={{ backgroundColor: "#84764F" }}
            disabled={!newImage.title.trim() || !newImage.file}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Image Modal */}
      <Dialog
        open={editModalOpen}
        onClose={closeEditModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Edit Image
          </Typography>
          <TextField
            fullWidth
            label="Image Title"
            value={editData.title}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" component="label">
            Choose New File
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImageChange}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditModal} sx={{ color: "#808080" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleEditImage}
            sx={{ backgroundColor: "#84764F" }}
            disabled={!editData.title.trim() || !editData.file}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Gallery;
