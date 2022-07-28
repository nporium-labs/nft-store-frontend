import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from "@mui/styles";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'

import CustomContainer from 'components/CustomContainer'
import Newsletter from 'components/Newsletter'
import UnderlineButton from 'components/UnderlineButton'
import CollectionDetailCard from 'components/CollectionDetailCard'
import CustomButton from 'components/CustomButton';

import styles from 'assets/jss/views/blogStyles'

const useStyles = makeStyles(styles)

const Blog = () => {

  const classes = useStyles()

  return (
    <Box>
      <Box className={clsx(classes.header)} mx='auto'>
        <CustomContainer>
          <Typography variant='h6' color='rgba(15,14,54,0.25)'>
            Latest news
          </Typography>
          <Typography variant='h3' color="#0F0E36">
            Blog.
          </Typography>
        </CustomContainer>
      </Box>
      <Box className={classes.contents}>
        <CustomContainer>
          <Box sx={{ marginTop: '50px', padding: '20px', backgroundColor: "white" }} position='relative' display='flex' justifyContent='space-between' alignItems='center' flexWrap='wrap'>
            <Box display='flex' className={classes.comingSoonImg}>
              <img src="/images/coming-soon.png" alt="" width='100%' />
            </Box>
            <Box className={classes.comingSoonContent}>
              <Typography variant='h6' color='rgba(15, 14, 54, 0.25)'>
                Launching August ‘22
              </Typography>
              <Typography variant='h3' color='#0F0E36'>
                <span>Nifty</span>Cats<br />
                <span>by</span> Alex Echo.
              </Typography>
              <Typography variant='body1' color='#777684' sx={{ lineHeight: '1.2' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus suscipit magna odio.
                Nam porta vel augue vitae consequat. Donec rutrum mauris ac lorem consequat, nec tempor enim pulvinar.
              </Typography>
              <Typography variant='h5' color='#0F0E36'>
                10d 20h 40m
              </Typography>
            </Box>
            <Typography variant='body1' color='#0F0E36' className={classes.comingMark}>
              New
            </Typography>
          </Box>
        </CustomContainer>
      </Box>
    </Box>
  )
}

export default Blog
