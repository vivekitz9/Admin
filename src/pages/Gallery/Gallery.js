import React, { useState } from "react";
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
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newImage, setNewImage] = useState({ title: "", file: null });
  const [selectedImage, setSelectedImage] = useState(null); // To hold the image to be edited

  // Handle Modal Close
  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setNewImage({ title: "", file: null });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedImage(null);
    setNewImage({ title: "", file: null });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage((prev) => ({ ...prev, file }));
  };

  // Handle Post Image
  const handlePostImage = () => {
    if (newImage.file && newImage.title) {
      const imageURL = URL.createObjectURL(newImage.file);
      setImages([
        { url: imageURL, active: 0, label: newImage.title },
        ...images,
      ]);
      closeUploadModal();
    }
  };

  // Handle Edit Image
  const handleEditImage = () => {
    if (newImage.file && newImage.title) {
      const updatedImages = images.map((img) =>
        img.url === selectedImage.url
          ? {
              ...img,
              label: newImage.title,
              url: URL.createObjectURL(newImage.file),
            }
          : img
      );
      setImages(updatedImages);
      closeEditModal();
    }
  };

  // Toggle Active/Inactive using Switch
  const handleToggle = (imageURL) => {
    if (imageURL.active === 0) {
      alert("Are you sure to Active selected Image");
    } else {
      alert("Are you sure to Inctive selected Image");
    }
    const updatedImages = images.map((img) =>
      img.url === imageURL ? { ...img, active: img.active === 0 ? 1 : 0 } : img
    );
    setImages(updatedImages);
  };

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
            sx={{ backgroundColor: "#800000" }}
            onClick={() => setUploadModalOpen(true)}
            startIcon={<CloudUploadIcon />}
          >
            Add Image
          </Button>
        </Box>
      </Box>

      <hr color="#800000" style={{ marginTop: "-8px" }} />

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
            <ListItem key={image.url} sx={{ borderBottom: "1px solid #ddd" }}>
              <CardMedia
                component="img"
                image={image.url}
                alt={image.label}
                sx={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: 2,
                }}
              />

              <ListItemText
                primary={image.label}
                secondary={`Status: ${
                  image.active === 1 ? "Active" : "Inactive"
                }`}
              />

              <ListItemSecondaryAction>
                <Switch
                  checked={image.active === 1}
                  onChange={() => handleToggle(image.url)}
                  color="primary"
                />
                <Button
                  onClick={() => {
                    setSelectedImage(image);
                    setNewImage({ title: image.label, file: null });
                    setEditModalOpen(true);
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
            sx={{ backgroundColor: "#800000" }}
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
            value={newImage.title}
            onChange={(e) =>
              setNewImage((prev) => ({ ...prev, title: e.target.value }))
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
            sx={{ backgroundColor: "#800000" }}
            disabled={!newImage.title.trim() || !newImage.file}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Gallery;
