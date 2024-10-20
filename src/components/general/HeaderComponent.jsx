import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import TrainRoundedIcon from '@mui/icons-material/TrainRounded';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, logout } from '../../features/Auth/authSlice';


function HeaderComponent() {
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    React.useEffect(()=>{
      if(localStorage.getItem("access_token")!=null){
        let access_token=localStorage.getItem("access_token")
        let refresh_token=localStorage.getItem("refresh_token")
        dispatch(login({access_token,refresh_token}))
      }
    },[])


    const handleLoginClick=()=>{
        navigate("/login/")
    }

    const handleRegisterClick=()=>{
        navigate("/register/")
    }

    const handleLogoutclick=async ()=>{
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        localStorage.removeItem("isAuthenticated")
        dispatch(logout())

    }

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  return (
    <AppBar className='fixed top-0' sx={{}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <TrainRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Exchange Ticket
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
              sx={{ display: { xs: 'block', md: 'none' } }}
            >

              { isAuthenticated ? [] : [
                  <Button
                  key="login"
                    onClick={handleLoginClick}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >Login</Button>,
                  <Button
                  key="register"
                    onClick={handleRegisterClick}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >Register</Button>  
              ]

                
                
            }

            </Menu>
          </Box>
          <TrainRoundedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent : "right" , marginRight : "10px" }}>
            { isAuthenticated ? [] : [
                <Button
                key="login"
                    onClick={handleLoginClick}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >Login</Button>,
                <Button
                  key="register"
                    onClick={handleRegisterClick}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >Register</Button>
            ] }
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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
              {
                !isAuthenticated ? [] : <>
                <MenuItem onClick={handleLogoutclick}>
                  <Typography sx={{ textAlign: 'center' }}>{"My Tickets"}</Typography>
                </MenuItem>
                <MenuItem onClick={handleLogoutclick}>
                  <Typography sx={{ textAlign: 'center' }}>{"Logout"}</Typography>
                </MenuItem>
                </>
              }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default HeaderComponent;













// const HeaderComponent = () => {
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    // const dispatch = useDispatch()
    
    //     const handleClick = async () => {
        //         await dispatch(logout())
//     }


//     return (
//         <div className="fixed top-0 bg-yellow-200 w-full h-12">
//             <h1>Header</h1>
//             {isAuthenticated ? <button onClick={handleClick}>logout</button> : <></>}
//         </div>
//     )
// }

// export default HeaderComponent;