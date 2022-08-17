import React, { useContext, useState } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { GoogleLogin } from "@react-oauth/google";
import { AppContext } from "context/AppContextProvider";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import CustomContainer from "components/CustomContainer";
import CustomButton from "components/CustomButton";
import StyledBox from "components/StyledBox";
import TextField from "components/CustomInput/TextField";
import { Button } from "@mui/material";
import { registerUser, loginWithGoogle } from "services";

import styles from "assets/jss/views/authStyles";

const useStyles = makeStyles(styles);

const Register = () => {
  const classes = useStyles();

  const navigate = useNavigate();
  const { handleLogin } = useContext(AppContext);

  const [email, setEmail] = useState();
  const [pasword, setPasword] = useState();
  const [repasword, setRepasword] = useState();
  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [policyCheckbox, setPolicyCheckbox] = useState();
  const [newsletterCheckbox, setNewsletterCheckbox] = useState();
  const [emailError, setEmailError] = useState();
  const [passwrodError, setPasswrodError] = useState();
  const [nameError, setNameError] = useState();
  let [loading, setLoading] = useState();

  const clientId =
    "655028439560-rqh779jka3tg38gcbb4862pobvo0gmg5.apps.googleusercontent.com";

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
  const isValidName = (name) => {
    if (name.length > 5 && name.length < 20) {
      return true;
    } else {
      return false;
    }
  };
  const nameHanlder = (event) => {
    event.preventDefault();
    if (!isValidName(event.target.value)) {
      setNameError("please provide minimum 6 letters");
    } else {
      setNameError(null);
    }
    setfirstName(event.target.value);
    setlastName("");
  };
  const emailHanlder = (event) => {
    event.preventDefault();
    if (!isValidEmail(event.target.value)) {
      setEmailError("Email is not valid");
    } else {
      setEmailError(null);
    }
    setEmail(event.target.value);
    setImageUrl("");
  };

  const passwordHanlder = (event) => {
    event.preventDefault();
    if (!isValidPassword(event.target.value)) {
      setPasswrodError(
        "please provide minimum 6 letters and password should match with re-password"
      );
    } else {
      setPasswrodError(null);
    }
    setPasword(event.target.value);
  };

  const rePasswordHanlder = (event) => {
    event.preventDefault();
    if (
      !isValidPassword(event.target.value) ||
      event.target.value !== pasword
    ) {
      setPasswrodError(
        "please provide minimum 6 letters and password should match with re-password"
      );
    } else {
      setPasswrodError(null);
    }
    setRepasword(event.target.value);
  };

  const handlePolicyCheckBox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setPolicyCheckbox(true);
    } else {
      setPolicyCheckbox(false);
    }
  };
  const handleNewsLetterCheckBox = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setNewsletterCheckbox(true);
    } else {
      setNewsletterCheckbox(false);
    }
  };
  const signupHandler = async (event) => {
    event.preventDefault();
    if (
      email &&
      firstName &&
      pasword &&
      repasword &&
      email.length !== 0 &&
      pasword.length !== 0 &&
      repasword.length !== 0 &&
      pasword.toLowerCase() === repasword.toLowerCase() &&
      isValidName(firstName) &&
      isValidPassword(pasword) &&
      isValidEmail(email) &&
      policyCheckbox
    ) {
      setLoading(true);
      const result = await registerUser(
        email,
        firstName,
        lastName,
        imageUrl,
        pasword
      );
      if (result && result.isError === false) {
        notify(result.message);
        setLoading(false);
        navigate("/login");
      } else {
        notify("User already exist exist");
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const onSuccess = async (res) => {
    setLoading(true);
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
      notify(result.loginResult.message);
      navigate("/");
      setLoading(false);
    }
  };

  const onFailure = (res) => {
    // console.log("fail to login", res);
  };

  const notify = (message) => toast(message);
  return (
    <Box>
      <StyledBox
        className={clsx(classes.header, classes.signUpHeader)}
        mx="auto"
      >
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
                Create account
              </Typography>
              <Typography variant="h3" color="#0F0E36">
                Register.
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
                      Sign up with google
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
                or Sign up with Email
              </Typography>
            </Box>

            <Box sx={{ marginBottom: "30px" }}>
              <TextField
                label="Name"
                placeholder="John Doe"
                onChange={nameHanlder}
              />
              <p className="error-msg">{nameError}</p>
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
              <TextField
                label="Email"
                placeholder="E.g. johndoe@email.com"
                onChange={emailHanlder}
              />
              <p className="error-msg">{emailError}</p>
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
              <TextField
                label="Password"
                placeholder="Set your password"
                type="password"
                onChange={passwordHanlder}
                endAdornment={
                  <InputAdornment position="end">
                    <img
                      src="/images/icons/iconmonstr-eye-off-lined.png"
                      alt=""
                    />
                  </InputAdornment>
                }
              />
              <p className="error-msg">{passwrodError}</p>
            </Box>
            <Box sx={{ marginBottom: "30px" }}>
              <TextField
                label="Repeat Password"
                placeholder="Repeat your password"
                type="password"
                onChange={rePasswordHanlder}
                endAdornment={
                  <InputAdornment position="end">
                    <img
                      src="/images/icons/iconmonstr-eye-off-lined.png"
                      alt=""
                    />
                  </InputAdornment>
                }
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
                <Checkbox onChange={handlePolicyCheckBox} />
                <Typography variant="body1" color="#777684">
                  I’ve read and accept the &nbsp;
                  <Link href="/" sx={{ color: "#777684" }}>
                    terms & conditions
                  </Link>
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Checkbox onChange={handleNewsLetterCheckBox} />
                <Typography variant="body1" color="#777684">
                  Subscribe to our newsletter to stay in the loop
                </Typography>
              </Box>
            </Box>

            <Box mb={5}>
              <CustomButton
                fullWidth
                className={classes.signupBtn}
                onClick={signupHandler}
              >
                Register
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
                Already have an account? &nbsp;
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
                    navigate("/login");
                  }}
                >
                  Login &nbsp;&nbsp;
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

export default Register;
