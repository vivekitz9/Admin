// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   TextField,
//   Typography,
//   Paper,
//   Fab,
//   Card,
//   CardContent,
//   CardActions,
//   Avatar,
// } from "@mui/material";
// import { CloudUploadIcon } from "../../assets/icons/icons";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import eventStyle from "../../styles/Event/event";

// const AddEvent = () => {
//   const [formData, setFormData] = useState({
//     image: "",
//     date: null,
//     title: "",
//     description: "",
//   });
//   const [errors, setErrors] = useState({
//     title: false,
//     description: false,
//     date: false,
//   });
//   const [image, setImage] = useState(null);
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
//   };
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
//     setImage(URL.createObjectURL(file));
//     // if (file) {
//     //   const reader = new FileReader();
//     //   reader.onload = () => {
//     //     setFormData((prev) => ({ ...prev, image: reader.result }));
//     //     setImage(reader.result);
//     //   };
//     //   reader.readAsDataURL(file);
//     // }
//   };
//   const handleDateChange = (date) => {
//     setFormData((prev) => ({ ...prev, date }));
//   };

//   const validateForm = () => {
//     const newErrors = {
//       title: formData.title.trim() === "",
//       description: formData.description.trim() === "",
//       date: formData.date === null,
//     };
//     setErrors(newErrors);

//     return !Object.values(newErrors).includes(true);
//   };

//   const handleSave = () => {
//     if (validateForm()) {
//       console.log("Form Submitted Successfully", formData);
//     } else {
//       console.log("Form validation failed");
//     }
//   };

//   return (
//     <Box component={Paper} sx={{ ...eventStyle.formContainer, p: 3 }}>
//       <Typography variant="h5" sx={eventStyle.heading}>
//         Add Event
//       </Typography>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 3,
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 3,
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Title"
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//               fullWidth
//               error={errors.title}
//               helperText={errors.title ? "Title is required." : ""}
//               /* sx={} */
//             />
//           </Box>
//           <Box sx={{ flex: 1 }}>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DatePicker
//                 label="Select Date"
//                 value={formData.date}
//                 onChange={handleDateChange}
//                 slots={{
//                   textField: (props) => <TextField {...props} fullWidth />,
//                 }}

//                 /* sx={} */
//               />
//             </LocalizationProvider>
//           </Box>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: { xs: "column", md: "row" },
//             gap: 3,
//           }}
//         >
//           <Box sx={{ flex: 1 }}>
//             <TextField
//               label="Description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               multiline
//               rows={8.4}
//               fullWidth
//               error={errors.description}
//               helperText={errors.description ? "Description is required." : ""}
//               sx={{}}
//             />
//           </Box>
//           <Box sx={{ flex: 1 }}>
//             <Box sx={{}}>
//               <Card>
//                 <CardContent
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                   }}
//                 >
//                   {image ? (
//                     <Avatar
//                       sx={{
//                         width: 120,
//                         height: 120,
//                         backgroundColor: "transparent",
//                       }}
//                       src={image}
//                       alt="Uploaded Image"
//                     />
//                   ) : (
//                     <Avatar
//                       sx={{
//                         width: 120,
//                         height: 120,
//                         backgroundColor: "lightgray",
//                       }}
//                       src={image}
//                     />
//                   )}
//                 </CardContent>
//                 <CardActions
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     paddingBottom: 2,
//                   }}
//                 >
//                   <Fab variant="extended" component="label" color="secondary">
//                     <CloudUploadIcon sx={{ mr: 1 }} />
//                     Upload files
//                     <TextField
//                       type="file"
//                       onChange={handleImageChange}
//                       // inputProps={{ accept: "image/*" }}
//                       multiple
//                       sx={{ display: "none" }}
//                     />
//                   </Fab>
//                 </CardActions>
//               </Card>
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       <Box sx={{ textAlign: "center", mt: 4 }}>
//         <Button variant="contained" color="primary" onClick={handleSave}>
//           Save
//         </Button>
//       </Box>
//     </Box>
//   );
// };
// export default AddEvent;
