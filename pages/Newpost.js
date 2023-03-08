import { useState, useEffect, Component } from "react";
import { initializeApp, getApp, getApps, FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc,doc,Timestamp,getDoc} from "firebase/firestore";
import { updateDoc, serverTimestamp } from "firebase/firestore";
import {firebaseConfig} from '../settings/firebaseConfig';
import { query, orderBy, limit } from "firebase/firestore";
import {Container, AppBar, Box, Toolbar, IconButton, Typography, Button, InputBase } from '@mui/material'
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


const MENU_LIST = [
  { text: "登入", href: "/login" },
  //{ text: "註冊", href: "/register"},
];

    // const [navActive, setNavActive] = useState(null);
    // const [activeIdx, setActiveIdx] = useState(-1);
  
    const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    const db = getFirestore();

    const auth = getAuth();
    
function Newpost () {
    const router = useRouter();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [tagName, setTagName] = React.useState("");
    const [link, setLink] = React.useState('');
    const [age, setAge] = React.useState('');
    const [user, setUser] = useState();





    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user)=>{
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
            text:tag.name,
            value:tag.name
        }
    })

    

    async function onSubmit(){

        // console.log(tagName);
        // alert(user.uid)
        // alert(user.email)        
        // await addDoc(collection(db, "text",
        // props.article.docId,"comment"))
        await addDoc(collection(db, "text"), {
            title,
            content,
            userid: user.uid,
            email: user.email,
            tag:tagName,
            user:user.displayName,
            heart:[],
            bookmark:[],
            //還有這些無法加入生成欄位，看來是需要給一個值嗎？
            count:1,
            // link,
            //user欄位要帶入登入的資料8
            //user, 
            link,
            timestamp: serverTimestamp()
            // createAt:Timestamp.now(),
            // author:{
            //     displayName: auth.currentUser.displayName || "",
            //     photoURL: auth.currentUser.photoURL || "",
            //     uid: auth.currentUser.uid,
            //     email: auth.currentUser.email
            // },
          });
        
     
            router.push('/');
        
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
    <div className={styles.post_container}>
        <div>
        <Navbar/>

        
        <h3 className>發布筆記</h3><br/>
      
            <div>
                {user&&user.displayName}
            <FormControl fullWidth>
            <TextField
                id="outlined-textarea"
                label="請輸入筆記標題"
                placeholder="今天的主題是..."
                multiline
                onChange={(e) => setTitle(e.target.value)} 
            /></FormControl>
            </div><br/>

           
            <div>
            <FormControl fullWidth>
            <TextField
                InputProps={{ sx: { height: 250 } }}
                id="outlined-textarea"
                label="請輸入內容"
                placeholder="我想分享..."
                multiline
                onChange={(e) => setContent(e.target.value)} 
            /></FormControl>
            </div><br/>

           
            <div>
            <FormControl fullWidth>
            <TextField
                
                id="outlined-textarea"
                label="您想分享的連結"
                placeholder="https..."
                multiline
                onChange={(e) => setLink(e.target.value)} 
                
            />
            </FormControl>
            </div ><br/>

            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">請輸入筆記標籤</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={topicName}
                // label="topic"
                onChange={(e) => {setTagName(e.target.value); 
                console.log("t:")}} 
            >
                <MenuItem value="課堂筆記">課堂筆記</MenuItem>
                <MenuItem value="修課心得">修課心得</MenuItem>
                <MenuItem value="專題相關">專題相關</MenuItem>
                <MenuItem value="業界資源">業界資源</MenuItem>
                <MenuItem value="其他">其他</MenuItem>
            </Select><br/>
{/* <InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="20">Ten</MenuItem>
  <MenuItem value="10">Twenty</MenuItem>
</Select> */}



            </FormControl>

          

            <Button variant="contained" sx={{ padding: 1, margin: 5 , left: 920 , top: -9}} onClick={onSubmit}>發布</Button><br></br><br></br>
            <Button variant="contained" sx={{ padding: 1, margin: 4.5 , left: 1020 , top: -145}}>取消</Button>
    
</div>
           </div>


        

        
    )
}

export default Newpost;