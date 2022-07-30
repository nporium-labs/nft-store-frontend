import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Layout from 'components/Layout'

import Home from 'views/Home'
import Explore from 'views/Explore'
import Collectibles from 'views/Collectibles'
import Collections from 'views/Collections'
import CollectionCategory from 'views/CollectionCategory'
import CollectionDetail from 'views/CollectionDetail'
import Creators from 'views/Creators'
import CreatorDetail from 'views/CreatorDetail'
import Blog from 'views/Blog'
import BlogDetail from 'views/BlogDetail'
import Contact from 'views/Contact'
import Login from 'views/Login'
import Register from 'views/Register'
import Profile from 'views/Profile'
import Account from 'views/Account'

import AppContextProvider from 'context/AppContextProvider'

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path='/explore/collectibles' element={<Collectibles />} />
              <Route path='/explore' element={<Explore />} />
              <Route path='/collections/:category/:id' element={<CollectionDetail />} />
              <Route path='/collections/:category' element={<CollectionCategory />} />
              <Route path='/collections' element={<Collections />} />
              <Route path='/creators/:id' element={<CreatorDetail />} />
              <Route path='/creators' element={<Creators />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/blog/:id' element={<BlogDetail />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Register />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/account' element={<Account />} />
              <Route path='/' element={<Home />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
