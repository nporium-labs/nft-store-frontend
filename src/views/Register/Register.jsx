import React from 'react'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom';
import { makeStyles } from "@mui/styles";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link'
import InputAdornment from '@mui/material/InputAdornment';

import CustomContainer from 'components/CustomContainer'
import CustomButton from 'components/CustomButton';
import StyledBox from 'components/StyledBox';
import TextField from 'components/CustomInput/TextField'

import styles from 'assets/jss/views/authStyles'

const useStyles = makeStyles(styles)

const Register = () => {

  const classes = useStyles()

  const navigate = useNavigate()

  return (
    <Box>
      <StyledBox className={clsx(classes.header, classes.signUpHeader)} mx='auto'>
        <CustomContainer>
          <Box display='flex' justifyContent='center' flexWrap='wrap' alignItems='center'>
            <Box>
              <Typography variant='h6' color='rgba(15,14,54,0.25)' align='center'>
                Create account
              </Typography>
              <Typography variant='h3' color="#0F0E36">
                Register.
              </Typography>
            </Box>
          </Box>
        </CustomContainer>
      </StyledBox>
      <Box className={classes.contents}>
        <CustomContainer>
          <Box className={classes.form} mx='auto'>
            <Box>
              <CustomButton fullWidth>
                <img src="/images/icons/google.png" alt="" />&nbsp;
                Sign up with Google
              </CustomButton>
            </Box>
            <Box my={4} display='flex' justifyContent='center' position='relative' className={classes.orText}>
              <Typography variant='body1' color='rgba(119, 118, 132, 0.5)'>
                or Sign up with Email
              </Typography>
            </Box>

            <Box sx={{ marginBottom: '30px' }}>
              <TextField
                label='Name'
                placeholder='John Doe'
              />
            </Box>
            <Box sx={{ marginBottom: '30px' }}>
              <TextField
                label='Email'
                placeholder='E.g. johndoe@email.com'
              />
            </Box>
            <Box sx={{ marginBottom: '30px' }}>
              <TextField
                label='Password'
                placeholder='Set your password'
                endAdornment={<InputAdornment position="end"><img src="/images/icons/iconmonstr-eye-off-lined.png" alt="" /></InputAdornment>}
              />
            </Box>
            <Box sx={{ marginBottom: '30px' }}>
              <TextField
                label='Repeat Password'
                placeholder='Repeat your password'
                endAdornment={<InputAdornment position="end"><img src="/images/icons/iconmonstr-eye-off-lined.png" alt="" /></InputAdornment>}
              />
            </Box>
            <Box display='flex' alignItems='center' justifyContent='space-between' mb={5} flexWrap='wrap'>
              <Box display='flex' alignItems='center'>
                <Checkbox />
                <Typography variant='body1' color='#777684'>
                  I’ve read and accept the &nbsp;
                  <Link href='/' sx={{ color: '#777684' }}>terms & conditions</Link>
                </Typography>
              </Box>
              <Box display='flex' alignItems='center'>
                <Checkbox />
                <Typography variant='body1' color='#777684'>
                  Subscribe to our newsletter to stay in the loop
                </Typography>
              </Box>
            </Box>

            <Box mb={5}>
              <CustomButton fullWidth className={classes.signupBtn}>
                Register
              </CustomButton>
            </Box>

            <Box>
              <Typography variant='body1' color='#777684' align='center' sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
                Already have an account?  &nbsp;
                <Link
                  href='/'
                  sx={{ color: '#0F0E36', display: 'flex', alignItems: 'center' }}
                  underline='none'
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login')
                  }}
                >
                  Login &nbsp;&nbsp;
                  <img src="/images/icons/iconmonstr-arrow-right-lined.png" alt="" />
                </Link>
              </Typography>
            </Box>
          </Box>
        </CustomContainer>
      </Box>
    </Box>
  )
}

export default Register
