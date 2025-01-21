import React, { useState } from "react";
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
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newNews, setNewNews] = useState({
    title: "",
    description: "",
    date: "",
    file: null,
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    date: "",
    file: null,
  });
  const [selectedNews, setSelectedNews] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  // Handle Modal Close
  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setNewNews({ title: "", description: "", date: "", file: null });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditData({ title: "", description: "", date: "", file: null });
    setSelectedNews(null);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedNews(null);
  };

  // Handle File Change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewNews((prev) => ({ ...prev, file }));
  };

  // Handle Post News
  const handlePostNews = () => {
    if (newNews.title && newNews.description && newNews.file && newNews.date) {
      const imageURL = URL.createObjectURL(newNews.file);
      setNewsList([
        {
          title: newNews.title,
          description: newNews.description,
          date: newNews.date,
          image: imageURL,
          isActive: false,
        },
        ...newsList,
      ]);
      closeUploadModal();
    }
  };

  // Handle Edit
  const handleEdit = (news) => {
    setEditData({
      title: news.title,
      description: news.description,
      date: news.date,
      file: null,
    });
    setSelectedNews(news);
    setEditModalOpen(true);
  };

  // Handle Save Edit
  const handleSaveEdit = () => {
    const updatedNewsList = newsList.map((news) =>
      news === selectedNews
        ? {
            ...news,
            title: editData.title,
            description: editData.description,
            date: editData.date,
            image: editData.file
              ? URL.createObjectURL(editData.file)
              : news.image,
          }
        : news
    );
    setNewsList(updatedNewsList);
    closeEditModal();
  };

  // Handle View
  const handleView = (news) => {
    setSelectedNews(news);
    setViewModalOpen(true);
  };

  // Toggle Active/Inactive
  const toggleActiveStatus = (news) => {
    const updatedNewsList = newsList.map((n) =>
      n === news ? { ...n, isActive: !n.isActive } : n
    );
    setNewsList(updatedNewsList);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          Manage News
        </Typography>

        {/* News Upload Button */}
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#800000" }}
            onClick={() => setUploadModalOpen(true)}
            startIcon={<CloudUploadIcon />}
          >
            Add News
          </Button>
        </Box>
      </Box>

      <hr color="#800000" style={{ marginTop: "-8px" }} />

      {/* Table View */}
      {newsList.length === 0 ? (
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "#888", marginTop: 20 }}
        >
          No News Available
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newsList.map((news, index) => (
                <TableRow key={index}>
                  <TableCell>{news.title}</TableCell>
                  <TableCell>{news.date}</TableCell>
                  <TableCell>
                    <Switch
                      checked={news.isActive}
                      onChange={() => toggleActiveStatus(news)}
                      color="primary"
                    />
                    {news.isActive ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(news)}>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#800000" }}
                        startIcon={<Edit />}
                        onClick={() => {
                          handleEdit(news);
                          closeViewModal();
                        }}
                      >
                        Edit
                      </Button>
                    </IconButton>
                    <Button
                      variant="contained"
                      sx={{ marginLeft: 1 }}
                      onClick={() => handleView(news)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Upload News Modal */}
      <Dialog
        open={uploadModalOpen}
        onClose={closeUploadModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Upload New News
          </Typography>
          <TextField
            fullWidth
            label="News Headline"
            value={newNews.title}
            onChange={(e) =>
              setNewNews((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="News Content"
            value={newNews.description}
            onChange={(e) =>
              setNewNews((prev) => ({ ...prev, description: e.target.value }))
            }
            multiline
            rows={7}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            type="date"
            value={newNews.date}
            onChange={(e) => {
              setNewNews((prev) => ({ ...prev, date: e.target.value }));
            }}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" component="label">
            Image And Video
            <input
              type="file"
              hidden
              accept="image/*,video/*"
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
            onClick={handlePostNews}
            sx={{ backgroundColor: "#800000" }}
            disabled={
              !newNews.title.trim() ||
              !newNews.description.trim() ||
              !newNews.date.trim() ||
              !newNews.file
            }
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit News Modal */}
      <Dialog
        open={editModalOpen}
        onClose={closeEditModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Edit News
          </Typography>
          <TextField
            fullWidth
            label="News Headline"
            value={editData.title}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, title: e.target.value }))
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="News Content"
            value={editData.description}
            onChange={(e) =>
              setEditData((prev) => ({ ...prev, description: e.target.value }))
            }
            multiline
            rows={7}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            type="date"
            value={editData.date}
            onChange={(e) => {
              setEditData((prev) => ({ ...prev, date: e.target.value }));
            }}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" component="label">
            Change Image And Video
            <input
              type="file"
              hidden
              accept="image/*,video/*"
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
            disabled={!editData.title.trim() || !editData.description.trim()}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View News Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={closeViewModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h4" gutterBottom>
            {selectedNews?.title}
          </Typography>
          <img
            src={selectedNews?.image}
            alt={selectedNews?.title}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {selectedNews?.description}
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
              handleEdit(selectedNews);
            }}
          >
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default News;
