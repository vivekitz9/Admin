// import React, { useEffect, useState, useTransition } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import {
//   Avatar,
//   Card,
//   CardContent,
//   Typography,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   CircularProgress,
//   Alert,
//   Box,
//   Paper,
//   TablePagination,
//   TextField,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   MenuItem,
// } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { baseURL } from "../../assets/BaseUrl";

// const GETAPI = `${baseURL}api/v1/users`;
// const POSTAPI = `${baseURL}api/v1/users`;

// const AllUsers = () => {
//   const [allUsers, setAllUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [uploadModalOpen, setUploadModalOpen] = useState(false);
//   const [newUser, setNewUser] = useState({
//     fullName: "",
//     mobile: "",
//     email: "",
//     dob: "",
//     gender: "",
//     district: "",
//     state: "",
//   });

//   // console.log(allUsers);

//   const [selectedUser, setSelectedUser] = useState(null);
//   const [viewModalOpen, setViewModalOpen] = useState(false);

//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const [searchQuery, setSearchQuery] = useState("");

//   const [dateFiltr, setDateFilter] = useState("");
//   const [filterData, setFilterData] = useState([]);

//   const handleDateChange = (e) => {
//     const selectedDate = e.target.value;
//     console.log("selectedData : ", selectedDate);
//     setDateFilter(selectedDate);

//     setFilterData(
//       allUsers.filter((user) => {
//         const formattedDate = new Date(user.createDate)
//           .toISOString()
//           .split("T")[0];
//         console.log(formattedDate);
//         return selectedDate == formattedDate;
//       })
//     );
//   };

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//     setPage(0); // Reset to first page on search
//   };

//   const user = useSelector((store) => store.auth);
//   const token = user?.user?.data?.token;

//   let usersCount = 0;
//   let adminCount = 0;

//   for (let user of allUsers) {
//     if (user.userrole === "user") usersCount++;
//     else adminCount++;
//   }

//   // Handle models
//   const opneUploadModel = () => setUploadModalOpen(true);
//   const closeUploadModel = () => {
//     setUploadModalOpen(false);
//     setNewUser({
//       fullName: "",
//       mobile: "",
//       email: "",
//       dob: "",
//       gender: "",
//       district: "",
//       state: "",
//     });
//   };

//   const fetchAllUsers = async () => {
//     try {
//       const response = await axios.get(GETAPI, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setAllUsers(response.data.data || []); // Extract users from API response
//       setFilterData(response.data.data || []); // Extract users from API response
//     } catch (err) {
//       setError(err.response?.data?.message || "Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle View

//   const handleView = (temp) => {
//     setSelectedUser(temp);
//     setViewModalOpen(true);
//   };
//   // console.log("selected User  :  ", selectedUser);

//   // Handle Close View
//   const closeViewModal = () => {
//     setViewModalOpen(false);
//     setSelectedUser(null);
//   };

//   // Handle Pagination

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const filteredData = allUsers.filter((row) =>
//     row.fullName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleChange = (e) => {
//     setNewUser({ ...newUser, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     // console.log("newUser  :  ", newUser);
//     if (
//       newUser.fullName &&
//       newUser.mobile &&
//       newUser.email &&
//       newUser.dob &&
//       newUser.gender &&
//       newUser.district &&
//       newUser.state
//     ) {
//       const formData = new FormData();
//       formData.append("fullName", newUser.fullName);
//       formData.append("mobile", newUser.mobile);
//       formData.append("email", newUser.email);
//       formData.append("dob", newUser.dob);
//       formData.append("gender", newUser.gender);
//       formData.append("district", newUser.district);
//       formData.append("state", newUser.state);

//       // console.log("Form Data  :  ", formData);

//       try {
//         const response = await axios.post(POSTAPI, formData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         });

//         // console.log("Response data  : ", response);

//         if (response.status === 200) {
//           fetchAllUsers();
//           closeUploadModel();
//         }
//       } catch (error) {
//         console.log("Error add user: ", error);
//       }
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       fetchAllUsers();
//     }
//   }, []);

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//         <Typography
//           variant="h4"
//           gutterBottom
//           sx={{ textAlign: "center", marginBottom: 2 }}
//         >
//           {`All Users (${filterData.length})`}
//         </Typography>
//         <Box sx={{ textAlign: "center", marginBottom: 3 }}>
//           <TextField
//             label="Search User"
//             variant="outlined"
//             value={searchQuery}
//             onChange={handleSearch}
//             sx={{ width: "400px" }}
//           />
//           <TextField
//             type="date"
//             value={dateFiltr}
//             onChange={handleDateChange}
//             sx={{ marginBottom: 2, marginLeft: 1 }}
//           />
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#84764F",
//               marginLeft: "20px",
//               marginTop: "10px",
//             }}
//             startIcon={<CloudUploadIcon />}
//             onClick={opneUploadModel}
//           >
//             Add User
//           </Button>
//         </Box>
//       </Box>
//       <hr color="#84764F" style={{ marginTop: "-8px" }} />
//       <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2 }}>
//         <CardContent>
//           {/* Loading Indicator */}
//           {loading && (
//             <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
//               <CircularProgress />
//             </Box>
//           )}

//           {/* Error Message */}
//           {error && <Alert severity="error">{error}</Alert>}

//           {/* User List */}
//           {!loading && !error && (
//             <List>
//               {filteredData.length > 0 ? (
//                 filteredData
//                   .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                   .map(
//                     (user) =>
//                       user.userrole != "admin" && (
//                         <Paper key={user.id} sx={{ my: 1, p: 1 }}>
//                           <ListItem>
//                             <ListItemAvatar>
//                               <Avatar
//                                 src={
//                                   user.image || "https://via.placeholder.com/50"
//                                 }
//                                 alt={user.fullName}
//                                 sx={{ width: 50, height: 50 }}
//                               />
//                             </ListItemAvatar>
//                             <ListItemText
//                               primary={`${user.fullName} (${user.userName})`}
//                               secondary={
//                                 <>
//                                   {user.email} | <b>Role:</b> {user.userrole}
//                                 </>
//                               }
//                             />
//                             <Button
//                               variant="contained"
//                               sx={{ marginLeft: 1 }}
//                               onClick={() => handleView(user)}
//                             >
//                               View
//                             </Button>
//                           </ListItem>
//                         </Paper>
//                       )
//                   )
//               ) : (
//                 <Typography variant="body1" color="textSecondary">
//                   No users found.
//                 </Typography>
//               )}
//             </List>
//           )}
//         </CardContent>
//         {/* Pagination */}
//         <TablePagination
//           rowsPerPageOptions={[10, 20, 30]}
//           component="div"
//           count={usersCount}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Card>

//       {/* open model  */}
//       <Dialog open={uploadModalOpen} onClose={closeUploadModel}>
//         <DialogTitle>Add New User</DialogTitle>
//         <DialogContent>
//           <TextField
//             fullWidth
//             margin="dense"
//             label="Full Name"
//             name="fullName"
//             value={newUser.fullName}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             label="Mobile"
//             name="mobile"
//             value={newUser.mobile}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             label="Email"
//             name="email"
//             value={newUser.email}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             type="date"
//             label="DOB"
//             name="dob"
//             value={newUser.dob}
//             onChange={handleChange}
//             InputLabelProps={{ shrink: true }}
//           />
//           <TextField
//             fullWidth
//             select
//             margin="dense"
//             label="Gender"
//             name="gender"
//             value={newUser.gender}
//             onChange={handleChange}
//           >
//             <MenuItem value="Male">Male</MenuItem>
//             <MenuItem value="Female">Female</MenuItem>
//             <MenuItem value="Other">Other</MenuItem>
//           </TextField>
//           <TextField
//             fullWidth
//             margin="dense"
//             label="District"
//             name="district"
//             value={newUser.district}
//             onChange={handleChange}
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             label="State"
//             name="state"
//             value={newUser.state}
//             onChange={handleChange}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeUploadModel}>Cancel</Button>
//           <Button
//             variant="contained"
//             sx={{ backgroundColor: "#84764F" }}
//             onClick={handleSubmit}
//           >
//             Post
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Open view Modal */}
//       <Dialog
//         open={viewModalOpen}
//         onClose={closeViewModal}
//         maxWidth="sm"
//         fullWidth
//       >
//         <DialogContent>
//           <Typography>FULL NAME : {selectedUser?.fullName}</Typography>
//         </DialogContent>
//         <DialogContent>
//           <Typography>USER NAME : {selectedUser?.userName}</Typography>
//         </DialogContent>
//         <DialogContent>
//           <Typography>PHONE NUMBER : {selectedUser?.mobile}</Typography>
//         </DialogContent>
//         <DialogContent>
//           <Typography>DATE OF BIRTH : {selectedUser?.dob}</Typography>
//         </DialogContent>
//         <DialogContent>
//           <Typography>GRNDER : {selectedUser?.gender}</Typography>
//         </DialogContent>
//         <DialogContent>
//           <Typography>DISTRICT : {selectedUser?.district}</Typography>
//         </DialogContent>
//         <DialogContent>
//           <Typography>State : {selectedUser?.state}</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={closeViewModal} variant="contained">
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AllUsers;

// *************************************  2nd  ************************************** //

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Avatar,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Alert,
  Box,
  Paper,
  TablePagination,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { baseURL } from "../../assets/BaseUrl";

const GETAPI = `${baseURL}api/v1/users`;

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const user = useSelector((store) => store.auth);
  const token = user?.user?.data?.token;

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(GETAPI, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUsers(response.data.data || []);
      setFilteredData(response.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchAllUsers();
  }, []);

  useEffect(() => {
    let filtered = allUsers.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (dateFilter
          ? new Date(user.createDate).toISOString().split("T")[0] === dateFilter
          : true) &&
        (districtFilter
          ? user.district.toLowerCase().includes(districtFilter.toLowerCase())
          : true) &&
        (genderFilter
          ? user.gender.toLowerCase() === genderFilter.toLowerCase()
          : true)
    );
    setFilteredData(filtered);
  }, [searchQuery, dateFilter, districtFilter, genderFilter, allUsers]);

  const clearFilters = () => {
    setSearchQuery("");
    setDateFilter("");
    setDistrictFilter("");
    setGenderFilter("");
    setFilteredData(allUsers);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h4" gutterBottom>
          {`All Users (${filteredData.length})`}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <TextField
          label="Search Name"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <TextField
          label="District"
          variant="outlined"
          value={districtFilter}
          onChange={(e) => setDistrictFilter(e.target.value)}
        />
        <TextField
          type="date"
          label="Filter by Date"
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        <TextField
          select
          label="Gender"
          variant="outlined"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </TextField>
        <Button variant="contained" color="secondary" onClick={clearFilters}>
          Clear All Filters
        </Button>
      </Box>
      <hr color="#84764F" style={{ marginTop: "-8px" }} />
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Card>
          <CardContent>
            <List>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <Paper key={user.id} sx={{ my: 1, p: 1 }}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          src={user.image || "https://via.placeholder.com/50"}
                          alt={user.fullName}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${user.fullName} (${user.userName})`}
                        secondary={`${user.email} | Gender: ${user.gender}`}
                      />
                    </ListItem>
                  </Paper>
                ))}
            </List>
          </CardContent>
          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </Card>
      )}
    </Box>
  );
};

export default AllUsers;
