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

const defaultTheme = createTheme();

export const SignUp=()=> {
  const {signUpUser, user, msg}=useContext(UserContext)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
   /* console.log({
      email: data.get('email'),
      password: data.get('password'),
    });*/
    signUpUser(data.get('email'),data.get('password'),data.get('displayName'))
  };
console.log(user);
  return (
  <div className='signupContainer'>
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
          <Avatar sx={{ m: 1, bgcolor: '#f5adc5',
}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5"  sx={{color: '#f5adc5'}}>
            Sign up
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="displayName"
              label="Username"
              name="displayName"
              type="text"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background:'#f5adc5', ":hover":{
                bgcolor:'#e2779b'
              }}}>
              Sign up
            </Button>
            <Typography sx={{color:'red', fontSize:'0.8rem',textAlign:'center',}}>{msg?.signup}</Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider></div>
  );
}