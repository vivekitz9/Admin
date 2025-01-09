import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Card,
  CardMedia,
  IconButton,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Delete, Close } from "@mui/icons-material";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImages([imageURL, ...images]);
    }
  };

  // Handle Image Delete
  const handleDelete = (imageURL) => {
    const updatedImages = images.filter((img) => img !== imageURL);
    setImages(updatedImages);
    if (selectedImage === imageURL) {
      setIsModalOpen(false);
    }
  };

  // Handle Modal Open
  const openModal = (imageURL) => {
    setSelectedImage(imageURL);
    setIsModalOpen(true);
  };

  // Handle Modal Close
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: 4 }}
      >
        Manage Our Gallery
      </Typography>

      {/* Image Upload */}

      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Button
          variant="contained"
          component="label"
          sx={{ backgroundColor: "#800000" }}
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageUpload}
          />
        </Button>
      </Box>

      <hr color="#800000" style={{ margin: "40px 0" }} />

      {/* Gallery Display */}
      <Grid container spacing={3}>
        {images.map((imageURL, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card onClick={() => openModal(imageURL)}>
              <CardMedia
                component="img"
                image={imageURL}
                alt="Gallery Image"
                sx={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: 2,
                  cursor: "pointer",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal for Full Image */}
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            width: "600px", // Fixed modal width
            height: "600px", // Fixed modal height
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            padding: 0,
          }}
        >
          {selectedImage && (
            <Box
              component="img"
              src={selectedImage}
              alt="Full View"
              sx={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain", // Adjust the image while maintaining aspect ratio
              }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(selectedImage)}
            sx={{ backgroundColor: "#800000" }}
          >
            <Delete sx={{ marginRight: 1 }} /> Delete
          </Button>
          <Button
            variant="contained"
            onClick={closeModal}
            sx={{ backgroundColor: "#808080" }}
          >
            <Close sx={{ marginRight: 1 }} /> Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Gallery;
