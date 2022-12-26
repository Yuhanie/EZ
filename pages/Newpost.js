import { useState, useEffect, Component } from "react";
import { initializeApp, getApp, getApps, FirebaseError } from "firebase/app";
import { query, orderBy, limit } from "firebase/firestore";
import { AppBar, Box, Toolbar, IconButton, Typography, Button, InputBase } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import firebase from "../database/database";




import Navbar from "../components/navbar/Navbar";
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import {Container, Header,Form} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ShareIcon from '@mui/icons-material/Share';
import React from "react";
//import 'firebase/firestore';
//import firebase from '../src/firebase.js';

import { useHistory } from 'react-router-dom';

function Newpost () {
    //const history = useHistory();
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

    function onSubmit(){
        const documentRef = firebase.firestore().collection("posts").doc();
        documentRef.set({
            title,
            content,
            topic:topicName,
            createAt: firebase.firestore.Timestamp.now(),
            author:{
                displayName: firebase.auth().currentUser.displayName || "",
                photoURL: firebase.auth().currentUser.photoURL || "",
                uid: firebase.auth().currentUser.uid,
                email: firebase.auth().currentUser.email
            },
        }).then(() => {
            history.push('/');
        })
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
            />
            <Form.Button>發布</Form.Button>
            <Form.Button>取消</Form.Button>

           
        </Form>

        

        
    </Container>
}
export default Newpost;