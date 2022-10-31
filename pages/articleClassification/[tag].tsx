import type { NextPage } from 'next';
import Head from 'next/head';

import React, { useState, useEffect } from "react";
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from '../../settings/firebaseConfig';
import styles from '/styles/Home.module.css';
import Link from 'next/link';

import ArticleListItem from '../../components/article/ArticleListItem';
import TagList from '../../components/tag/TagList';
import { Article,Tag } from '../../interfaces/entities';
// import { tags } from '../../interfaces/entities';

import { query, orderBy, limit, where } from "firebase/firestore";
import Navbar from "../../components/navbar/Navbar";

import { useRouter } from 'next/router'

//material ui
import { List, ListItem, ListItemText, CircularProgress, Divider, IconButton } from "@mui/material";
import { ClassNames } from '@emotion/react';
import { style, Box } from '@mui/system';


//////////////////////////////////////////////////////////////////////////

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

//////////////////////////////////////////////////////////////////////////
  const Home = () => {
    const router = useRouter()
    const {tag} = router.query

    const [articles, setArticles] = useState<Article[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

  //console.log(props)
  
  useEffect(() => {
    async function readData() {
      setIsLoading(true);
      console.log("tag:",tag)
      const querySnapshot = await getDocs(query(collection(db, "text"), where("tags", "array-contains", tag)));
      const temp: Article[] = [];

      querySnapshot.forEach((doc) => {
        console.log(doc.id);
        console.log(doc.data());
        temp.push({docId: doc.id, content: doc.data().content, title: doc.data().title, user: doc.data().user,link: doc.data().link}); 
      });

      console.log(temp);

      setArticles([...temp]);
      setIsLoading(false);
    }

    readData();

  }, []);


  const renderText = (article: Article, i: number) => {
    return (
      <ArticleListItem article={article}></ArticleListItem>
    );
  };

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
        <div className={styles.classification_sidebar}>
          <div className={styles.sidebar_tool}>
            <button><Link href="/">back</Link></button>
            {/* <div className={styles.classification_tag} key={props.tag.name}><br/> */}
            <div className={styles.classification_tag}><br/>
              <h3>{tag}</h3>
            </div>
          </div>
          <br/>
          <div className={styles.sidebar_tool}>
              <p>更多熱門主題</p>
          </div>
          <List className={styles.line} aria-label="mailbox folders">
            <Divider />
            {/* <ListItem button>
              <ListItemText primary="item1" />
            </ListItem> */}
            <Divider />
          </List>
        </div>
        <div>
          <main className={styles.main}>
            {!isLoading ?
              <div className={styles.grid}>
                {articles.map(renderText)}
              </div>
              : <CircularProgress />
            }

          </main>
        </div>
      </div>
    </div>
  )
}
export default Home

