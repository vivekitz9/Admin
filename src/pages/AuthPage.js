import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Button,
  InputAdornment,
  Avatar,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import AuthPageStyles from "../styles/AuthePageStyles";
import logoImage from "../assets/images/logoImage.jpg";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("isLogin", true);
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin) {
      navigate("/", { replace: true });
    }
  };
  return (
    <Box sx={AuthPageStyles.container}>
      <Card sx={AuthPageStyles.card}>
        <Box sx={AuthPageStyles.logoBox}>
          <Avatar alt="logo" src={logoImage} sx={AuthPageStyles.logo} />
        </Box>
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Admin Login
            </Typography>
          }
        />
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={AuthPageStyles.button}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
export default AuthPage;
