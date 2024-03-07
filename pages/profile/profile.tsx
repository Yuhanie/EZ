import * as React from 'react';
//firebase
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
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
import Chip from '@mui/material/Chip';
import EditIcon from '@mui/icons-material/Edit';
import { Avatar } from '@mui/material';
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
import PortfolioListItem from '../../components/portfolio/portfolioListItem';
import { useRouter } from 'next/router';

//firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const authData = auth.currentUser;




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
  // const [tags, setTags] = React.useState<string[]>([]);
  const [profile, setProfile] = useState<Profile>();
  const [collects, setCollects] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [collectOpen, setCollectOpen] = useState<boolean>(false);
  const [updated, setUpdated] = useState(0);
  const [myNotes, setMyNotes] = useState<Article[]>([]);
  const [myNotesOpen, setMyNotesOpen] = useState<boolean>(false);
  const [majorTags, setMajorTags] = React.useState<string[]>([]);
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  const [heartCount, setHeartCount] = useState(0);
  const [bookMarkCount, setBookMarkCount] = useState(0);
  const [user, setUser] = useState<any>();
  const [refresh, setRefresh] = useState<boolean>(false);
  // const [MajorTag, setMajorTag] = useState<Article[]>([]);
  const router = useRouter()
  const { userId } = router.query || ""
  //console.log("id in profile",userId)

  const updateUpdated = () => {
    setUpdated((currentValue) => currentValue + 1)
  }

  const handleChange = (event: SelectChangeEvent<typeof majorTags>) => {
    const {
      target: { value },
    } = event;
    setMajorTags(
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

          const user_Id = Array.isArray(userId) ? userId[0] : userId;
          const id = user_Id ? user_Id : user.uid;

          const querySnapshot = await getDoc(doc(db, "profile", id));


          if ((querySnapshot).exists()) {
            //console.log(doc.id, doc.data());
            setProfile({ photoURL: querySnapshot.data().photoURL, user: querySnapshot.data().user, email: querySnapshot.data().email, character: querySnapshot.data().character ? querySnapshot.data().character : "學習者", majortag: querySnapshot.data().majortag ? querySnapshot.data().majortag : [] });
            setUser(querySnapshot.data().user);
            setMajorTags(querySnapshot.data().majortag)
          } else {
            //如果沒有資料就新增
            alert("id in useEffect:" + id);
            await setDoc(doc(db, "profile", id), {
              character: "學習者",
              user: "尚未設定，請修改...",
              majortag: [],
              //少了可以設定或修改email、照片的介面
              // minitag: minitagName,
            });
            setProfile({ user: "尚未設定，請修改...", character: "學習者" });
          }


          setCurrentUser(user);

          setIsLoading(true);
          const queryCollect = await getDocs(collectOpen ? query(collection(db, "text"), where("bookmark", "array-contains", id)) : query(collection(db, "text"), where("bookmark", "array-contains", id), limit(3)));
          const tempCollect: Article[] = [];
          queryCollect.forEach((doc) => {
            tempCollect.push({
              docId: doc.id,
              content: doc.data().content,
              title: doc.data().title,
              user: doc.data().user,
              link: doc.data().link,
              userid: doc.data().userid,
              count: doc.data().count,
              heart: doc.data().heart,
              heartCount:doc.data().heartCount,
              timestamp: doc.data().timestamp,
              bookmark: doc.data().bookmark,
              bookCount:doc.data().bookCount,
              outdateCount: doc.data().outdateCount,
              outdate: doc.data().outdate,
              majortag: doc.data().majortag,
              minitag: doc.data().minitag,
              tag: doc.data().tag,
              email: doc.data().email
            });
          });
          setCollects([...tempCollect]);
          setIsLoading(false);

          setIsLoading(true);
          const queryMyNote = await getDocs(myNotesOpen ? query(collection(db, "text"), where("userid", "==", id)) : query(collection(db, "text"), where("userid", "==", id), limit(3)));
          const tempMyNote: Article[] = [];

          queryMyNote.forEach((doc) => {
            tempMyNote.push({
              docId: doc.id,
              content: doc.data().content,
              title: doc.data().title,
              user: doc.data().user,
              link: doc.data().link,
              userid: doc.data().userid,
              count: doc.data().count,
              heart: doc.data().heart,
              heartCount:doc.data().heartCount,
              timestamp: doc.data().timestamp,
              bookmark: doc.data().bookmark,
              bookCount:doc.data().bookCount,
              outdateCount: doc.data().outdateCount,
              outdate: doc.data().outdate,
              majortag: doc.data().majortag,
              minitag: doc.data().minitag,
              tag: doc.data().tag,
              email: doc.data().email
            });
          });
          setMyNotes([...tempMyNote]);
          //alert(countHeart + " " +countBookMark);

          setIsLoading(false);


          setIsLoading(true);
          const queryCountMyNote = await getDocs(query(collection(db, "text"), where("userid", "==", id)));
          // const tempCountMyNote: Article[] = [];
          let count = 0;
          let countHeart = 0;
          let countBookMark = 0;
          queryCountMyNote.forEach((doc) => {
            count++;
            countHeart += doc.data().heart.length;
            countBookMark += doc.data().bookmark.length;
            // tempCountMyNote.push({
            //   docId: doc.id,
            //   content: doc.data().content,
            //   title: doc.data().title,
            //   user: doc.data().user,
            //   link: doc.data().link,
            //   userid: doc.data().userid,
            //   count: doc.data().count,
            //   heart: doc.data().heart,
            //   timestamp: doc.data().timestamp,
            //   bookmark: doc.data().bookmark,
            //   outdateCount: doc.data().outdateCount,
            //   outdate: doc.data().outdate,
            //   majortag: doc.data().majortag,
            //   minitag: doc.data().minitag,
            //   tag: doc.data().tag,
            //   email: doc.data().email
            // });
          });
          // setMyNotes([...tempMyNote]);
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
        else {
          const u = userId ? userId : "";
          const user_Id = Array.isArray(u) ? u[0] : u;

          //alert("id in useEffect:"+id);
          const querySnapshot = await getDoc(doc(db, "profile", user_Id));


          if ((querySnapshot).exists()) {
            //console.log(doc.id, doc.data());
            setProfile({ photoURL: querySnapshot.data().photoURL, user: querySnapshot.data().user, email: querySnapshot.data().email, character: querySnapshot.data().character ? querySnapshot.data().character : "學習者", majortag: querySnapshot.data().majortag ? querySnapshot.data().majortag : [] });
            setUser(querySnapshot.data().user);
            setMajorTags(querySnapshot.data().majortag)
          } else {
            setProfile({ character: "學習者" });
          }
          setIsLoading(true);
          const queryCollect = await getDocs(collectOpen ? query(collection(db, "text"), where("bookmark", "array-contains", user_Id)) : query(collection(db, "text"), where("bookmark", "array-contains", user_Id), limit(3)));
          const tempCollect: Article[] = [];
          queryCollect.forEach((doc) => {
            tempCollect.push({
              docId: doc.id,
              content: doc.data().content,
              title: doc.data().title,
              user: doc.data().user,
              link: doc.data().link,
              userid: doc.data().userid,
              count: doc.data().count,
              heart: doc.data().heart,
              heartCount:doc.data().heartCount,
              timestamp: doc.data().timestamp,
              bookmark: doc.data().bookmark,
              bookCount:doc.data().bookCount,
              outdateCount: doc.data().outdateCount,
              outdate: doc.data().outdate,
              majortag: doc.data().majortag,
              minitag: doc.data().minitag,
              tag: doc.data().tag,
              email: doc.data().email
            });
          });
          setCollects([...tempCollect]);
          setIsLoading(false);

          setIsLoading(true);
          const queryMyNote = await getDocs(myNotesOpen ? query(collection(db, "text"), where("userid", "==", user_Id)) : query(collection(db, "text"), where("userid", "==", user_Id), limit(3)));
          const tempMyNote: Article[] = [];

          queryMyNote.forEach((doc) => {
            tempMyNote.push({
              docId: doc.id,
              content: doc.data().content,
              title: doc.data().title,
              user: doc.data().user,
              link: doc.data().link,
              userid: doc.data().userid,
              count: doc.data().count,
              heart: doc.data().heart,
              heartCount:doc.data().heartCount,
              timestamp: doc.data().timestamp,
              bookmark: doc.data().bookmark,
              bookCount:doc.data().bookCount,
              outdateCount: doc.data().outdateCount,
              outdate: doc.data().outdate,
              majortag: doc.data().majortag,
              minitag: doc.data().minitag,
              tag: doc.data().tag,
              email: doc.data().email
            });
          });
          setMyNotes([...tempMyNote]);

          setIsLoading(false);


          setIsLoading(true);
          const queryCountMyNote = await getDocs(query(collection(db, "text"), where("userid", "==", user_Id)));

          let count = 0;
          let countHeart = 0;
          let countBookMark = 0;
          queryCountMyNote.forEach((doc) => {
            count++;
            countHeart += doc.data().heart.length;
            countBookMark += doc.data().bookmark.length;

          });

          setCount(count);
          setHeartCount(countHeart);
          setBookMarkCount(countBookMark);


          setIsLoading(false);


        }
      });



      return () => {
        unsub();
      }
    }
    readData();
  }, [myNotesOpen, collectOpen,refresh]);

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
  const update = async function () {
    // if (title == "" || content == "" || tagName == "" || link == "" || majortagName == "") {
    //   return (false);
    // }
    // const db = getFirestore();
    console.log("update")
    try {
      // if (!articleId) {
      //   const docRef = await addDoc(collection(db, "text"), {
      //     title,
      //     content,
      //     userid: user.uid,
      //     email: user.email,
      //     tag: tagName,
      //     user: user.displayName,
      //     heart: [],
      //     bookmark: [],
      //     count: 1,
      //     report: false,
      //     link,
      //     outdate: "solved",
      //     outdateCount: [],
      //     timestamp: serverTimestamp(),
      //     minitag: [],
      //     majortag: majortagName,
      //   });
      //   // console.log(docRef.id);
      // }
      // else {
      console.log("majorTags:", majorTags)
      if (currentUser) {
        await updateDoc(doc(db, "profile", currentUser.uid), {
          user: user,
          majortag: majorTags,
          // minitag: minitagName,
        });
        // alert("成功")

        updateProfile(user && authData, {
          displayName: user
        });
        
        // setRefresh((prev) => !prev);
        window.location.reload();
      }

    }
    catch (e) {
      console.log(e);
    }
    router.push('/profile');
  }




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

  const profileEdited = () => {
    return (
      <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
        <EditIcon
          style={{
            color: "#7A82E7",
          }}

        />
      </IconButton>
    );
  };

  const renderPortfolio = (collect: Article, i: number) => {
    return (
      <PortfolioListItem key={collect.docId} article={collect} update={updateUpdated}></PortfolioListItem>
    );

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

  // console.log("profile:", profile);
  const renderMajorTagTest = () => {
    return (
      <Box>
        {profile && <MajorTagList MajorTag={profile} />}
      </Box>

    );
  };



  return (
    <>
      <div>
        <Head>
          <title>My Zone</title>
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

                {/* Edit Profile */}
                <Box>
                  {!userId && profileEdited()}
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
                              // defaultValue={currentUser?.displayName}
                              defaultValue={user}
                              onChange={(e) => setUser(e.target.value)}
                            />

                          </FormControl>
                        </Box>

                        <Box display="flex" alignItems="center">
                          <Typography sx={{ minWidth: 100 }}>興趣標籤</Typography>
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <Select
                              labelId="demo-multiple-chip-label"
                              id="demo-multiple-chip"
                              multiple
                              value={majorTags}
                              onChange={handleChange}
                              // onChange={(e) => setUser(e.target.value)}
                              input={<OutlinedInput id="select-multiple-chip" />}
                              // renderValue={(selected) => (
                              //   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                              //     {selected.map((value) => (
                              //       <Chip key={value} label={value} />
                              //     ))}
                              //   </Box>
                              // )}
                              MenuProps={MenuProps}
                            >
                              <MenuItem value="Java">Java</MenuItem>
                              <MenuItem value="Python">Python</MenuItem>
                              <MenuItem value="React">React</MenuItem>
                              <MenuItem value="Next">Next</MenuItem>
                              <MenuItem value="HTML">HTML</MenuItem>
                              <MenuItem value="PHP">PHP</MenuItem>
                              <MenuItem value="MySQL">MySQL</MenuItem>
                              <MenuItem value="Firebase">Firebase</MenuItem>
                              <MenuItem value="SA">SA</MenuItem>
                              <MenuItem value="會計">會計</MenuItem>
                              <MenuItem value="統計">統計</MenuItem>
                              <MenuItem value="作業系統">作業系統</MenuItem>
                              <MenuItem value="網路行銷">網路行銷</MenuItem>
                              <MenuItem value="生產與作業管理">生產與作業管理</MenuItem>
                              <MenuItem value="其他">其他</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>

                        <Box display="flex" alignItems="center" sx={{ m: 0.2 }}>
                          <Typography sx={{ minWidth: 50 }}>角色</Typography>
                          <Chip label={profile?.character} />
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
                      <Button onClick={(e) => { update() }}>確認</Button>
                    </DialogActions>
                  </Dialog>

                </Box>
              </Box>


              <Divider />

              <Box display="flex" p={2} flexWrap="wrap">
                <Grid bgcolor={'#ffffff'} display="flex" flexDirection="row" flexWrap="wrap"  >
                  <Box display="flex" flexDirection="column" sx={{ p: 2, minWidth: 300, maxWidth: 345 }} >
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
                        <Box display="flex" justifyContent="center" width="100%" sx={{ mt: 1 }}>
                          <Chip label={(profile?.character ? profile?.character : "學習者")} />
                        </Box>
                      </Box>
                      <Box>
                        <Typography pt={0.8} fontSize={25} flexWrap="wrap">{profile?.user}</Typography>
                        <Typography fontSize={12} flexWrap="wrap">{profile?.email}</Typography>
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
                          興趣標籤
                        </Typography>
                        <Stack direction="row" >
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
                        <Typography display="flex" sx={{ fontSize: 20, justifyContent: "center" }}>
                          {count}
                        </Typography>
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
                        <Typography display="flex" sx={{ fontSize: 20, justifyContent: "center" }}>
                          {bookMarkCount}
                        </Typography>
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
                        <Typography display="flex" sx={{ fontSize: 20, justifyContent: "center" }}>
                          {heartCount}
                        </Typography>
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

              {/* {majorTags.map(renderMajorTagTest)} */}


            </Box>
          </Card>
        </Container>
      </div >

    </>





  );
}

export default Profile;