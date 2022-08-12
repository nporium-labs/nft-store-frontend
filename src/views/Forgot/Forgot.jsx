import React, { useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import CustomContainer from "components/CustomContainer";
import CustomButton from "components/CustomButton";
import StyledBox from "components/StyledBox";
import TextField from "components/CustomInput/TextField";

import styles from "assets/jss/views/authStyles";
import { forgotPassword } from "services";

const useStyles = makeStyles(styles);

const Login = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [emailError, setEmailError] = useState();
  let [loading, setLoading] = useState();
  window.localStorage.clear();

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const emailHanlder = (event) => {
    event.preventDefault();
    if (!isValidEmail(event.target.value)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError(null);
    }
    setEmail(event.target.value);
  };

  const forgotHandler = async (event) => {
    event.preventDefault();
    if (email && email.length !== 0 && isValidEmail(email)) {
      setLoading(true);
      const result = await forgotPassword(email);
      if (result && result.result.isError === false) {
        notify(result.result.message);
        setLoading(false);
        navigate("/");
      } else if (result && result.result.isError === true) {
        notify("User With this email and password does not exist");
        setLoading(false);
      } else {
        notify("User With this email and password does not exist");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const notify = (message) => toast(message);

  return (
    <Box>
      <StyledBox className={clsx(classes.header)} mx="auto">
        <CustomContainer>
          <Box
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h6"
                color="rgba(15,14,54,0.25)"
                align="center"
              >
                Hello again!
              </Typography>
              <Typography variant="h3" color="#0F0E36">
                Forgot.
              </Typography>
            </Box>
          </Box>
        </CustomContainer>
      </StyledBox>
      <Box className={classes.contents}>
        <CustomContainer>
          <Box className={classes.form} mx="auto">
            <Box sx={{ marginBottom: "30px" }}>
              <TextField
                label="Email"
                placeholder="E.g. johndoe@email.com"
                onChange={emailHanlder}
                value={email}
              />
              <p className="error-msg">{emailError}</p>
            </Box>

            <Box mb={5}>
              <CustomButton
                fullWidth
                className={classes.loginBtn}
                onClick={forgotHandler}
              >
                Request reset link
              </CustomButton>
            </Box>
            {loading && (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
          </Box>
        </CustomContainer>
      </Box>
    </Box>
  );
};

export default Login;
