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

const GETAPI = `${baseURL}api/v1/termCondition`;
const POSTAPI = `${baseURL}api/v1/termCondition`;
const PUTAPI = `${baseURL}api/v1/termCondition`;

const TermsConditions = () => {
  const [termCondition, setTermCondition] = useState("");
  const [policyId, setPolicyId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;

  // Fetch privacy policy from backend
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
          setTermCondition(data.content || "");
          setPolicyId(data.id || null);
          setIsEditing(false);
        } else {
          setIsEditing(true);
        }
      })
      .catch((error) =>
        console.error("Error fetching terms and conditions:", error)
      )
      .finally(() => setLoading(false));
  }, [token]);

  const handleSave = () => {
    if (!token) return alert("Unauthorized! Please log in.");

    setLoading(true);
    const apiCall = policyId
      ? axios.put(
          `${PUTAPI}/${policyId}`,
          { content: termCondition },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      : axios.post(
          POSTAPI,
          { content: termCondition },
          { headers: { Authorization: `Bearer ${token}` } }
        );

    apiCall
      .then((response) => {
        if (!policyId) setPolicyId(response.data?.data?.id);
        setIsEditing(false);
      })
      .catch((error) =>
        console.error("Error saving terms and conditions:", error)
      )
      .finally(() => setLoading(false));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
        Terms & Conditions
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
                label="Enter Terms & Conditions"
                variant="outlined"
                fullWidth
                multiline
                rows={10}
                value={termCondition}
                onChange={(e) => setTermCondition(e.target.value)}
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
                {termCondition || "No Terms & Conditions set."}
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

export default TermsConditions;
