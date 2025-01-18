import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Fab,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Switch,
} from "@mui/material";

import eventStyle from "../../styles/Event/event";
import AddEvent from "../../components/Events/AddEvent";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Model from "../../components/Model";
import { Link } from "react-router-dom";

const Event = () => {
  const [isConfirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([
    /* {
      id: 1,
      title: "first event",
      description: "campion for bihar",
      date: "15-01-2025",
      image: "",
      active: 0,
    },
    {
      id: 2,
      title: "second event",
      description: "campion for bihar",
      date: "15-01-2025",
      image: "",
      active: 0,
    },
    {
      id: 3,
      title: "third event",
      description: "campion for bihar",
      date: "15-01-2025",
      image: "",
      active: 0,
    },
    {
      id: 4,
      title: "four event",
      description: "campion for bihar",
      date: "15-01-2025",
      image: "",
      active: 0,
    },*/
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
      {/* <AddEvent /> */}
      <Model
        handleConfirm={handleConfirm}
        handleCloseModel={handleCloseModel}
        open={open}
      />
      {tableData.length == 0 ? (
        <AddEvent />
      ) : (
        <Link to={"add-event"}>
          <Fab variant="extended" size="medium" color="primary">
            <AddBoxIcon sx={{ mr: 1 }} />
            Add Event
          </Fab>
        </Link>
      )}
      {tableData.length != 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography>Title</Typography>
                </TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Date </TableCell>
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
                  <TableCell>{data.date}</TableCell>
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

export default Event;
