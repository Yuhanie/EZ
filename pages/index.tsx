import type { NextPage } from 'next';
import Head from 'next/head';

import React, { useState, useEffect } from "react";
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs} from "firebase/firestore";
import {firebaseConfig} from '../settings/firebaseConfig';
import styles from '../styles/Home.module.css';

import ArticleListItem from '../components/article/ArticleListItem';
import { Article } from '../interfaces/entities';

import { query, orderBy, limit } from "firebase/firestore";
import Navbar from "../components/Navbar/Navbar";

//////////////////////////////////////////////////////////////////////////

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

//////////////////////////////////////////////////////////////////////////

// const [isLoading, setIsLoading] = useState(false);
// const ProductListComponent = function (){

//   return (
//     <List subheader="Product list" aria-label="product list">
//     {products.map((product, index) => 
//       <ListItem divider key={index}>
//         <ListItemText primary={product.desc} secondary={"NT$"+product.price}></ListItemText>
//       </ListItem>)}
//     </List>
//   )
// }

// return (
//   <Box sx={{
//     width: '100vw',
//     height: '100vh',
//     backgroundColor: 'background.paper',
//     color: 'black',
//     textAlign: 'left'
//   }}>
//   <AppMenu/>
//   {!isLoading ?
//     <ProductListComponent/>
//      :
//     <CircularProgress />
//   }

//   </Box>
// );

// useEffect(()=>{
//   async function readData() {
//     setIsLoading(true);
//     const querySnapshot = await getDocs(collection(db, "product"));
//     const temp = [];
//     querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//       temp.push({desc:doc.data().desc, price:doc.data().price});
//     });
//     console.log(temp);
//     setProducts([...temp]);
//     setIsLoading(false);
//   }
//   readData();
// },[db, open]);

///////////////////////////////////////////////////////////////////////////


const Home: NextPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  useEffect(()=>{
    async function readData() {
      const querySnapshot = await getDocs(collection(db, "text"));
      const temp:Article[] = [];
      
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
        temp.push({docId:doc.id, content:doc.data().content, title:doc.data().title, user:doc.data().user});
      });

      console.log(temp);

      setArticles([...temp]);

    }

    readData();

  },[]);

const test = () => {
  console.log("Hello");
}

  const renderText = (article: Article, i: number) => {
    return (
      <ArticleListItem article = {article}></ArticleListItem>
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
        <nav className={styles.navbar}>
          <div className={styles.form}>
            <h1 className={styles.title}>
              Education Zone
            </h1>
          </div>
        </nav>

        <div className={styles.grid}>
        {articles.map(renderText)}
        </div>

      </main>
    </div>
  )
}

export default Home

