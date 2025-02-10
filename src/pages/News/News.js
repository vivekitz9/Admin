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
import axios from "axios";

const GETAPI = "http://shivdeeplande.com:8001/api/v1/news";
const POSTAPI = "http://shivdeeplande.com:8001/api/v1/news";
// const PUTAPI = "http://shivdeeplande.com:8001";
// const DELETEAPI = "http://shivdeeplande.com:8001";

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newNews, setNewNews] = useState({
    title: "",
    description: "",
    newsDate: "",
    file: null,
  });

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    newsDate: "",
    file: null,
  });
  const [selectedNews, setSelectedNews] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;

  //Fetch All News
  const fetchAllNews = async () => {
    try {
      const response = await axios.get(GETAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setNewsList(response.data.data || []); // Extract users from API response
    } catch (err) {
      console.log(err.response?.data?.message);
    }
  };

  // Handle Modal Close
  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setNewNews({ title: "", description: "", newsDate: "", file: null });
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setEditData({ title: "", description: "", newsDate: "", file: null });
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
  // const handlePostNews = () => {
  //   if (
  //     newNews.title &&
  //     newNews.description &&
  //     newNews.file &&
  //     newNews.newsDate
  //   ) {
  //     const imageURL = URL.createObjectURL(newNews.file);
  //     setNewsList([
  //       {
  //         title: newNews.title,
  //         description: newNews.description,
  //         newsDate: newNews.newsDate,
  //         image: imageURL,
  //         isActive: false,
  //       },
  //       ...newsList,
  //     ]);
  //     closeUploadModal();
  //   }
  // };

  const handlePostNews = async () => {
    if (
      newNews.title &&
      newNews.description &&
      newNews.file &&
      newNews.newsDate
    ) {
      const formData = new FormData();
      formData.append("title", newNews.title);
      formData.append("description", newNews.description);
      formData.append("newsDate", newNews.newsDate);
      if (newNews.file) {
        formData.append("file", newNews.file);
      }

      try {
        const response = await axios.post(POSTAPI, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 200) {
          fetchAllNews();
          closeUploadModal();
        }
      } catch (error) {
        console.error("Error posting News:", error);
      }
    }
  };

  // Handle Edit
  const handleEdit = (news) => {
    setEditData({
      title: news.title,
      description: news.description,
      newsDate: news.newsDate,
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
            newsDate: editData.newsDate,
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
      fetchAllNews();
    }
  }, [newsList]);

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
              {newsList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((news, index) => (
                  <TableRow key={index}>
                    <TableCell>{news.title}</TableCell>
                    <TableCell>{news.newsDate}</TableCell>
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
          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={newsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
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
            value={newNews.newsDate}
            onChange={(e) => {
              setNewNews((prev) => ({ ...prev, newsDate: e.target.value }));
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
              !newNews.newsDate.trim() ||
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
            value={editData.newsDate}
            onChange={(e) => {
              setEditData((prev) => ({ ...prev, newsDate: e.target.value }));
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
