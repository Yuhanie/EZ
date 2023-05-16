import type { NextPage } from 'next';
import Head from 'next/head';

import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
//import DeleteIcon from '@mui/icons-material/Delete';
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from '../../settings/firebaseConfig';
import styles from '/styles/Home.module.css';
import Link from 'next/link';
import ArticleListItem from '../../components/article/ArticleListItem';
import MajorTagList from '../../components/tag/MajorTagList';
import { Article, Profile } from '../../interfaces/entities';
// import { tags } from '../../interfaces/entities';

import { query, orderBy, limit, where } from "firebase/firestore";
import Navbar from "../../components/navbar/Navbar";

import { useRouter } from 'next/router'

//material ui
import { List, ListItem, ListItemText, CircularProgress, IconButton, Button } from "@mui/material";
import { ClassNames } from '@emotion/react';
import { style, Box } from '@mui/system';

//////////////////////////////////////////////////////////////////////////

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export async function getServerSideProps() {
  return {
    props: {},
  };
}

//////////////////////////////////////////////////////////////////////////
const Article = () => {
  const router = useRouter()
  const { majorTag } = router.query

  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updated, setUpdated] = useState(0);

  //console.log(props)

  useEffect(() => {
    async function readData() {
      console.log("major:",majorTag);
      setIsLoading(true);
      const querySnapshot = await getDocs(query(collection(db, "text"), where("majortag", "array-contains", majorTag)));
      const temp: Article[] = [];
      querySnapshot.forEach(async (doc) => {
        console.log(doc.id);
        console.log(doc.data());
        temp.push({ 
          docId: doc.id, 
          content: doc.data().content, 
          title: doc.data().title, 
          user: doc.data().user, 
          link: doc.data().link, 
          userid: doc.data().userid, 
          count: doc.data().count, 
          heart: doc.data().heart, 
          timestamp: doc.data().timestamp, 
          bookmark: doc.data().bookmark, 
          outdateCount: doc.data().outdateCount, 
          outdate: doc.data().outdate,
          majortag: doc.data().majortag,
          tag: doc.data().tag,
          email: doc.data().email
        });
      });
      setArticles([...temp]);
    }

    readData();
    //加tag會有問題，先diable警告
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  const updateUpdated = ()=>{
    setUpdated((currentValue)=>currentValue+1)
  }

  const renderText = (article: Article, i: number) => {
    return (
      <ArticleListItem key={article.docId} article={article} update={updateUpdated}></ArticleListItem>
    );
  };

  ////////////////////////////////////////////////////////////sidebar
  const drawerWidth = 240;

  interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>筆記分享區</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className={styles.classification_container}>
        <div className={styles.classification_sidebar}>

        </div>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
        >
          {!isLoading ?
            <div className={styles.grid}>
              {articles.map(renderText)} 
            </div>
            : <CircularProgress />
          }
        </Box>

      </div>
    </div>
  )
}
export default Article