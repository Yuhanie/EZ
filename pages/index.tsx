import type { NextPage } from 'next';
import Head from 'next/head';

import React, { useState, useEffect } from "react";
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs} from "firebase/firestore";
import {firebaseConfig} from '../settings/firebaseConfig';
import styles from '../styles/Home.module.css';

import ArticleListItem from '../components/article/ArticleListItem';
import TagList from '../components/tag/TagList';
import { Article,Tag } from '../interfaces/entities';

import { query, orderBy, limit } from "firebase/firestore";
import Navbar from "../components/navbar/Navbar";

import {List,ListItem,ListItemText,CircularProgress} from "@mui/material";

//////////////////////////////////////////////////////////////////////////

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

//////////////////////////////////////////////////////////////////////////

// const Home: NextPage = () => {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   useEffect(()=>{
//     async function readData() {
//       setIsLoading(true);
//       // const querySnapshot = await getDocs(collection(db, "text"));
//       const querySnapshot = await getDocs(collection(db, "tag"));
//       const temp:Article[] = [];
      
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, doc.data());
//         temp.push({docId:doc.id, content:doc.data().content, title:doc.data().title, user:doc.data().user});
//       });

//       console.log(temp);

//       setArticles([...temp]);
//       setIsLoading(false);
//     }

//     readData();

//   },[]);

  const Home: NextPage = () => {
    const [tag, setTag] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    useEffect(()=>{
      async function readData() {
        setIsLoading(true);
        // const querySnapshot = await getDocs(collection(db, "text"));
        const querySnapshot = await getDocs(collection(db, "tag"));
        // const temp:Article[] = [];
        const temp:Tag[] = [];
        
        // querySnapshot.forEach((doc) => {
        //   console.log(doc.id, doc.data());
        //   temp.push({docId:doc.id, content:doc.data().content, title:doc.data().title, user:doc.data().user});
        // });
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          temp.push({name:doc.data().name});
        });
  
        console.log(temp);
  
        setTag([...temp]);
        setIsLoading(false);
      }
  
      readData();
  
    },[]);

// const test = () => {
//   console.log("Hello");
// }

  const renderTag = (tag: Tag, i: number) => {
      return (
        <TagList tag = {tag}></TagList>
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

      <div>
        <Navbar/>
      </div>

      <main className={styles.main}>
        {/* <nav className={styles.navbar}>
          <div className={styles.form}>
            <h1 className={styles.title}>
              Education Zone
            </h1>
          </div>
        </nav> */}

        {/* {!isLoading ?
            <div className={styles.grid}>
              {articles.map(renderText)}
            </div>
          :<CircularProgress />
        } */}

        {!isLoading ?
          <div className={styles.grid2}>
             {tag.map(renderTag)}
             
          </div>
          :<CircularProgress />
        }


      </main>
    </div>
  )
}

export default Home

