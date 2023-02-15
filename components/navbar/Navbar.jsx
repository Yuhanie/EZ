import React, { useState } from 'react';
import Image from 'next/image';
import ezlogo from '../../public/pic/ezlogo.png';
import PropTypes from 'prop-types';


//mui的各種import
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import useScrollTrigger from '@mui/material/useScrollTrigger';
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
import NavItem from "./NavItem";

//登出功能
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from "next/router"
import { firebaseConfig } from 'settings/firebaseConfig';


//色調
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#7A82E7',
    },
    text: {
      secondary: '#E2655E',
    },
  },
});


//把appbar固定在最上方(未完成)
function ElevationScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};



//appbar排版
const pages = [
  // '筆記分享區', '問答區',
  { text: '筆記分享區', href: "/" },
  { text: '問答區', href: "" }
];
const settings = [
  { text: '我的角色', href: "/profile" },
  { text: '登出', href: "../logout" },
  { text: '登入(之後會刪掉)', href: "/login" },
];


//登出功能
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const Logout = () => {
  const router = useRouter();
  const logout = async function () {
    const auth = getAuth();
    await signOut(auth);
    if (typeof window !== "undefined") { alert("已登出") }
    //window.alert("已登出");
    router.push('/');
  };

  return (<div><Button onClick={logout}>登出</Button></div>)
}





function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);


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
    <ThemeProvider theme={lightTheme}>
      < AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters >
            {/* 手機排版 */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
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
              <Image
                width={150}
                height={60}
                src={ezlogo} />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
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
                {pages.map((page, idx) => (
                  <MenuItem
                    key={page}
                    onClick={() => {
                      handleCloseUserMenu;
                      setActiveIdx(idx);
                      setNavActive(false);
                    }}
                  >
                    <Typography textAlign="center">
                      <span className={`${navActive ? "active" : ""} `}>
                        <NavItem active={activeIdx === idx} {...page} />
                      </span>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* 網頁排版 */}
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
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

              <Image
                width={100}
                height={40}
                src={ezlogo} />
            </Typography>

            {/* 登入前 */}
            <Box>
              <Button variant="text">登入</Button>
            </Box>

            {/* 登入後 */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page, idx) => (
                <Button
                  key={page}
                  onClick={() => {
                    handleCloseUserMenu;
                    setActiveIdx(idx);
                    setNavActive(false);
                  }}
                  sx={{ my: 2, color: 'black', display: 'block' }}
                >
                  <Typography textAlign="center">
                    <span className={`${navActive ? "active" : ""} `}>
                      <NavItem active={activeIdx === idx} {...page} />
                    </span>
                  </Typography>
                </Button>
              ))}
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

                {settings.map((setting, idx) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu;
                      setActiveIdx(idx);
                      setNavActive(false);
                    }}
                  >
                    <Typography textAlign="center">
                      <span className={`${navActive ? "active" : ""} `}>
                        <NavItem active={activeIdx === idx} {...setting} />
                      </span>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

          </Toolbar>
        </Container>
      </AppBar >
    </ThemeProvider>
  );
}
export default ResponsiveAppBar;