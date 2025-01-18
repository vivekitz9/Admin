import AddBanner from "../../components/Banner/AddBanner";
import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Fab,
  Avatar,
  Switch,
  Divider,
} from "@mui/material";

import eventStyle from "../../styles/Event/event";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Model from "../../components/Model";
import { Link } from "react-router-dom";

const Banner = () => {
  const [isConfirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([
    {
      id: 1,
      title: "banner1",
      description: "campion for bihar",
      date: "15-01-2025",
      image: "",
      active: 0,
    },
    {
      id: 2,
      title: "banner2",
      description: "campion for bihar",
      date: "15-01-2025",
      image: "",
      active: 0,
    },
    {
      id: 3,
      title: "banner3",
      description: "campion for bihar",
      date: "15-01-2025",
      image: "",
      active: 0,
    },
  ]);
  useEffect(() => {
    // call api for table data
    console.log("call api for table data");
  }, [isConfirm]);
  const handleActive = async (id, active) => {
    //call api for active
    console.log("handleactive api");
    let response = true;
    // this is for test
    if (response) {
      setTableData((prev) =>
        prev.map((item) => {
          return item.id === id ? { ...item, active: !active } : item;
        })
      );
    }
  };

  const handleOpenModel = () => {
    setOpen(true);
  };
  const handleCloseModel = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    setConfirm(true);
    handleCloseModel();
  };
  return (
    <Box sx={eventStyle.mainContianer}>
      <Model
        handleConfirm={handleConfirm}
        handleCloseModel={handleCloseModel}
        open={open}
      />
      {tableData.length === 0 ? (
        <AddBanner />
      ) : (
        <Link to={"add-banner"}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            sx={{ marginBottom: "10px" }}
          >
            <AddBoxIcon sx={{ mr: 1 }} />
            Add Banner
          </Fab>
        </Link>
      )}
      {tableData.length !== 0 && (
        <TableContainer component={Paper}>
          <Typography variant="h5" sx={{ p: 3 }}>
            Banner List
          </Typography>
          <Divider textAlign="left" />
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Title</Typography>
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((data) => (
                <TableRow key={data.id}>
                  <TableCell>{data.title}</TableCell>
                  <TableCell>{data.description}</TableCell>
                  <TableCell>
                    <Avatar
                      variant="square"
                      // src={data.image}
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: "0.3rem",
                      }}
                      alt="event image"
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      color="secondary"
                      checked={data.active}
                      onChange={() => handleActive(data.id, data.active)}
                      onClick={handleOpenModel}
                    />
                  </TableCell>
                  <TableCell>
                    <Fab size="small" variant="extended" component="label">
                      <EditIcon sx={{ mr: 1 }} />
                      <Typography> Edit</Typography>
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default Banner;
