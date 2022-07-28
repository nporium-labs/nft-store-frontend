import React from 'react'
import { makeStyles } from "@mui/styles";

import CloseIcon from '@mui/icons-material/Close';

import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link'
import Button from '@mui/material/Button';

import styles from 'assets/jss/components/sidebarStyles'

const useStyles = makeStyles(styles)

const Sidebar = (props) => {

  const { open, handleClose } = props

  const classes = useStyles()

  return (
    <Drawer
      anchor='left'
      open={open}
      onClose={handleClose}
    >
      <Box className={classes.wrapper}>
        <Box textAlign='right' p={2}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ color: '#0F0E36' }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box display='block' p={2}>
          <Link href='/' className={classes.link} underline='none'>
            Explore
          </Link>
          <Link href='/' className={classes.link} underline='none'>
            Collections
          </Link>
          <Link href='/' className={classes.link} underline='none'>
            Creators
          </Link>
          <Link href='/' className={classes.link} underline='none'>
            About
          </Link>
          <Button variant='outlined' className={classes.loginBtn}>
            Login/Register
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default Sidebar
