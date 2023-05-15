import { useState, useEffect, Component } from "react";
import { initializeApp, getApp, getApps, FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc, doc, Timestamp, getDoc } from "firebase/firestore";
import { updateDoc, serverTimestamp } from "firebase/firestore";
import { firebaseConfig } from '../settings/firebaseConfig';
import { query, orderBy, limit } from "firebase/firestore";
import { Container, AppBar, Box, Toolbar, IconButton, Typography, Button, InputBase, Card, CardActions } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import Navbar from "../components/navbar/Navbar";
import styles from '../styles/Home.module.css';
import Head from 'next/head';
//import 'semantic-ui-css/semantic.min.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShareIcon from '@mui/icons-material/Share';
import React from "react";
//import 'firebase/firestore';
//import firebase from '../src/firebase.js';
import { useRouter } from "next/router"
import NavItem from "../components/navbar/NavItem";
//import ezlogo from '../../public/pic/ezlogo.png';
import TextField from '@mui/material/TextField';
import Input from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { red } from "@mui/material/colors";


const MENU_LIST = [
  { text: "登入", href: "/login" },
  //{ text: "註冊", href: "/register"},
];

// const [navActive, setNavActive] = useState(null);
// const [activeIdx, setActiveIdx] = useState(-1);

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

const auth = getAuth();

function Newpost() {

  const router = useRouter();
  const { articleId } = router.query;
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [tags, setTags] = React.useState([]);
  // const [majortags, setmajorTags] = React.useState([]);
  const [tagName, setTagName] = React.useState("");
  const [majortagName, setmajorTagName] = React.useState([]);
  // const [minitagName, setminiTagName] = React.useState("");
  const [link, setLink] = React.useState('');
  const [user, setUser] = useState();


  useEffect(() => {

    async function readData() {
      if (articleId) {
        const ref = doc(db, "text", articleId);
        const docSnapshot = await getDoc(ref);
        if (docSnapshot.exists()) {
          console.log("doc", docSnapshot.data())
          setTitle(docSnapshot.data().title)
          setContent(docSnapshot.data().content)
          setLink(docSnapshot.data().link)
          setTagName(docSnapshot.data().tag)
          setmajorTagName(docSnapshot.data().majortag)
        }
      }

    }
    readData();
  }
    , [articleId])



  useEffect(() => {
    //   if (articleId){
    //   const ref = doc(db, "text", articleId);
    //   const docSnapshot = await getDoc(ref);
    //   if (docSnapshot.exists()) {
    //   setTitle(docSnapshot.data().title)
    //   }
    // }
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log(user);
    });

    return () => {
      unsub();
    }
  }, []);

  // React.useState(() =>{
  //     firebase
  //     .firestore
  //     .collection('topics')
  //     .get()
  //     .then((collectionSnapshot) =>{
  //         const data = collectionSnapshot.docs.map((doc))
  //         return docs.data();
  //     });
  //     setTopics(data);
  // });

  // const handleChange = event => {
  //     console.log(event.target.value);
  //     setSelected(event.target.value);
  //   };


  const options = tags.map(tag => {
    return {
      text: tag.name,
      value: tag.name
    }
  })




  const update = async function () {
    if (title == "" || content == "" || tagName == "" || link == "" || majortagName == "") {
      return (false);
    }

    const db = getFirestore();
    try {
      if (!articleId) {
        const docRef = await addDoc(collection(db, "text"), {
          title,
          content,
          userid: user.uid,
          email: user.email,
          tag: tagName,
          user: user.displayName,
          heart: [],
          bookmark: [],
          count: 1,
          report: false,
          link,
          outdate: "solved",
          outdateCount: [],
          timestamp: serverTimestamp(),
          minitag: minitagName,
          majortag: majortagName,
        });
        console.log(docRef.id);
      }
      else {
        await updateDoc(doc(db, "text", articleId), {
          title,
          content,
          tag: tagName,
          link,
          majortag: majortagName,
        });
      }
    }
    catch (e) {
      console.log(e);
    }
    router.push('/note');
  }







  // function MultilineTextFields() {
  //     return (
  //       <Box
  //         component="form"
  //         sx={{
  //           '& .MuiTextField-root': { m: 1, width: '80ch' },
  //         }}
  //         noValidate
  //         autoComplete="off"
  //       >
  //         {/* <div>
  //           <TextField
  //             id="outlined-multiline-flexible"
  //             label="Multiline"
  //             multiline
  //             maxRows={4}
  //           />
  //         </div> */}
  //         </Box>
  //         );
  //         }

  return (
    // <div className={styles.post_container}>
    <div>
      <div>
        <Navbar />
        <Toolbar />
        <Container>
          <Box display="flex" flexDirection="column" flexWrap="wrap" justifyContent="center" >
            <Card
              display="flex"
              flexDirection="column"
              sx={{
                // bgcolor: "#000000",
                borderRadius: 2,
                p:2,
                pr: 4,
                pl: 4,
                m: 4,
              }}
            >

              <Typography variant="h6">發布筆記</Typography>
              <Typography variant="h6">{user && user.displayName}</Typography>

              <FormControl fullWidth>
                <TextField
                  error={title === ""}
                  helperText={title === "" ? "請輸入標題" : ""}
                  required
                  id="outlined-textarea"
                  label="請輸入筆記標題"
                  placeholder={title ? "" : "今天的主題是..."}
                  multiline
                  value={title}
                  margin="normal"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <TextField
                  error={content === ""}
                  helperText={content === "" ? "請輸入內容" : ""}
                  required
                  InputProps
                  id="outlined-textarea"
                  label="請輸入內容"
                  placeholder={content ? "" : "我想分享..."}
                  margin="normal"
                  rows={10}
                  multiline
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                /></FormControl>

              <FormControl fullWidth>
                <TextField
                  error={link === ""}
                  helperText={link === "" ? "請輸入連結" : ""}
                  id="outlined-textarea"
                  label="您想分享的連結"
                  placeholder={link ? "" : "https..."}
                  multiline
                  value={link}
                  margin="normal"
                  onChange={(e) => setLink(e.target.value)}
                />
              </FormControl>

              <FormControl sx={{ width: 250 }}
                error={tagName === ""}
                margin="normal"
              >
                <InputLabel id="demo-simple-select-label" required>請選擇筆記分類</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tagName}
                  // label="topic"
                  onChange={(e) => {
                    setTagName(e.target.value);
                    console.log("tag:")
                  }}
                >
                  <MenuItem value="課堂筆記">課堂筆記</MenuItem>
                  <MenuItem value="修課心得">修課心得</MenuItem>
                  <MenuItem value="專題相關">專題相關</MenuItem>
                  <MenuItem value="業界資源">業界資源</MenuItem>
                  <MenuItem value="其他">其他</MenuItem>
                </Select>
                {tagName === "" && <FormHelperText>請選擇筆記分類</FormHelperText>}
              </FormControl>

              <br></br>

              <FormControl sx={{ width: 250 }}
                error={majortagName === ""}
                margin="normal"
              >
                <InputLabel id="demo-simple-select-label" required>請選擇筆記標籤</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={majortagName}
                  // label="topic"
                  onChange={(e) => {
                    setmajorTagName(e.target.value);
                    console.log("majortag:")
                  }}
                >
                  <MenuItem value="Java">Java</MenuItem>
                  <MenuItem value="Python">Python</MenuItem>
                  <MenuItem value="C">C</MenuItem>
                  <MenuItem value="React">React</MenuItem>
                  <MenuItem value="Next">Next</MenuItem>
                  <MenuItem value="HTML">HTML</MenuItem>
                  <MenuItem value="PHP">PHP</MenuItem>
                  <MenuItem value="MySQL">MySQL</MenuItem>
                  <MenuItem value="Firebase">Firebase</MenuItem>
                </Select>
                {majortagName === "" && <FormHelperText>請選擇筆記標籤</FormHelperText>}
              </FormControl>

              <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="contained" onClick={update}>發布</Button><br></br><br></br>
                <Button variant="contained" color="error">取消</Button>
              </CardActions>


            </Card>
          </Box>
        </Container>

      </div>
    </div>





  )
}

export default Newpost;