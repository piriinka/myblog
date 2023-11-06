import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from '../context/UserContext';
import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';

const defaultTheme = createTheme();

export const SignIn=()=> {
  const {loginUser, msg}=useContext(UserContext)
  const navigate =useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   /* console.log({
      email: data.get('email'),
      password: data.get('password'),
    });*/
    loginUser(data.get('email'),data.get('password'))
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs" sx={{boxShadow:'0 0 15px #f5adc5'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#f5adc5' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"  sx={{color: '#f5adc5'}}>
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ color: "#f5adc5" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background:'#f5adc5', ":hover":{
                bgcolor:'#e2779b'
              }}}
            >
              Sign In
            </Button>
            <Typography sx={{color:'red', fontSize:'0.8rem',textAlign:'center',}}>{msg?.signin}</Typography>
          </Box>
        </Box>
      <Box display='grid' gridTemplateColumns='repeat(2,1fr)' >
        <Link
        className='boxlink'
         underline="hover"
          component="button"
          variant="body2"
          onClick={() => {navigate('/pwreset')}}
          sx={{color:'#f5adc5'}}
          >
        Password reset
        </Link> 
        <Link
        component="button"
        underline="hover"
        variant="body2"
        onClick={() => {
        console.info("I'm a button.");
         }}
         sx={{color:'#f5adc5'}}
          >
        Delete account
      </Link>
      </Box>
      </Container>
    </ThemeProvider>
  );
}