import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from '../context/UserContext';
import { useContext } from "react"
import { useNavigate } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';

const defaultTheme = createTheme();

export const PwReset=()=> {
  const {resetPassword}=useContext(UserContext)
  const navigate =useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get('email'));
   resetPassword(data.get('email'))
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
            <KeyIcon />
          </Avatar>
          <Typography component="h1" variant="h5"  sx={{color: '#f5adc5'}}>
            Reset Password
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
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, background:'#f5adc5', ":hover":{
                bgcolor:'#e2779b'
              }}}
            >
              Reset my password!
            </Button>
          </Box>
        </Box>
    
      </Container>
    </ThemeProvider>
  );
}