import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { gapi } from "gapi-script";

import Layout from "components/Layout";

import Home from "views/Home";
import Explore from "views/Explore";
import Collectibles from "views/Collectibles";
import Collections from "views/Collections";
import CollectionCategory from "views/CollectionCategory";
import CollectionDetail from "views/CollectionDetail";
import Creators from "views/Creators";
import CreatorDetail from "views/CreatorDetail";
import Blog from "views/Blog";
import BlogDetail from "views/BlogDetail";
import Contact from "views/Contact";
import Login from "views/Login";
import Register from "views/Register";
import Profile from "views/Profile";
import Account from "views/Account";
import UpdateUserPasword from "views/UpdateUserPasword";

import AppContextProvider from "context/AppContextProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Forgot from "views/Forgot";

const theme = createTheme({});

function App() {
  // useEffect(() => {
  //   const start = () => {
  //     gapi.client.init({
  //       clientId:
  //         "655028439560-rqh779jka3tg38gcbb4862pobvo0gmg5.apps.googleusercontent.com",
  //       scope: "email",
  //     });
  //   };
  //   gapi.load("client:auth2", start);
  // });

  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId="655028439560-rqh779jka3tg38gcbb4862pobvo0gmg5.apps.googleusercontent.com">
        <AppContextProvider>
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route
                  path="/explore/collectibles"
                  element={<Collectibles />}
                />
                <Route path="/explore" element={<Explore />} />
                <Route
                  path="/collections/:category/:id"
                  element={<CollectionDetail />}
                />
                <Route
                  path="/collections/:category"
                  element={<CollectionCategory />}
                />
                <Route path="/collections" element={<Collections />} />
                <Route path="/creators/:id" element={<CreatorDetail />} />
                <Route path="/creators" element={<Creators />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/account" element={<Account />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="/forgot/:id" element={<UpdateUserPasword />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </AppContextProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
