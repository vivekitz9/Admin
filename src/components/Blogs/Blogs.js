import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  };

  const handleSubmit = () => {
    if (!image || !title.trim() || !description.trim()) {
      alert("Please provide a title, image, and description for the blog.");
      return;
    }

    if (editIndex !== null) {
      const updatedBlogs = blogs.map((blog, index) =>
        index === editIndex ? { image, title, description } : blog
      );
      setBlogs(updatedBlogs);
      setEditIndex(null);
    } else {
      setBlogs([...blogs, { image, title, description }]);
    }

    setImage(null);
    setTitle("");
    setDescription("");
  };

  const handleEdit = (index) => {
    setImage(blogs[index].image);
    setTitle(blogs[index].title);
    setDescription(blogs[index].description);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedBlogs = blogs.filter((_, i) => i !== index);
    setBlogs(updatedBlogs);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", marginBottom: 4 }}
      >
        Manage Our Blogs
      </Typography>

      {/* Blog Form */}
      <Box
        sx={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#f9f9f9",
        }}
      >
        {/* Blog Title */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Blog Title
          </Typography>
          <TextField
            label="Enter the blog title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Box>

        {/* Blog Description */}
        <Box sx={{ marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Blog Description
          </Typography>
          <TextField
            label="Write the blog description"
            multiline
            rows={4}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>

        {/* Image Upload */}
        <Box sx={{ marginBottom: 3, textAlign: "center" }}>
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
          {image && (
            <Box
              component="img"
              src={image}
              alt="Uploaded"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 3,
                marginTop: 2,
              }}
            />
          )}
        </Box>

        {/* Submit Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleSubmit}
          sx={{ backgroundColor: "#800000" }}
        >
          {editIndex !== null ? "Update Blog" : "Submit Blog"}
        </Button>
      </Box>

      <hr color="#800000" style={{ margin: "40px 0" }} />

      {/* Blog List */}
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          All Blogs
        </Typography>
        <Grid container spacing={3}>
          {blogs.map((blog, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={blog.image}
                  alt="Blog"
                  sx={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    boxShadow: 2,
                  }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {blog.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {blog.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton color="primary" onClick={() => handleEdit(index)}>
                    <Edit sx={{ color: "#800000" }} />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(index)}>
                    <Delete sx={{ color: "#800000" }} />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Blogs;
