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

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
    /*  if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }
    ));
    } */
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
              {isLogin ? "Sign In" : "Create Your Account"}
            </Typography>
          }
          subheader={
            <Typography variant="body2" align="center" color="text.secondary">
              {isLogin ? "Sign in to continue" : "Start for Sign up "}
            </Typography>
          }
        />
        <CardContent>
          <form>
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
                // error={!!errors.email}
                // helperText={errors.email}
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
                // error={!!errors.password}
                // helperText={errors.password}
              />
            </Box>

            {!isLogin && (
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
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
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  //   error={!!errors.confirmPassword}
                  //   helperText={errors.confirmPassword}
                />
              </Box>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={AuthPageStyles.button}
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
          </form>
          <Box sx={AuthPageStyles.bottomText}>
            <Typography>
              {isLogin ? "Need an account?" : "Already have an account?"}
            </Typography>
            <Typography
              sx={AuthPageStyles.authButton}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default AuthPage;
