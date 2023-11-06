import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext } from 'react';
import { Avatar } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from 'react'
import { getAvatar } from '../utility/uploadFile';

const pages = [
    {path:'/', name:'Home'},
    {path:'/about', name:'About'},
];

const settings=[
  {path:'/profile', name:'Profile'},
  {path:'/logout', name:'Logout'},
]
export const Navbar=({avatar,setAvatar})=> {
  const { user, logoutUser,role } = useContext(UserContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [navPages, setNavPages] = useState(pages);
  const navigate=useNavigate()

  useEffect(()=>{
    setAvatar(null)
    if(user){
    setNavPages(prev=>[...prev,{path:'/create', name:'Create Blog'}])
    getAvatar(user?.uid,setAvatar)
    role=='admin' && setNavPages(prev =>[...prev,{path:'/admin', name:'Dashboard'}])

    }else{
    setNavPages([...pages])}
    },[user])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  //console.log(user);


  return (
    <AppBar position="fixed" sx={{backgroundImage:'linear-gradient(to top, #f5adc5 0%, #ffd1ff 100%)'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            className='header'
            variant="h6 small"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily:  'Pacifico, cursive',
              fontWeight: 700,
              letterSpacing: '0.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           everyday i'm bloggin'
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navPages.map((obj) => (
                <NavLink  key={obj.name} to={obj.path} className={({isActive})=>(isActive ? 'active' : '')}>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{obj.name}</Typography>
                </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <Typography
           className='header'
           variant="h6 small"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily:  'Pacifico, cursive',
              letterSpacing: '0.1rem',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            everyday i'm bloggin'

          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navPages.map((obj) => (
             <NavLink  key={obj.name} to={obj.path} className={({isActive})=>(isActive ? 'active' : '')}>

              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                {obj.name}
              </Button>
              </NavLink>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {!user ?
            <>
            <IconButton sx={{ p: 0 }}>
                <NavLink to='/signin'  className={({isActive})=>(isActive ? 'active' : '')}>
                <Typography textAlign="center" sx={{color:'white',padding:'10px',
              fontFamily:  'Pacifico, cursive',
              letterSpacing: '0rem',
              fontWeight: 700,
              textDecoration: 'none',}} >Sign in</Typography>
                </NavLink>
            </IconButton>  <IconButton sx={{ p: 0 }}>
                <NavLink to='/signup'  className={({isActive})=>(isActive ? 'active' : '')}>
                <Typography textAlign="center" sx={{color:'white',padding:'10px',  fontFamily:  'Pacifico, cursive',
              letterSpacing: '0rem',
              fontWeight: 700,
              textDecoration: 'none',}}>Sign up</Typography>
                </NavLink>
            </IconButton>
           </>
           :
           <Box sx={{ flexGrow: 0 }}>
             <IconButton sx={{p:'5px'}} onClick={handleOpenUserMenu} >
               <Avatar sx={{bgcolor:'#ffcff8'}}  title={user.email}  src={avatar} alt={user.displayName}/>
             </IconButton>
           <Menu 
             sx={{ mt: '45px' }}
             id="menu-appbar"
             anchorEl={anchorElUser}
             anchorOrigin={{
               vertical: 'top',
               horizontal: 'right',
             }}
             keepMounted
             transformOrigin={{
               vertical: 'top',
               horizontal: 'right',
             }}
             open={Boolean(anchorElUser)}
             onClose={handleCloseUserMenu}
           >
             {settings.map((setting) => (
               <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                 <Typography textAlign="center" 
                 onClick={()=>setting.name=='Logout' ? logoutUser() : navigate(setting.path)}
                 >{setting.name}</Typography>
               </MenuItem>
             ))}
           </Menu>
         </Box>
            }
            </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
