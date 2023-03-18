import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState, useEffect, Component } from "react";
import { useRouter } from "next/router"
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { firebaseConfig } from '../settings/firebaseConfig';
import QAListItem_copy from '../components/question/QAListItem_copy';
import { Question } from '../interfaces/entities';
import { Container } from '@mui/system';
import List from '@mui/material/List';
import Navbar from "../components/navbar/Navbar";
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Box, CircularProgress } from '@mui/material';
import styles from '../styles/Home.module.css';

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

const QA: NextPage = () => {
    const [currentUser, setCurrentUser] = useState<User>();
  const [newTexts, setNewTexts] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updated, setUpdated] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([])
  const router = useRouter();



  const updateUpdated = () => {
    setUpdated((currentValue) => currentValue + 1)
  }
  useEffect(() => {

    async function readData() {


      setIsLoading(true);

     
      const textCollection = collection(db, "question");
      const queryText = query(textCollection, orderBy("count", "desc"), limit(3));
      //const queryNewText =query(textCollection, orderBy("timestamp", "desc"), limit(3)); 
      const querySnapshotQuestion = await getDocs(queryText);
      //const querySnapshotArticle  = await getDocs(collection(db, "text"));
      const tempQuestion: Question[] = [];
      // const tempNewtext: Newtext[] = [];
      querySnapshotQuestion.forEach((doc) => {
        //console.log(doc.id, doc.data());
        tempQuestion.push({
          docId: doc.id, content: doc.data().content, title: doc.data().title, user: doc.data().user, link: doc.data().link, userid: doc.data().userid, count: doc.data().count, heart: doc.data().heart, timestamp: doc.data().timestamp, bookmark: doc.data().bookmark, outdateCount: doc.data().outdateCount, outdate: doc.data().outdate
        });
      });
      setQuestions([...tempQuestion]);











      //console.log(temp);

      const auth = getAuth();
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
        }
        // else{
        // setCurrentUser()}
        console.log(user);
      });













      setIsLoading(false);

      return () => {
        unsub();
      }
    }

    readData();


  }, []);



  // const test = () => {
  //   console.log("Hello");
  // }

  // const changeStatus = function (props) {
  //   props.setStatus("signUp");
  // }
  const changeStatus = function () {
    if (typeof window !== "undefined") {

      if (currentUser) {
        router.push('/Newqa');
      }
      else {
        alert("要登入才能問問題ㄛ!")
        //window.alert("要登入才能新增筆記ㄛ!");

        // <Alert action={
        //   <Button >
        //     UNDO
        //   </Button>
        // }>要登入才能新增筆記ㄛ! </Alert>

        router.push('/login');

      }


    }
  }


  // const logout = async function () {
  //   const auth = getAuth();
  //   await signOut(auth);
  //   alert("已登出");
  // };







  const renderText = (question: Question, i: number) => {
    return (
      <QAListItem_copy key={question.docId} question={question} update={updateUpdated}></QAListItem_copy>
    );

  };




  return(
    <div>
        <Head>
          <title>筆記分享區</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" ></meta>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <Container>
        <List sx={{ width: '100%', minWidth: 700, bgcolor: 'background.paper' }}>
        <Box
              display="flex"
              justifyContent="center"
            >
              {!isLoading ?
                <div className={styles.grid}>
                  {questions.map(renderText)}
                </div>
                : <CircularProgress />
              }
            </Box>
        </List>
        </Container>
    </div>
  )
}
export default QA;