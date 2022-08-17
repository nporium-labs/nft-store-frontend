import React, { useContext, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";

import CustomContainer from "components/CustomContainer";
import CustomButton from "components/CustomButton";
import StyledBox from "components/StyledBox";
import TextField from "components/CustomInput/TextField";

import { AppContext } from "context/AppContextProvider";
import { GoogleLogin } from "@react-oauth/google";

import styles from "assets/jss/views/authStyles";
import { loginWithGoogle, login } from "services";
import { Button } from "@mui/material";

const useStyles = makeStyles(styles);

const Login = () => {
  const classes = useStyles();
  let userStorageEmail = localStorage.getItem("email");
  const navigate = useNavigate();
  const [email, setEmail] = useState(() => {
    if (!userStorageEmail) {
      return "";
    } else {
      return userStorageEmail;
    }
  });

  const [pasword, setPasword] = useState();
  const [emailError, setEmailError] = useState();
  const [passwrodError, setPasswrodError] = useState();
  const [checkbox, setCheckbox] = useState(false);
  let [loading, setLoading] = useState();

  const { handleLogin } = useContext(AppContext);

  const onSuccess = async (res) => {
    setLoading(true);
    console.log(res);
    var token = jwt_decode(res.credential);
    const result = await loginWithGoogle(
      token.sub,
      token.name,
      token.givenName,
      token.family_name,
      token.picture,
      token.email,
      token.email_verified,
      token.locale
    );
    if (result && result.loginResult.isError === false) {
      localStorage.setItem("token", result.loginResult.token);
      localStorage.setItem("name", result.loginResult.userName);
      localStorage.setItem("email", result.loginResult.email);
      localStorage.setItem("google", true);
      localStorage.setItem("checked", false);
      handleLogin(result.loginResult.userName);
      notify(result.loginResult);
      navigate("/");
      setLoading(false);
    }
  };

  const onFailure = (res) => {
    // console.log("fail to login", res);
  };
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  const isValidPassword = (password) => {
    if (password.length > 5 && password.length < 20) {
      return true;
    } else {
      return false;
    }
  };

  const passwordHanlder = (event) => {
    event.preventDefault();
    if (!isValidPassword(event.target.value)) {
      setPasswrodError("please provide minimum 6 letters");
    } else {
      setPasswrodError(null);
    }
    setPasword(event.target.value);
  };

  const handleCheckBox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setCheckbox(true);
    } else {
      setCheckbox(false);
    }
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

  const loginHandler = async (event) => {
    event.preventDefault();
    if (
      email &&
      pasword &&
      email.length !== 0 &&
      pasword.length !== 0 &&
      isValidPassword(pasword) &&
      isValidEmail(email)
    ) {
      setLoading(true);
      const result = await login(email, pasword);
      if (result.loginResult && result.loginResult.isError === false) {
        localStorage.setItem("token", result.loginResult.token);
        localStorage.setItem("name", result.loginResult.userName);
        localStorage.setItem("email", result.loginResult.email);
        localStorage.setItem("google", false);
        localStorage.setItem("checked", checkbox);
        handleLogin(result.loginResult.userName);
        notify(result.loginResult.message);
        setLoading(false);
        navigate("/");
      } else if (result && result.isError === true) {
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
                Login.
              </Typography>
            </Box>
          </Box>
        </CustomContainer>
      </StyledBox>
      <Box className={classes.contents}>
        <CustomContainer>
          <Box className={classes.form} mx="auto">
            <Box>
              <div className="googlebtn">
                <GoogleLogin
                  context={"signin"}
                  render={(renderProps) => (
                    <Button
                      fullWidth
                      className="w-100 googlebtn-inner"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Sign in with google
                    </Button>
                  )}
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                />
              </div>
            </Box>
            <Box
              my={4}
              display="flex"
              justifyContent="center"
              position="relative"
              className={classes.orText}
            >
              <Typography variant="body1" color="rgba(119, 118, 132, 0.5)">
                or Login with Email
              </Typography>
            </Box>

            <Box sx={{ marginBottom: "30px" }}>
              <TextField
                label="Email"
                placeholder="E.g. johndoe@email.com"
                onChange={emailHanlder}
                value={email}
              />
              <p className="error-msg">{emailError}</p>
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
              <TextField
                label="Password"
                placeholder="Enter your password"
                type="password"
                onChange={passwordHanlder}
              />
              <p className="error-msg">{passwrodError}</p>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
              flexWrap="wrap"
            >
              <Box display="flex" alignItems="center">
                <Checkbox onChange={handleCheckBox} />
                <Typography variant="body1" color="#777684">
                  Remember Me
                </Typography>
              </Box>
              <Link href="/forgot" sx={{ color: "#0F0E36" }} underline="none">
                Forgot Password?
              </Link>
            </Box>

            <Box mb={5}>
              <CustomButton
                fullWidth
                className={classes.loginBtn}
                onClick={loginHandler}
              >
                Login
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
            <Box>
              <Typography
                variant="body1"
                color="#777684"
                align="center"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                Not registered yet? &nbsp;
                <Link
                  href="/"
                  sx={{
                    color: "#0F0E36",
                    display: "flex",
                    alignItems: "center",
                  }}
                  underline="none"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/signup");
                  }}
                >
                  Create an account &nbsp;&nbsp;
                  <img
                    src="/images/icons/iconmonstr-arrow-right-lined.png"
                    alt=""
                  />
                </Link>
              </Typography>
            </Box>
          </Box>
        </CustomContainer>
      </Box>
    </Box>
  );
};

export default Login;
