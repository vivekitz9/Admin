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

const MissionAndVision = () => {
  const [missionAndVision, setMissionAndVision] = useState([]);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [newMissionVision, setNewMissionVision] = useState({
    title: "",
    description: "",
  });
  const [selectedItem, setSelectedItem] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setNewMissionVision({ title: "", description: "" });
  };

  const handlePost = () => {
    setMissionAndVision([newMissionVision, ...missionAndVision]);
    closeUploadModal();
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setNewMissionVision(item);
    setEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    const updatedList = missionAndVision.map((item) =>
      item === selectedItem ? newMissionVision : item
    );
    setMissionAndVision(updatedList);
    setEditModalOpen(false);
  };

  const handleView = (item) => {
    setSelectedItem(item);
    setViewModalOpen(true);
  };

  const toggleActiveStatus = (item) => {
    if (item.isActive) {
      alert("Are you sure to Inactive selected Mission & Vision");
    } else {
      alert("Are you sure to Active selected Mission & Vision");
    }
    const updatedList = missionAndVision.map((mv) =>
      mv === item ? { ...mv, isActive: !mv.isActive } : mv
    );
    setMissionAndVision(updatedList);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ textAlign: "center", marginBottom: 2 }}
        >
          Manage Mission & Vision
        </Typography>

        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#84764F" }}
            onClick={() => setUploadModalOpen(true)}
            startIcon={<CloudUploadIcon />}
          >
            Add
          </Button>
        </Box>
      </Box>

      <hr color="#84764F" style={{ marginTop: "-8px" }} />

      {missionAndVision.length === 0 ? (
        <Typography
          variant="h5"
          sx={{ textAlign: "center", color: "#888", marginTop: 20 }}
        >
          No Mission & Vision Available
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {missionAndVision.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <Switch
                      checked={item.isActive || false}
                      onChange={() => toggleActiveStatus(item)}
                    />
                    {item.isActive ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "so" }}>
                      <IconButton onClick={() => handleEdit(item)}>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#84764F" }}
                          startIcon={<Edit />}
                        >
                          Edit
                        </Button>
                      </IconButton>
                      <Button
                        variant="contained"
                        sx={{ marginLeft: 1 }}
                        onClick={() => handleView(item)}
                      >
                        View
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Add Modal */}
      <Dialog
        open={uploadModalOpen}
        onClose={closeUploadModal}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Add Mission & Vision
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={newMissionVision.title}
            onChange={(e) =>
              setNewMissionVision({
                ...newMissionVision,
                title: e.target.value,
              })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={newMissionVision.description}
            onChange={(e) =>
              setNewMissionVision({
                ...newMissionVision,
                description: e.target.value,
              })
            }
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeUploadModal} sx={{ color: "#84764F" }}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handlePost}
            sx={{ backgroundColor: "#84764F" }}
            disabled={
              !newMissionVision.title.trim() ||
              !newMissionVision.description.trim()
            }
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Modal */}
      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Edit Mission & Vision
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={newMissionVision.title}
            onChange={(e) =>
              setNewMissionVision({
                ...newMissionVision,
                title: e.target.value,
              })
            }
            sx={{ marginBottom: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={newMissionVision.description}
            onChange={(e) =>
              setNewMissionVision({
                ...newMissionVision,
                description: e.target.value,
              })
            }
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setEditModalOpen(false)}
            sx={{ color: "#808080" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveEdit}
            sx={{ backgroundColor: "#84764F" }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* View Modal */}
      <Dialog
        open={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            Mission & Vision Details
          </Typography>
          {selectedItem && (
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Title:
              </Typography>
              <Typography>{selectedItem.title}</Typography>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", marginTop: 2 }}
              >
                Description:
              </Typography>
              <Typography>{selectedItem.description}</Typography>

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", marginTop: 2 }}
              >
                Status:
              </Typography>
              <Typography>
                {selectedItem.isActive ? "Active" : "Inactive"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setViewModalOpen(false)}
            sx={{ color: "#808080" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MissionAndVision;
