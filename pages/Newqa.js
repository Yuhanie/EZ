import { useState, useEffect, Component } from "react";
import { initializeApp, getApp, getApps, FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
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
  

    
function Newqa () {
    const router = useRouter();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [tagName, setTagName] = React.useState("");
    




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
        const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        const db = getFirestore();

        const auth = getAuth();
        console.log(tagName);
        //生成comment的集合不雞道怎麼寫
        // await addDoc(collection(db, "text",
        // props.article.docId,"comment"))
        await addDoc(collection(db, "question"), {
            title,
            content,
            //然後要怎麼把tags變成陣列型態
            tags:tagName,
            //還有這些無法加入生成欄位，看來是需要給一個值嗎？
             count:1,
            // link,
            //user欄位要帶入登入的資料8
            //user, 
            
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

    return <Container>
        <Navbar/>
        {/* <h3>發布筆記</h3><br/> */}

        <IconButton/>
            <ShareIcon/>
            <AccountBoxIcon/>

            

            {/* <Form.Input
            type="file"
            /> */}

            <div>
            <TextField
                id="outlined-textarea"
                label="請輸入提問標題"
                placeholder="今天的問題是..."
                multiline
                onChange={(e) => setTitle(e.target.value)} 
            />
            </div>

            {/* <TextField id="textfield" label="Standard" />
                <FormControl>
                <InputLabel htmlFor="form-control">Form Control</InputLabel>
                <Input id="form-control" />
            </FormControl> */}
        

            {/* <Form.Input placeholder="請輸入筆記標題" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            /> */}
            
            <div>
            <TextField
                id="outlined-textarea"
                label="請輸入問題內容"
                multiline
                onChange={(e) => setContent(e.target.value)} 
            />
            </div>

            {/* <Form.TextArea height="500px"
             placeholder="請選擇筆記內容" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            /> */}

            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">請選擇問題標籤</InputLabel>
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
            </Select>
{/* <InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="20">Ten</MenuItem>
  <MenuItem value="10">Twenty</MenuItem>
</Select> */}



            </FormControl>

            {/* <Form.Dropdown
             placeholder="請選擇筆記標籤"
             options={[{
                text:"課堂筆記",
                value:"note"
             },
             {
                text:"修課心得",
                value:"diary"
             },
             {
                text:"專題相關",
                value:"project"
             },
             {
                text:"業界資源",
                value:"company"
             },
             {
                text:"其他",
                value:"other"
             },
            
            ]}
            onChange={(e, data) => {setTopicName(data.value); console.log("t:",data)}} 
            /> */}

            <Button variant="contained" onClick={onSubmit}>發布</Button><br></br><br></br>
            <Button variant="contained">取消</Button>
            {/* <Form.Button onClick={onSubmit}>發布</Form.Button>
            <Form.Button>取消</Form.Button> */}

           


        

        
    </Container>
}

export default Newqa;