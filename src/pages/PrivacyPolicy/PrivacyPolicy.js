import React, { useState, useEffect, useRef, useMemo } from "react";
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
import JoditEditor from 'jodit-react';

const GETAPI = `${baseURL}api/v1/privacyPolicy`;
const POSTAPI = `${baseURL}api/v1/privacyPolicy`;
const PUTAPI = `${baseURL}api/v1/privacyPolicy`;

const PrivacyPolicy = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [policyId, setPolicyId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const editor = useRef(null);
  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;
  const role = user?.user?.data?.role;

  console.log(role);

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
          setPrivacyPolicy(data.content || "");
          setPolicyId(data.id || null);
          setIsEditing(false);
        } else {
          setIsEditing(true);
        }
      })
      .catch((error) => console.error("Error fetching privacy policy:", error))
      .finally(() => setLoading(false));
  }, [token]);

  const handleSave = () => {
    if (!token) return alert("Unauthorized! Please log in.");

    setLoading(true);
    const apiCall = policyId
      ? axios.put(
        `${PUTAPI}/${policyId}`,
        { content: privacyPolicy },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      : axios.post(
        POSTAPI,
        { content: privacyPolicy },
        { headers: { Authorization: `Bearer ${token}` } }
      );

    apiCall
      .then((response) => {
        if (!policyId) setPolicyId(response.data?.data?.id);
        setIsEditing(false);
      })
      .catch((error) => console.error("Error saving privacy policy:", error))
      .finally(() => setLoading(false));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const config = useMemo(() => ({
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: 'Start typings...'
  }), []);


  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ marginBottom: 2 }}>
        Our Privacy Policy
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
              {/* <TextField
                label="Enter Privacy Policy"
                variant="outlined"
                fullWidth
                multiline
                rows={10}
                value={privacyPolicy}
                onChange={(e) => setPrivacyPolicy(e.target.value)}
                sx={{ marginBottom: 2 }}
              /> */}

              <JoditEditor
                ref={editor}
                value={privacyPolicy}
                config={config}
                tabIndex={5} // tabIndex of textarea
                onBlur={newContent => setPrivacyPolicy(newContent)}
                onChange={newContent => { }}
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
                {privacyPolicy ? <div dangerouslySetInnerHTML={{ __html: privacyPolicy }}></div>
                  : "No privacy policy set."
                }
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

export default PrivacyPolicy;
