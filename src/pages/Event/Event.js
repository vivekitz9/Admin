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

// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
//   Paper,
// } from "@mui/material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// const App = () => {
//   const [formData, setFormData] = useState({
//     image: "",
//     date: null,
//     title: "",
//     description: "",
//   });

//   const [tableData, setTableData] = useState([]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setFormData((prev) => ({ ...prev, image: reader.result }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDateChange = (date) => {
//     setFormData((prev) => ({ ...prev, date }));
//   };

//   const handleSave = () => {
//     setTableData((prev) => [...prev, formData]);
//     setFormData({ image: "", date: null, title: "", description: "" });
//   };

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" mb={3} textAlign="center">
//         Create a Record
//       </Typography>

//       {/* Form */}
//       <Box
//         component={Paper}
//         sx={{
//           p: 3,
//           mb: 4,
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//           maxWidth: 600,
//           mx: "auto",
//           boxShadow: 3,
//           borderRadius: 2,
//         }}
//       >
//         {/* Image Input */}
//         <TextField
//           type="file"
//           onChange={handleImageChange}
//           inputProps={{ accept: "image/*" }}
//           fullWidth
//         />

//         {/* Calendar */}
//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DatePicker
//             label="Select Date"
//             value={formData.date}
//             onChange={handleDateChange}
//             renderInput={(params) => <TextField {...params} fullWidth />}
//           />
//         </LocalizationProvider>

//         {/* Title Input */}
//         <TextField
//           label="Title"
//           name="title"
//           value={formData.title}
//           onChange={handleInputChange}
//           fullWidth
//         />

//         {/* Description Input */}
//         <TextField
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           multiline
//           rows={4}
//           fullWidth
//         />

//         {/* Save Button */}
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleSave}
//           disabled={!formData.title || !formData.description || !formData.date}
//           sx={{ alignSelf: "center", px: 5 }}
//         >
//           Save
//         </Button>
//       </Box>

//       {/* Data Table */}
//       <TableContainer
//         component={Paper}
//         sx={{
//           maxWidth: 800,
//           mx: "auto",
//           boxShadow: 3,
//           borderRadius: 2,
//           overflowX: "auto",
//         }}
//       >
//         <Table>
//           <TableHead sx={{ backgroundColor: "#1976d2" }}>
//             <TableRow>
//               <TableCell sx={{ color: "white" }}>Image</TableCell>
//               <TableCell sx={{ color: "white" }}>Date</TableCell>
//               <TableCell sx={{ color: "white" }}>Title</TableCell>
//               <TableCell sx={{ color: "white" }}>Description</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {tableData.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={4} align="center">
//                   No data available
//                 </TableCell>
//               </TableRow>
//             ) : (
//               tableData.map((row, index) => (
//                 <TableRow key={index}>
//                   <TableCell>
//                     {row.image && (
//                       <img
//                         src={row.image}
//                         alt="Uploaded"
//                         style={{
//                           width: 50,
//                           height: 50,
//                           borderRadius: "50%",
//                           objectFit: "cover",
//                         }}
//                       />
//                     )}
//                   </TableCell>
//                   <TableCell>{row.date?.format("YYYY-MM-DD")}</TableCell>
//                   <TableCell>{row.title}</TableCell>
//                   <TableCell>{row.description}</TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default App;

// function export_csv($fields, $data, $filename = "")
// {
//     $delimiter = ",";
//     header("Pragma: no-cache");
//     header('Content-Type: application/csv');
//     header('Content-Disposition: attachement; filename="' . $filename . '"');
//     $f = fopen('php://output', 'w');
//     fputcsv($f, $fields, $delimiter);
//     foreach ($data as $key => $value) {
//         fputcsv($f, $value, $delimiter);
//     }
//     fpassthru($f);
//     exit;
// }

// $rowArr = array();
// $fields = array('OLI_ID','Name','Email','Advocate','Tracking ID', 'Address Source','Return Date','Reason','Type', 'Added By');
// $data = $this->OperationModel->getReturnDraftData($empId, $fromDate, $toDate);
// foreach ($data as $key => $value) {
//     $rowArr[] = array($value->oli_id, $value->cust_name, $value->cust_email, $value->advocate, $value->tracking_id, $value->address_source, $value->draft_return_date, $value->cause, $value->type, $value->user_name);
// }
// export_csv($fields, $rowArr, $filename) ;
