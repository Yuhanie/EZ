import React, { useState } from "react";
import Image from "next/image";
import ezlogo from "../../public/pic/ezlogo.png";
import PropTypes from "prop-types";
import styles from '../../styles/Home.module.css';
//mui的各種import
import { ThemeProvider, createTheme, ThemeOptions } from "@mui/material/styles";
import { purple } from "@mui/material/colors";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NavItem from "./NavItem";
import { useEffect } from "react";
import { setDoc, doc, getDocs, getDoc, getFirestore } from "firebase/firestore";

//登出功能
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged, } from "firebase/auth";
import { useRouter } from "next/router";
import { firebaseConfig, } from "settings/firebaseConfig";

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth();
const db = getFirestore();


//色調
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#7A82E7",
    },
    text: {
      secondary: "#E2655E",
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
  { text: "首頁", href: "/" },
  { text: "資訊分享區", href: "/note" },
  // { text: "許願池", href: "/wishingPool" },
  // { text: "問答區", href: "" },

];
const settings = [
  //  { text: "我的角色", href: "/profile" },
  // { text: "登出", href: "../logout" },
];







function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [navActive, setNavActive] = useState(null);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [currentUser, setCurrentUser] = useState();
  const [logged, setLogged] = useState(false);
  const [photoURL, setPhotoURL] = useState();
  const [character, setCharacter] = useState("學習者");


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

  //logout
  const router = useRouter();

  const logout = async function () {
    // alert("logout")
    const auth = getAuth();
    await signOut(auth);
    if (typeof window !== "undefined") {
      alert("已登出");
      setLogged(true);
    }
    router.push('/');
  };

  //profile
  const profile = async function () {
    // const auth = getAuth();
    console.log("profile")
    // alert("請稍候...")
    router.push("/profile");
  };
  const expert = () => {
    return (
      <Button variant="variant" href="/expert" sx={{ color: "black", display: "block", fontSize: 16, textAlign: "left",p:0 }}>
          審查筆記
      </Button >
    )


  };

  //確認是否logged
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      // console.log("useEffect in Navbar")
      setCurrentUser(user);
      if (user) {
        const ref = doc(db, "profile", user.uid);
        const docSnap = await getDoc(ref);
        if (
          docSnap.exists() &&
          docSnap.data().character &&
          docSnap.data().character === "專家"
        ) {
          setCharacter("專家");
        } else {
          setCharacter("學習者");
        }
        setLogged(false)
        if (user.photoURL) {
          setPhotoURL(user.photoURL)
        }
      }
      else {
        setLogged(true)
      }

      // console.log("user in navbar",user);
    });

    return () => {
      unsub();
    }
  }, []);

  //登入按鈕
  const LoginBtn = () => {
    return (
      <Box sx={{ pr: 2 }}>
        <Button variant="contained" color="secondary" href="/login">
          登入
        </Button>
      </Box>
    )
  }

  //人頭
  const Other = () => {

    return (
      <Box>
        <Tooltip title="查看更多">
          <IconButton onClick={handleOpenUserMenu}>
            {photoURL ?
              <img className={styles.googlephoto_nav} src={currentUser?.photoURL} /> : <Avatar />
            }
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "51px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting, idx) => (
            <MenuItem
              key={setting.text}
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
          <MenuItem onClick={profile}>
            <Typography>
              My Zone
            </Typography>
          </MenuItem>
          <MenuItem onClick={logout}>
            <Typography>
              登出
            </Typography>
          </MenuItem>

        </Menu>
      </Box>
    )
  }




  return (
    <ThemeProvider theme={lightTheme}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* 手機排版 */}
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Image alt="ezlogo" width={150} height={60} src={ezlogo} />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page, idx) => (
                  <MenuItem
                    key={page.text}
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
                {/* <MenuItem>
                  <Typography>
                    問答區
                  </Typography>
                </MenuItem> */}
                
                <MenuItem>
                  <Button variant="variant" href="/wishingPool" sx={{ color: "black", display: "block", fontSize: 16, textAlign: "left",p:0 }}>
                    <Typography>
                      許願池
                    </Typography>
                  </Button>
                </MenuItem>

                <MenuItem>
                  {character == "專家" && expert()}
                </MenuItem>

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
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Image alt="exlogo" width={100} height={40} src={ezlogo} />
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page, idx) => (
                <Button
                  key={page.text}
                  onClick={() => {
                    handleCloseUserMenu;
                    setActiveIdx(idx);
                    setNavActive(false);
                  }}
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  <Typography textAlign="center">
                    <span className={`${navActive ? "active" : ""} `}>
                      <NavItem active={activeIdx === idx} {...page} />
                    </span>
                  </Typography>
                </Button>
              ))}

              {/* <Tooltip title="即將登場！">
                <Button sx={{ my: 2, color: "black", display: "block" }}>
                  <Typography>
                    問答區
                  </Typography>
                </Button>

              </Tooltip> */}
              <Box sx={{ my: 2, color: "black", display: "block" }}>
                <Button variant="variant" href="/wishingPool" sx={{ color: "black", display: "block", fontSize: 16, textAlign: "left" }}>
                  <Typography>
                    許願池
                  </Typography>
                </Button>
              </Box>
              <Box sx={{ my: 2, color: "black", display: "block" }}>
                <Typography>
                  {character == "專家" && expert()}
                </Typography>
              </Box>

            </Box>


            {/* 登入前後後 */}
            <Box sx={{ flexGrow: 0 }}>
              {logged ? <LoginBtn /> : Other()}
            </Box>


          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider >
  );
}
export default ResponsiveAppBar;
