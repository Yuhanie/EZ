import * as React from 'react';
//firebase
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseConfig } from '../../settings/firebaseConfig';
import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { Profile, BookMark, Article, Tag, miniTag, MajorTag } from 'interfaces/entities';
import Collect from '../../components/collect/Collect';
import styles from '../../styles/Home.module.css';
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

import MajorTagList from '../../components/tag/MajorTagList';

import ArticleListItem from '../../components/article/ArticleListItem';
import { useRouter } from 'next/router';

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

type Props = {
  article: Article;
  update: Function;
};

const Profile: React.FC<Props> = (props) => {
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
  const [myNotes, setMyNotes] = useState<Article[]>([]);
  const [myNotesOpen, setMyNotesOpen] = useState<boolean>(false);
  const [majorTags, setMajorTags] = useState<Profile[]>([]);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [heartCount, setHeartCount] = useState(0);
  const [bookMarkCount, setBookMarkCount] = useState(0);
  // const [MajorTag, setMajorTag] = useState<Article[]>([]);
  const router = useRouter()
  const { userId } = router.query || ""
  console.log("id in profile", userId)

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

          // const examMajorTag = collection(db, "profile");
          // const queryExam = query(examMajorTag);
          // const querySnapTag = await getDocs(queryExam);
          // const temp2: Profile[] = [];
          // querySnapTag.forEach((doc) => {
          //   temp2.push({majortag: doc.data().majortag});

          //    console.log("MMMMMMM", temp2);
          // });
          // setMajorTags([...temp2]);

          const user_Id = Array.isArray(userId) ? userId[0] : userId;
          const id = user_Id ? user_Id : user.uid;

          alert("id in useEffect:" + id);
          const querySnapshot = await getDoc(doc(db, "profile", id));

          if ((querySnapshot).exists()) {

            //console.log(doc.id, doc.data());
            setProfile({ photoURL: querySnapshot.data().photoURL, user: querySnapshot.data().user, email: querySnapshot.data().email, character: querySnapshot.data().character ? querySnapshot.data().character : "學習者", majortag: querySnapshot.data().majortag ? querySnapshot.data().majortag : [] });
          } else {
            setProfile({ character: "學習者" });
          }


          setCurrentUser(user);

          setIsLoading(true);
          const queryCollect = await getDocs(collectOpen ? query(collection(db, "text"), where("bookmark", "array-contains", id)) : query(collection(db, "text"), where("bookmark", "array-contains", id), limit(3)));
          const tempCollect: Article[] = [];
          queryCollect.forEach((doc) => {
            tempCollect.push({ docId: doc.id, content: doc.data().content, title: doc.data().title, user: doc.data().user, link: doc.data().link, userid: doc.data().userid, count: doc.data().count, heart: doc.data().heart, timestamp: doc.data().timestamp, bookmark: doc.data().bookmark, outdateCount: doc.data().outdateCount, outdate: doc.data().outdate });
          });
          setCollects([...tempCollect]);
          setIsLoading(false);

          setIsLoading(true);
          const queryMyNote = await getDocs(myNotesOpen ? query(collection(db, "text"), where("userid", "==", id)) : query(collection(db, "text"), where("userid", "==", id), limit(3)));
          const tempMyNote: Article[] = [];
          let count = 0;
          let countHeart = 0;
          let countBookMark = 0;
          queryMyNote.forEach((doc) => {
            count++;
            countHeart += doc.data().heart.length;
            countBookMark += doc.data().bookmark.length;

            tempMyNote.push({ docId: doc.id, content: doc.data().content, title: doc.data().title, user: doc.data().user, link: doc.data().link, userid: doc.data().userid, count: doc.data().count, heart: doc.data().heart, timestamp: doc.data().timestamp, bookmark: doc.data().bookmark, outdateCount: doc.data().outdateCount, outdate: doc.data().outdate });
          });
          setMyNotes([...tempMyNote]);
          setCount(count);
          setHeartCount(countHeart);
          setBookMarkCount(countBookMark);
          //alert(countHeart + " " +countBookMark);

          setIsLoading(false);

          //     setIsLoading(true);
          //     const queryMajorTag = await getDocs(query(collection(db, "Profile"),where("userid", "==", "CQhhg7JfKZYCqopukFu11zzTZcG3")));
          //     const temp3: Profile[] = [];
          //     queryMajorTag.forEach(async (doc) => {
          //   temp3.push({ majortag: doc.data().majortag });
          // });
          //     setMajorTag([...temp3]);
          //     setIsLoading(false);
        }
      });



      return () => {
        unsub();
      }
    }
    readData();
  }, [myNotesOpen, collectOpen]);

  // const heart = async function () {
  //   if (typeof window !== "undefined") {
  //     if (currentUser) {
  //       const ref = doc(db, "text", props.article.docId);
  //       const docSnap = await getDoc(ref);
  //       if ((docSnap.exists())) {
  //         if (docSnap.data().heart.includes(currentUser.uid)) {
  //           // alert('remove')

  //           setLiked(false)
  //           setCount(count - 1)
  //         } else {
  //           // alert('added')

  //           };
  //           setLiked(true)
  //           setCount(count + 1)
  //         }
  //       }
  //     }
  //   }


  const more = async function (status: string) {
    if (typeof window !== "undefined") {
      if (currentUser) {
        if (status == "moreNotes") {
          setMyNotesOpen((currentValue) => !currentValue)
        }
        if (status == "moreCollects") {
          setCollectOpen((currentValue) => !currentValue)
        }
      }
    } else {
      alert("請登入");
    }
  };

  const renderCollect = (collect: Article, i: number) => {
    return (
      <ArticleListItem key={collect.docId} article={collect} update={updateUpdated}></ArticleListItem>
    );

  };

  const renderMyNote = (myNotes: Article, i: number) => {
    return (
      <ArticleListItem key={myNotes.docId} article={myNotes} update={updateUpdated}></ArticleListItem>
    );
  };

  // const renderMajorTag = () => {
  //   return (
  //     <>


  //     <Box>
  //       {profile&&<MajorTagList MajorTag={profile}/>}
  //     </Box>
  //     </>
  //   );
  // };
  console.log("profile:", profile);
  const renderMajorTagTest = () => {
    return (
      <>
        <Box>
          {profile && <MajorTagList MajorTag={profile} />}
        </Box>
      </>
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
                          {/* <Button variant="contained" color="secondary" size='small' sx={{ m: 1 }}>升級</Button> */}
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
                          {/* <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 4 }}>
                              <ListItemIcon>
                                <FaceIcon />
                              </ListItemIcon>
                              <ListItemText primary="業界" />
                            </ListItemButton>
                          </List> */}
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
                  <Box display="flex" flexDirection="column" sx={{ p: 2, minWidth: 300, maxWidth: 345 }} bgcolor={'#fafafa'} >
                    <Box display="flex">
                      <Box display="flex" flexDirection="column" sx={{ pr: 3 }}>
                        {userId && profile && profile.photoURL ?
                          <img className={styles.googlephoto_profile} src={profile.photoURL} /> :
                          !userId && currentUser && currentUser.photoURL ?
                            <img className={styles.googlephoto_profile} src={currentUser.photoURL} /> :
                            <Avatar sx={{
                              width: 70,
                              height: 70,
                              mb: 1,
                            }} />}



                        {/* <Avatar
                        g04
                        >

                        </Avatar> */}
                        {/* <img  className={styles.googlephoto} src={currentUser?.photoURL}/> */}

                        <Chip label={profile ? (profile.character ? profile.character : "學習者") : "未登入"} />
                      </Box>
                      <Box>
                        <Typography pt={0.8} fontSize={25} >{profile ? profile.user : "未登入"}</Typography>
                        <Typography fontSize={12}>{profile ? profile.email : "未登入"}</Typography>
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
                          {/* <Chip label="tag 1" component="a" href="#chip" />
                          <Chip label="tag 2" component="a" href="#chip" />
                          <Chip label="tag 3" component="a" href="#chip" /> */}
                          {renderMajorTagTest()}
                          {/* {Profile.map(renderMajorTag)} */}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid >
                    <Card sx={{ m: 2, width: 120, height: 100 }}>
                      {/* <Card sx={{ minWidth: 275 }}> */}
                      <CardContent>
                        <Typography sx={{ fontSize: 15, textAlign: 'center' }} color="text.secondary" gutterBottom>
                          發布筆記
                        </Typography>
                        {count}
                        <Stack direction="row" spacing={1}>
                          {/* <Chip label="tag 1" component="a" href="#chip" />
                          <Chip label="tag 2" component="a" href="#chip" />
                          <Chip label="tag 3" component="a" href="#chip" /> */}
                          {/* {MajorTag.map(renderMajorTag)} */}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid >
                    <Card sx={{ m: 2, width: 120, height: 100 }}>
                      {/* <Card sx={{ minWidth: 275 }}> */}
                      <CardContent>
                        <Typography sx={{ fontSize: 15, textAlign: 'center' }} color="text.secondary" gutterBottom>
                          文章被收藏
                        </Typography>
                        {bookMarkCount}
                        <Stack direction="row" spacing={1}>
                          {/* <Chip label="tag 1" component="a" href="#chip" />
                          <Chip label="tag 2" component="a" href="#chip" />
                          <Chip label="tag 3" component="a" href="#chip" /> */}
                          {/* {MajorTag.map(renderMajorTag)} */}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid >
                    <Card sx={{ m: 2, width: 120, height: 100 }}>
                      {/* <Card sx={{ minWidth: 275 }}> */}
                      <CardContent>
                        <Typography sx={{ fontSize: 15, textAlign: 'center' }} color="text.secondary" gutterBottom>
                          文章被按讚
                        </Typography>
                        {heartCount}
                        <Stack direction="row" spacing={1}>
                          {/* <Chip label={heartCount}></Chip> */}
                          {/* <Chip label="tag 1" component="a" href="#chip" />
                          <Chip label="tag 2" component="a" href="#chip" />
                          <Chip label="tag 3" component="a" href="#chip" /> */}
                          {/* {MajorTag.map(renderMajorTag)} */}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              <Divider />

              <Box display="flex" p={2} flexWrap="wrap">
                <Grid bgcolor={'#ffffff'} display="flex" flexDirection="row" flexWrap="wrap"  >
                  <Grid container item>
                    <Chip label="我的收藏" />
                    <Button variant="contained" color="secondary" size='small' sx={{ ml: 2 }} onClick={() => { more("moreCollects") }}>查看更多</Button>
                  </Grid>

                  <Box display="flex" flexWrap="wrap">
                    {collects.map(renderCollect)}
                  </Box>
                </Grid>

              </Box>

              <Divider />

              <Box display="flex" p={2} flexWrap="wrap">

                <Grid bgcolor={'#ffffff'} display="flex" flexDirection="row" flexWrap="wrap"  >
                  <Grid container item>
                    <Chip label="我的筆記" />
                    <Button variant="contained" color="secondary" size='small' sx={{ ml: 2 }} onClick={() => { more("moreNotes") }}>查看更多</Button>
                  </Grid>
                  <Box display="flex" flexWrap="wrap">
                    {myNotes.map(renderMyNote)}
                  </Box>

                </Grid>
              </Box>


              {majorTags.map(renderMajorTagTest)}


            </Box>
          </Card>
        </Container>
      </div>

    </>





  );
}

export default Profile;