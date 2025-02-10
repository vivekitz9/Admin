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
import { Edit, Token } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useSelector } from "react-redux";
import axios from "axios";

const GETAPI = "http://shivdeeplande.com:8001/api/v1/blogs";
const POSTAPI = "http://shivdeeplande.com:8001/api/v1/blogs";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
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
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // For Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;

  const fetchAllBlogs = async () => {
    try {
      const response = await axios.get(GETAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBlogs(response.data.data || []); // Extract users from API response
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  // Handle Modal Close
  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setNewBlog({ title: "", content: "", file: null });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditData({ title: "", content: "", file: null });
    setSelectedBlog(null);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedBlog(null);
  };

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewBlog((prev) => ({ ...prev, file }));
  };

  // Handle Post Blog
  // const handlePostBlog = () => {
  //   if (newBlog.title && newBlog.content && newBlog.file) {
  //     const imageURL = URL.createObjectURL(newBlog.file);
  //     setBlogs([
  //       {
  //         title: newBlog.title,
  //         content: newBlog.content,
  //         image: imageURL,
  //         isActive: false,
  //       },
  //       ...blogs,
  //     ]);
  //     closeUploadModal();
  //   }

  // };

  const handlePostBlog = async () => {
    console.log("New Blog Data  :  ", newBlog);
    if (newBlog.title && newBlog.content && newBlog.file) {
      const formData = new FormData();
      formData.append("title", newBlog.title);
      formData.append("content", newBlog.content);
      if (newBlog.file) {
        formData.append("file", newBlog.file);
      }

      console.log("Form Data   :  ", formData);

      try {
        const response = await axios.post(POSTAPI, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Response  :  ", response);

        if (response.status === 200) {
          // setBlogs([
          //   {
          //     title: response.data.title,
          //     content: response.data.content,
          //     image: response.data.imageURL, // Assuming API returns the image URL
          //     isActive: false,
          //   },
          //   ...blogs,
          // ]);
          fetchAllBlogs();
          closeUploadModal();
        }
      } catch (error) {
        console.error("Error posting blog:", error);
      }
    }
  };

  // Handle Edit
  const handleEdit = (blog) => {
    console.log(blog);
    setEditData({
      title: blog.title,
      content: blog.content,
      file: null,
    });
    setSelectedBlog(blog);
    setEditModalOpen(true);
  };

  // Handle Save Edit
  const handleSaveEdit = () => {
    const updatedBlogs = blogs.map((blog) =>
      blog === selectedBlog
        ? {
            ...blog,
            title: editData.title,
            content: editData.content,
            image: editData.file
              ? URL.createObjectURL(editData.file)
              : blog.image,
          }
        : blog
    );
    setBlogs(updatedBlogs);
    closeEditModal();
  };

  // Handle View
  const handleView = (blog) => {
    setSelectedBlog(blog);
    setViewModalOpen(true);
  };

  // Toggle Active/Inactive
  const toggleActiveStatus = (blog) => {
    if (Blogs.isActive) {
      alert("Are you sure to Inactive selected blog");
    } else {
      alert("Are you sure to Active selected blog");
    }
    const updatedBlogs = blogs.map((b) =>
      b === blog ? { ...b, isActive: !b.isActive } : b
    );
    setBlogs(updatedBlogs);
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
      fetchAllBlogs();
    }
  }, [Blogs]);

  return (
    <Box sx={{ padding: 2 }}>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", marginBottom: 2 }}
          >
            Manage Blogs
          </Typography>

          {/* Blog Upload Button */}
          <Box sx={{ textAlign: "center", marginBottom: 3 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#800000" }}
              onClick={() => setUploadModalOpen(true)}
              startIcon={<CloudUploadIcon />}
            >
              Add Blog
            </Button>
          </Box>
        </Box>
        <hr color="#800000" style={{ marginTop: "-8px" }} />
      </Box>

      {/* Table View */}
      {blogs.length === 0 ? (
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "#888", marginTop: 20 }}
        >
          No Blogs Available
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
              {blogs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((blog, index) => (
                  <TableRow key={index}>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>
                      <img
                        src={blog.image}
                        alt={blog.title}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={blog.isActive}
                        onChange={() => toggleActiveStatus(blog)}
                        color="primary"
                      />
                      {blog.isActive ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(blog)}>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#800000" }}
                          startIcon={<Edit />}
                          onClick={() => {
                            handleEdit(blog);
                            closeViewModal();
                          }}
                        >
                          Edit
                        </Button>
                      </IconButton>
                      <Button
                        variant="contained"
                        sx={{ marginLeft: 1 }}
                        onClick={() => handleView(blog)}
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
            count={blogs.length}
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
            Upload New Blog
          </Typography>
          <TextField
            fullWidth
            label="Blog Title"
            value={newBlog.title}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Blog Description"
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog((prev) => ({ ...prev, content: e.target.value }))
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
            onClick={handlePostBlog}
            sx={{ backgroundColor: "#800000" }}
            disabled={
              !newBlog.title.trim() || !newBlog.content.trim() || !newBlog.file
            }
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Blog Modal */}
      <Dialog
        open={editModalOpen}
        onClose={closeEditModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Edit Blog
          </Typography>
          <TextField
            fullWidth
            label="Blog Title"
            value={editData.title}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Blog Description"
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
            sx={{ backgroundColor: "#800000" }}
            disabled={!editData.title.trim() || !editData.content.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Blog Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={closeViewModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h4" gutterBottom>
            {selectedBlog?.title}
          </Typography>
          <img
            src={selectedBlog?.image}
            alt={selectedBlog?.title}
            // style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {selectedBlog?.content}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeViewModal} sx={{ color: "#808080" }}>
            Close
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#800000" }}
            startIcon={<Edit />}
            onClick={() => {
              closeViewModal();
              handleEdit(selectedBlog);
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Blogs;
