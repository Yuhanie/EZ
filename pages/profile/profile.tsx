import * as React from 'react';
//firebase
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseConfig } from '../../settings/firebaseConfig';
import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { Profile, BookMark, Article, Tag, miniTag } from 'interfaces/entities';
import Collect from '../../components/collect/Collect';
//mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navbar from '../../components/navbar/Navbar';
import Head from 'next/head';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar } from '@mui/material';
import { createTheme } from '@material-ui/core/styles';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import FaceIcon from '@mui/icons-material/Face';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import CircularProgress from "@mui/material";

import ArticleListItem from '../../components/article/ArticleListItem';

//firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();


//chip的style
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

//edit_chip_select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'cpp',
  'Java',
  'react',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const Profile = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [open, setOpen] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(true);
  const theme = useTheme();
  const [tags, setTags] = React.useState<string[]>([]);
  const [profile, setProfile] = useState<Profile>();
  const [collects, setCollects] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [collectOpen, setCollectOpen] = useState<boolean>(false);
  const [updated, setUpdated] = useState(0);
  // const [bookmark, setBookmark] = useState<Bookmark[]>([]);

  const updateUpdated = () => {
    setUpdated((currentValue) => currentValue + 1)
  }

  const handleChange = (event: SelectChangeEvent<typeof tags>) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    setOpenDrawer(!openDrawer);
  };

  useEffect(() => {
    async function readData() {
      //var temp: Profile;
      // if (currentUser) {
      //   const querySnapshot = await getDoc(doc(db, "profile", currentUser.uid));
      //   if (querySnapshot.exists()) {
      //     //console.log(doc.id, doc.data());
      //     setProfile({ character: querySnapshot.data().character });
      //   };
      // }
      const unsub = onAuthStateChanged(auth, async (user) => {
        if (user) {
          const querySnapshot = await getDoc(doc(db, "profile", user.uid));
          if ((querySnapshot).exists()) {
            //console.log(doc.id, doc.data());
            setProfile({ character: querySnapshot.data().character ? querySnapshot.data().character : "學習者" });
          };
          console.log('currentUser', user)
          setCurrentUser(user);

          setIsLoading(true);
          const queryCollect = await getDocs(query(collection(db, "text"), where("bookmark", "array-contains", user.uid)));
          const tempCollect: Article[] = [];
          queryCollect.forEach((doc) => {
            tempCollect.push({ docId: doc.id, content: doc.data().content, title: doc.data().title, user: doc.data().user, link: doc.data().link, userid: doc.data().userid, count: doc.data().count, heart: doc.data().heart, timestamp: doc.data().timestamp, bookmark: doc.data().bookmark, outdateCount: doc.data().outdateCount, outdate: doc.data().outdate });
          });
          setCollects([...tempCollect]);
          setIsLoading(false);
        }
      });



      return () => {
        unsub();
      }
    }
    readData();
  }, []);

  const renderCollect = (collect: Article, i: number) => {
    return (
      <Collect key={collect.docId} article={collect} update={updateUpdated}></Collect>
    );

  };



  return (
    <>
      <div>
        <Head>
          <title>我的角色</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>


      <Navbar />
      <div>
        <Container >
          <Toolbar />
          <br />
          <Card>

            <Box sx={{ bgcolor: '#ffffff' }}>
              {/* <Box sx={{ bgcolor: '#BCD4DE', height: '100vh', }}> */}
              <Box display="flex" flexDirection="row" justifyContent="space-between" p={1.5}>
                <Typography fontSize={20}>個人資料</Typography>

                <Box>
                  <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
                    <EditIcon
                      style={{
                        color: "#7A82E7",
                      }}

                    />
                  </IconButton>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>編輯個人檔案</DialogTitle>
                    <DialogContent>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',

                        }}
                      >
                        <Box display="flex" alignItems="center">
                          <Typography sx={{ minWidth: 100 }}>使用者名稱</Typography>
                          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <OutlinedInput
                              aria-describedby="outlined-weight-helper-text"
                              inputProps={{
                                'aria-label': 'weight',
                              }}
                              required
                              id="outlined-required"
                              defaultValue={currentUser?.displayName}
                            />

                          </FormControl>
                        </Box>

                        <Box display="flex" alignItems="center">
                          <Typography sx={{ minWidth: 100 }}>擅長領域</Typography>
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              multiple
                              value={tags}
                              onChange={handleChange}
                              input={<OutlinedInput id="select-multiple-chip" />}
                              renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                            >
                              {names.map((name) => (
                                <MenuItem
                                  key={name}
                                  value={name}
                                  style={getStyles(name, tags, theme)}
                                >
                                  {name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>

                        <Box display="flex" alignItems="center" sx={{ m: 0.2 }}>
                          <Typography sx={{ minWidth: 50 }}>角色</Typography>
                          <Chip label="學習者" />
                          <Button variant="contained" color="secondary" size='small' sx={{ m: 1 }}>升級</Button>
                        </Box>

                        <ListItemButton onClick={handleClick}>
                          <ListItemIcon>
                            <HelpOutlineOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText primary="角色說明" />
                          {openDrawer ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={openDrawer} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemIcon>
                                <LocalLibraryRoundedIcon />
                              </ListItemIcon>
                              <ListItemText primary="學習者" />
                            </ListItemButton>
                          </List>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemIcon>
                                <SchoolIcon />
                              </ListItemIcon>
                              <ListItemText primary="專家" />
                            </ListItemButton>
                          </List>
                          <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemIcon>
                                <FaceIcon />
                              </ListItemIcon>
                              <ListItemText primary="業界" />
                            </ListItemButton>
                          </List>
                        </Collapse>

                      </Box>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>取消</Button>
                      <Button onClick={handleClose}>確認</Button>
                    </DialogActions>
                  </Dialog>

                </Box>
              </Box>


              <Divider />

              <Box display="flex" p={2} flexWrap="wrap">
                <Grid bgcolor={'#ffffff'} display="flex" flexDirection="row" flexWrap="wrap"  >
                  <Box display="flex" flexDirection="column" sx={{ p: 2, width: 300 }} bgcolor={'#fafafa'} >
                    <Box display="flex">
                      <Box display="flex" flexDirection="column" sx={{ pr: 3 }}>
                        <Avatar
                          sx={{
                            width: 70,
                            height: 70,
                            mb: 1,
                          }}
                        >
                        </Avatar>
                        <Chip label={profile ? (profile.character ? profile.character : "學習者") : "學習者"} />
                      </Box>
                      <Box>
                        <Typography pt={0.8} fontSize={25} >{currentUser ? currentUser.displayName : "未登入"}</Typography>
                        <Typography fontSize={12}>{currentUser ? currentUser.email : "未登入"}</Typography>
                        {/* <Stack direction="row" spacing={1}>
                          <IconButton aria-label="linkin" color="secondary">
                            <SvgIcon>
                              <path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
                            </SvgIcon>

                          </IconButton>
                          <IconButton aria-label="ig" color="success">
                            <SvgIcon>
                              <path fill="url(#b)" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6.5A2.503 2.503 0 0 1 5.5 8c0-1.379 1.122-2.5 2.5-2.5s2.5 1.121 2.5 2.5c0 1.378-1.122 2.5-2.5 2.5z"/>
                            </SvgIcon>

                          </IconButton>
                        </Stack> */}

                      </Box>
                    </Box>

                  </Box>


                  <Grid >
                    <Card sx={{ m: 2, width: 300 }}>
                      {/* <Card sx={{ minWidth: 275 }}> */}
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          擅長領域
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Chip label="tag 1" component="a" href="#chip" />
                          <Chip label="tag 2" component="a" href="#chip" />
                          <Chip label="tag 3" component="a" href="#chip" />
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              {/* <Card sx={{ m: 2, width: 300 }}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          收藏文章
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid> */}


              <Divider />

              <Box display="flex" p={2} flexWrap="wrap">
                <Grid bgcolor={'#ffffff'} display="flex" flexDirection="row" flexWrap="wrap"  >
                  <Chip label="我的收藏" />

                  <div>
                    {collects.map(renderCollect)}
                  </div>

                </Grid>
              </Box>





            </Box>
          </Card>
        </Container>
      </div>

    </>





  );
}

export default Profile;