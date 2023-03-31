import React from 'react';
import Image from 'next/image';
// import profilePic from '/public/pic/yuhan.jpg'
import { firebaseConfig } from '../../settings/firebaseConfig';
import { getApp,getApps, initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, increment, updateDoc } from "firebase/firestore";
import { Button, TableCell, TableRow } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import QADetails2 from "./QADetails_copy";
import { Question } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';
//import Heart from '@mui/icons-material/Heart';
import Heart from '@mui/icons-material/Favorite';

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

type Props = {
  question: Question;
};

const QAListItem:
 React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    const ref = doc(db, "question", props.question.docId);
    updateDoc(ref,{count: increment(1)});
  
  };

  const handleClose = () => {
    setOpen(false);
  };

// function heart(){
//   const ref = doc(db, "text", props.article.docId);
//   updateDoc(ref,{count: increment(1)});
  
// }  

  return (
  <div>
  {/* <QADetails2 question={props.question} open={open} setOpen={setOpen} ></QADetails2> */}
  <div className={styles.card} key={props.question.title}>
    
    <h2><a>{props.question.title}</a></h2>
    {/* <a href={props.article.link} target="_blank" rel="noreferrer"> */}
      <p onClick={handleOpen}>{props.question.content.substring(0, 65)}{props.question.content.length>65?"...":""}</p>
    {/* </a> */}
    <div className={styles.card2} >
    {/* <Image className={styles.userPhoto} src={profilePic} alt="user" /> */}
      {/* <Image
        className={styles.userPhoto}
        src="/pic/test1.jpeg"
        alt="user"
        width={70}
        height={30}
        // height="50px"
        // width="70px"
      /> */}
      <p className={styles.userName}>{props.question.user}</p>
    
      
      <span className={styles.fiveStar} id="five-star"></span>
    </div>
   <div className={styles.Heart} > <Heart  /*onClick={heart}*//></div> 
  </div>
  
  </div>
  );
};
export default QAListItem;
