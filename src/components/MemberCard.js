import React, { useRef } from "react";
import QRCode from "react-qr-code";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  CardMedia,
} from "@mui/material";
import html2canvas from "html2canvas";
import DownloadIcon from "@mui/icons-material/Download";
// import ShareIcon from "@mui/icons-material/Share";
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import logo from "../assets/images/shivdeepLogo.jpeg";

const MemberCard = () => {
  const location = useLocation();
  const formData = location.state?.userData;
  const cardRef = useRef(null);

  const headingFirst = "Connect With";
  const headingLast = "shivdeep";
  const officeAddress = "D/3, PC Colony, Sector-89, Delhi";

  const memberDetails = {
    memberName: formData.fullName,
    district: formData.district,
    state: formData.state,
    memberId: formData.memberId,
    image: formData.image,
  };

  const handleDownloadPDF = () => {
    html2canvas(cardRef.current, {
      scale: 5,
      useCORS: true, // Enables cross-origin image loading
      allowTaint: true, // Allows tainted images if needed
      logging: true, // Enables logging for debugging
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4"); // Landscape orientation
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width; // Maintain aspect ratio
      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight);
      pdf.save("member-card.pdf");
    });
  };

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ textAlign: "center", marginBottom: 2, marginTop: 1 }}
          >
            {`Member Card of ${memberDetails.memberName}`}
          </Typography>
        </Box>
        <hr color="#84764F" style={{ marginTop: "-8px" }} />
      </Box>
      <div>
        <Card
          ref={cardRef}
          sx={{
            position: "relative",
            maxWidth: 560,
            margin: "auto",
            border: "1px solid #84764F",
            borderRadius: 5,
            boxShadow: 3,
            marginTop: 5,
          }}
        >
          <CardContent sx={{ padding: 0 }}>
            <Box
              sx={{
                backgroundColor: "#84764F",
                display: "flex",
                gap: 3,
              }}
            >
              <Avatar
                src={logo}
                sx={{
                  width: 100,
                  height: 100,
                  marginTop: 2,
                  marginBottom: 2,
                  marginLeft: 2,
                  border: "3px solid white",
                  boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                }}
              />
              <Box sx={{ marginTop: 2 }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {headingFirst.toUpperCase()}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {headingLast.toUpperCase()}
                </Typography>
                <hr color="white" />
                <Typography variant="body2" sx={{ color: "white" }}>
                  {officeAddress}
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={2} sx={{ marginTop: 3 }}>
              <Grid item xs={8} sx={{ marginLeft: 3 }}>
                <Typography variant="body1" gutterBottom>
                  <b>
                    MEMBER NAME{" "}
                    <span style={{ marginLeft: "20px", marginRight: "20px" }}>
                      {" "}
                      :{" "}
                    </span>{" "}
                    {memberDetails.memberName.toUpperCase()}
                  </b>
                </Typography>

                <Typography variant="body1" gutterBottom>
                  <b>
                    DISTRICT{" "}
                    <span style={{ marginLeft: "68px", marginRight: "20px" }}>
                      {" "}
                      :{" "}
                    </span>{" "}
                    {memberDetails.district.toUpperCase()}
                  </b>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>
                    STATE{" "}
                    <span style={{ marginLeft: "90px", marginRight: "20px" }}>
                      {" "}
                      :{" "}
                    </span>{" "}
                    {memberDetails.state.toUpperCase()}
                  </b>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <b>
                    MEMBERSHIP ID{" "}
                    <span style={{ marginLeft: "15px", marginRight: "20px" }}>
                      {" "}
                      :{" "}
                    </span>{" "}
                    {memberDetails.memberId}
                  </b>
                </Typography>
              </Grid>

              <Grid item xs={4} sx={{ textAlign: "center" }}>
                <CardMedia
                  component="img"
                  image={memberDetails.image}
                  alt="User Image"
                  sx={{
                    position: "absolute",
                    top: "50px",
                    left: "390px",
                    width: "130px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: 5,
                    border: "3px solid white",
                    boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                  }}
                />

                <Box sx={{ position: "absolute", top: "220px", left: "412px" }}>
                  <QRCode value={formData.mobile} size={90} />
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Box sx={{ marginLeft: 15 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleDownloadPDF}
            sx={{ marginTop: 3, backgroundColor: "#84764F", marginLeft: 48 }}
            startIcon={<DownloadIcon />}
          >
            Download
          </Button>
          {/* <Button
          variant="contained"
          color="success"
          sx={{ marginTop: 3, backgroundColor: "#84764F", marginLeft: 30 }}
          startIcon={<ShareIcon />}
        >
          Share
        </Button> */}
        </Box>
      </div>
    </>
  );
};

export default MemberCard;
