import React, { useState, useContext, useEffect } from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
// import { GoogleLogout } from "react-google-login";
import { googleLogout } from "@react-oauth/google";

import CustomContainer from "components/CustomContainer";
import CustomButton from "components/CustomButton";
import TitleBox from "components/TitleBox";
import TextField from "components/CustomInput/TextField";

import { AppContext } from "context/AppContextProvider";

import styles from "assets/jss/views/accountStyles";

const useStyles = makeStyles(styles);

const Account = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { handleLogout, logged } = useContext(AppContext);

  var googletest = true;
  const [tab, setTab] = useState("profile");
  const [userEmail, setUserEmail] = useState();
  const [userName, setUserName] = useState();
  const [googleUser, setGoogleUser] = useState();
  const [isgoogleLogout, setIsGoogleLogout] = useState();
  let [loading, setLoading] = useState();
  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
  }, [logged]);

  const logoutHadler = () => {
    setLoading(true);
    window.localStorage.clear();
    googleLogout();
    handleLogout();
    setLoading(false);
    notify("you are logout successfully");
    navigate("/login");
  };
  const notify = (message) => toast(message);

  return (
    <Box>
      <CustomContainer>
        <TitleBox
          subTitle="Account settings"
          title="Profile Details."
          color="info"
        />
        <Divider
          sx={{ borderColor: "#EBEAEF", borderWidth: "1px", margin: "30px 0" }}
        />
        <Box display="flex" flexWrap="wrap">
          <Box className={classes.menuBox}>
            <Button
              variant="text"
              className={clsx({ [classes.active]: tab === "profile" })}
              onClick={() => setTab("profile")}
            >
              Profile
            </Button>
            <Button
              variant="text"
              className={clsx({ [classes.active]: tab === "security" })}
              onClick={() => setTab("security")}
            >
              Security
            </Button>
            <Button
              variant="text"
              className={clsx({ [classes.active]: tab === "featured-items" })}
              onClick={() => setTab("featured-items")}
            >
              Featured Items
            </Button>
            <Button
              variant="text"
              className={clsx({ [classes.active]: tab === "notifications" })}
              onClick={() => setTab("notifications")}
            >
              Notifications
            </Button>
            <Button
              variant="text"
              className={clsx({ [classes.active]: tab === "offers" })}
              onClick={() => setTab("offers")}
            >
              Offers
            </Button>
            <Button
              variant="text"
              className={clsx({ [classes.active]: tab === "payment" })}
              onClick={() => setTab("payment")}
            >
              Payment
            </Button>
            <Button
              variant="text"
              className={clsx({ [classes.active]: tab === "account-support" })}
              onClick={() => setTab("account-support")}
            >
              Account Support
            </Button>
            <Button
              variant="text"
              className={clsx({ [classes.active]: tab === "earnings" })}
              onClick={() => setTab("earnings")}
            >
              Earnings
            </Button>

            <Button variant="text" onClick={logoutHadler}>
              Log out
            </Button>
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
          <Box className={classes.contents}>
            <Box className={classes.bannerImg}>
              <img
                src="/images/collection-header-bg.png"
                width="100%"
                height="100%"
                alt=""
              />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              justifyContent="space-between"
              className={classes.logoWrapper}
            >
              <img
                src="/images/collection-avatar.png"
                alt=""
                className={classes.mainLogo}
              />
              <CustomButton sx={{ margin: "8px 0" }}>
                <img src="/images/icons/iconmonstr-photo-camera.png" alt="" />
                &nbsp; Profile Banner
              </CustomButton>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField label="Name" defaultValue="John Doe" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField label="Username" defaultValue={userName} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField label="Email" defaultValue={userEmail} />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField label="Website" defaultValue="yourwebsite.com" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  placeholder="Tell the world your story!"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField label="Twitter" placeholder="Your Twitter handle" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Instagram"
                  placeholder="Your Instagram handle"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  label="Facebook"
                  placeholder="Your Facebook profile"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField label="Discord" placeholder="Your Discord profile" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Wallet Address"
                  defaultValue="0xf192ef0bfefdb91a5ba9917e8ec79024ce6837d8"
                />
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <CustomButton className={classes.updateBtn}>
                    Update Profile
                  </CustomButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </CustomContainer>
    </Box>
  );
};

export default Account;
