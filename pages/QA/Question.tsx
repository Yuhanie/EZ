import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState, useEffect } from "react";
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableRow ,Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack, } from "@mui/material";
//import DeleteIcon from '@mui/icons-material/Delete';
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from '../../settings/firebaseConfig';
import styles from '/styles/Home.module.css';
import Link from 'next/link';
import QADetails from '../../components/question/QADetails';
import QAListItem from '../../components/question/QAListItem';
import MiniTags from '../../components/miniTags/miniTags';
import TagList from '../../components/tag/TagList';
import { Question,Tag } from '../../interfaces/entities';
// import { tags } from '../../interfaces/entities';

import { query, orderBy, limit, where } from "firebase/firestore";
import Navbar from "../../components/navbar/Navbar";

import { useRouter } from 'next/router'

//material ui
import { List, ListItem, ListItemText, CircularProgress, IconButton, Button } from "@mui/material";
import { ClassNames } from '@emotion/react';
import { style, Box } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
//////////////////////////////////////////////////////////////////////////

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export async function getServerSideProps() {
  return {
      props: {},
  };
}

//////////////////////////////////////////////////////////////////////////
  const Question = () => {
    const router = useRouter()
    const {tag} = router.query

    const [question, setQuestion] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tags, setTags] = useState<Tag[]>([]);

  //console.log(props)
  
  useEffect(() => {
    async function readData() {
      setIsLoading(true);
      //console.log("tag:",tag)
      const querySnapshot = await getDocs(query(collection(db, "question")));
      // const querySnapshot2 = await getDocs(query(collection(db, "/tag/"+{tag}+"/分類" )));
      // const querySnapshot2 = await getDocs(query(collection(db, "/tag/{tag}/分類")));

      const temp: Question[] = [];
      const temp2: Tag[] = [];

      querySnapshot.forEach(async (doc) => {
        console.log(doc.id);
        //console.log("tag2:",tag)
        // const querySnapshot2 = await getDocs(query(collection(db, "/tag")));
        // querySnapshot2.forEach(async (doc2) => {
        //   console.log(doc2.id);
        //   console.log(doc2.data());
        //   temp2.push({docId: doc.id,name:doc2.data().name}); 
        // });
        console.log(doc.data());
        temp.push({docId: doc.id, content: doc.data().content, title: doc.data().title, user: doc.data().user, count: doc.data().count, heart: doc.data().heart}); 
      });

      //console.log("tag4:",tag);
      // const querySnapshot2 = await getDocs(query(collection(db, "/tag/"+tag+"/分類")));
      //   querySnapshot2.forEach(async (doc2) => {
      //     console.log(doc2.id);
      //     console.log(doc2.data());
      //     temp2.push({name:doc2.data().name}); 
      //   });

      console.log(temp);
      console.log("temp2:",temp2);

      setQuestion([...temp]);
      setTags([...temp2]);
      setIsLoading(false);
    }

    readData();
    //加tag會有問題，先diable警告
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const renderText = (question: Question, i: number) => {
    return (
      <QAListItem key={question.docId} question={question}></QAListItem>

    );
  };

  // const renderTag = (tag: Tag, i: number) => {
  //   //console.log("tags3:",tag);
  //   return (
  //     <MiniTags key = {tag.name} miniTag={tag}></MiniTags>
  //   );
  // };

  return (
    <div className={styles.container}>
      <Head>
        <title>筆記分享區</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar/>
    
      <div className={styles.classification_container}>
        {/* <div className={styles.classification_sidebar}>
          <div className={styles.sidebar_tool}>
           <Link href="/">
            <IconButton aria-label="ArrowBack">
                <ArrowBackIosNewIcon/>
            </IconButton>
           </Link>

             <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>

            <div className={styles.classification_tag}><br/>
              <h3>{tag}</h3>
            </div>
          </div>
          <div className={styles.sidebar_tool}>
              <p>更多熱門主題</p>
          </div>
          <List className={styles.line} aria-label="mailbox folders">
            <Divider key="xx"/>
              <ListItem button> 
                <ListItemText primary="分類" />
                <ListItemText/> 
                {tags.map(renderTag)}
              </ListItem> 
            <Divider key="xxx"/>
          </List>
        </div> */}
        <div>
          <main className={styles.main}>
            {!isLoading ?
              <div className={styles.grid}>
                {question.map(renderText)}
              </div>
              : <CircularProgress />
            }

          </main>
        </div>
      </div>
    </div>
  )
}
export default Question