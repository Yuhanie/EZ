import { useState, useEffect, Component } from "react";
import { initializeApp, getApp, getApps, FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc,doc,Timestamp,getDoc} from "firebase/firestore";
import { updateDoc, serverTimestamp } from "firebase/firestore";
import {firebaseConfig} from '../settings/firebaseConfig';
import { query, orderBy, limit } from "firebase/firestore";
import {Container, AppBar, Box, Toolbar, IconButton, Typography, Button, InputBase, Card, CardActions } from '@mui/material'
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
import {useRouter} from "next/router"
import NavItem from "../components/navbar/NavItem";
//import ezlogo from '../../public/pic/ezlogo.png';
import TextField from '@mui/material/TextField';
import Input from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';
import Paper from '@mui/material/Paper';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@material-ui/core/Chip';





const MENU_LIST = [
    { text: "登入", href: "/login" },
    //{ text: "註冊", href: "/register"},
  ];
  
  // const [navActive, setNavActive] = useState(null);
  // const [activeIdx, setActiveIdx] = useState(-1);
  
  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore();
  
  const auth = getAuth();

  
  
  
  function Newask() {
  
    const router = useRouter();
    const [tags, setTags] = React.useState([]);
    const [tagName, setTagName] = React.useState("");
    const [link, setLink] = React.useState('');
    const [user, setUser] = useState();
    const [majortagName, setMajorTagName] = React.useState([]);
    const [content, setContent] = React.useState('');

    

    const handleChange = (event) => {
      setMajorTagName(event.target.value);
   };
  
  
    // useEffect(() => {
  
    //   async function readData() {
    //     if (articleId) {
    //       const ref = doc(db, "text", articleId);
    //       const docSnapshot = await getDoc(ref);
    //       if (docSnapshot.exists()) {
    //         console.log("doc", docSnapshot.data())
    //         setTitle(docSnapshot.data().title)
    //         setContent(docSnapshot.data().content)
    //         setLink(docSnapshot.data().link)
    //         setTagName(docSnapshot.data().tag)
    //       }
    //     }
  
    //   }
    //   readData();
    // }
    //   , [articleId])
  
  
  
    // useEffect(() => {
    //   //   if (articleId){
    //   //   const ref = doc(db, "text", articleId);
    //   //   const docSnapshot = await getDoc(ref);
    //   //   if (docSnapshot.exists()) {
    //   //   setTitle(docSnapshot.data().title)
    //   //   }
    //   // }
    //   const unsub = onAuthStateChanged(auth, (user) => {
    //     setUser(user);
    //     console.log(user);
    //   });
  
    //   return () => {
    //     unsub();
    //   }
    // }, []);
  
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
  
  
    // const options = tags.map(tag => {
    //   return {
    //     text: tag.name,
    //     value: tag.name
    //   }
    // })
  
  
  
  
    const update = async function () {
      if (content == "" || tagName == "" || link == "") {
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
            link,
            outdate: "solved",
            outdateCount: [],
            timestamp: serverTimestamp()
          });
          console.log(docRef.id);
        }
        else {
          await updateDoc(doc(db, "text", articleId), {
            title,
            content,
            tag: tagName,
            link,
          });
        }
      }
      catch (e) {
        console.log(e);
      }
      router.push('/');
    }

    return (
    //<div className={styles.post_container}>
    <div>
        <Paper
               sx={{
                  width: 330,
                  height: 'auto',
                  margin: 'auto',
                  flexGrow: 1,
               }}
            >
              <Box sx={{ p: 2, }}>
                  <Typography
                     variant="h6"
                     display="block"
                     sx={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        color: '#425E99',
                        mt: 2
                     }}
                  >
                     Make a wish
                  </Typography>
                  <Typography 
                    variant="caption" 
                    display="block"
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                     具體的描述許願內容
                  </Typography>
               </Box>
               <Box display="flex" alignItems="center" sx={{ p:1 }}>
                          {/* <Typography sx={{ minWidth: 100 }}>選擇領域</Typography> */}
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">選擇領域</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              
                              value={majortagName}
                              onChange={handleChange}
                              input={<OutlinedInput id="select-multiple-chip" />}
                              
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
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: 315 },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                  fullWidth
                    id="outlined-multiline-flexible"
                    label="許願內容"
                    multiline
                    maxRows={4}
                  />
                </Box>
                <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button variant="contained" disabled color="primary">取消</Button><br></br><br></br>
                  <Button variant="contained" onClick={update} >送出</Button>
                </CardActions>

                        

            </Paper>
        
    
    </div>


        

        
    )
}

export default Newask;