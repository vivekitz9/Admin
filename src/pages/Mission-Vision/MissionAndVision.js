import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { baseURL } from "../../assets/BaseUrl";
import axios from "axios";
import { useSelector } from "react-redux";

const GETAPI = `${baseURL}api/v1/mission`;
const POSTAPI = `${baseURL}api/v1/mission`;
const PUTAPI = `${baseURL}api/v1/mission`;

const MissionAndVision = () => {
  const [missionAndVision, setMissionAndVision] = useState("");
  const [policyId, setPolicyId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;

  // Fetch mission and vision from backend
  useEffect(() => {
    if (!token) return;

    setLoading(true);
    axios
      .get(GETAPI, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response?.data?.data?.[0];

        if (data) {
          setMissionAndVision(data.content || "");
          setPolicyId(data.id || null);
          setIsEditing(false);
        } else {
          setIsEditing(true);
        }
      })
      .catch((error) =>
        console.error("Error fetching mission and vision:", error)
      )
      .finally(() => setLoading(false));
  }, [token]);

  const handleSave = () => {
    if (!token) return alert("Unauthorized! Please log in.");

    setLoading(true);
    const apiCall = policyId
      ? axios.put(
          `${PUTAPI}/${policyId}`,
          { content: missionAndVision },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      : axios.post(
          POSTAPI,
          { content: missionAndVision },
          { headers: { Authorization: `Bearer ${token}` } }
        );

    apiCall
      .then((response) => {
        if (!policyId) setPolicyId(response.data?.data?.id);
        setIsEditing(false);
      })
      .catch((error) =>
        console.error("Error saving mission and vision:", error)
      )
      .finally(() => setLoading(false));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
        Our Mission & Vision
      </Typography>
      <hr color="#84764F" style={{ marginTop: "-8px" }} />

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
          {isEditing ? (
            <>
              <TextField
                label="Enter mission And Vision"
                variant="outlined"
                fullWidth
                multiline
                rows={10}
                value={missionAndVision}
                onChange={(e) => setMissionAndVision(e.target.value)}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                disabled={loading}
              >
                {policyId ? "Update" : "Save"}
              </Button>
            </>
          ) : (
            <>
              <Typography variant="body1">
                {missionAndVision || "No mission and vision set."}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleEdit}
                sx={{ marginTop: 2 }}
              >
                Edit
              </Button>
            </>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default MissionAndVision;
