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

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
            <Route path='/' element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
