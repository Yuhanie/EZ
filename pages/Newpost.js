import { useState, useEffect, Component } from "react";
import { initializeApp, getApp, getApps, FirebaseError } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, setDoc,doc,Timestamp} from "firebase/firestore";
import { updateDoc, serverTimestamp } from "firebase/firestore";
import {firebaseConfig} from '../settings/firebaseConfig';
import { query, orderBy, limit } from "firebase/firestore";
import { AppBar, Box, Toolbar, IconButton, Typography, Button, InputBase } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'


import Navbar from "../components/navbar/Navbar";
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import {Container, Header,Form} from 'semantic-ui-react';
//import 'semantic-ui-css/semantic.min.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShareIcon from '@mui/icons-material/Share';
import React from "react";
//import 'firebase/firestore';
//import firebase from '../src/firebase.js';
import {useRouter} from "next/router"
import NavItem from "../components/navbar/NavItem";
//import ezlogo from '../../public/pic/ezlogo.png';
import TextField  from '@mui/material';
const MENU_LIST = [
  { text: "登入", href: "/login" },
  //{ text: "註冊", href: "/register"},
];

    // const [navActive, setNavActive] = useState(null);
    // const [activeIdx, setActiveIdx] = useState(-1);
  

function Newpost () {
    const router = useRouter();
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [topics, setTopics] = React.useState([]);
    const [topicName, setTopicName] = React.useState("");
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

    const options = topics.map(topic => {
        return {
            text:topic.name,
            value:topic.name
        }
    })

    

    async function onSubmit(){
        const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
        const db = getFirestore();

        const auth = getAuth();
        console.log(topicName);
        await addDoc(collection(db, "posts"), {
            title,
            content,
            topic:topicName,
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

    return <Container>
        <Navbar/>
        <Header>發布筆記</Header>
        <Form>
        <IconButton/>
            <ShareIcon/>
            <AccountBoxIcon/>
            
            <Form.Input
            type="file"
            />
            <Form.Input placeholder="請輸入筆記標題" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            />

            <Form.TextArea height="500px"
             placeholder="請選擇筆記內容" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            />

            <Form.Dropdown
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
            />
            <Form.Button onClick={onSubmit}>發布</Form.Button>
            <Form.Button>取消</Form.Button>

           
        </Form>

        

        
    </Container>
}

export default Newpost;