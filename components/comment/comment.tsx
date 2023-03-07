import { Article, Comment } from "../../interfaces/entities";
import Image from "next/image";
// import React from "react";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { useRouter } from "next/router";
import warning from "../../public/pic/warning.jpg";
import styles from "/styles/Home.module.css";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, doc, getDocs,deleteDoc, getDoc, getFirestore, query, orderBy, limit,updateDoc, serverTimestamp, arrayRemove, arrayUnion } from "firebase/firestore";
import { firebaseConfig } from '../../settings/firebaseConfig';
import VI from '@mui/icons-material/Visibility';
import OutlinedInput from '@mui/material/OutlinedInput';
import SendIcon from '@mui/icons-material/Send';
import Heart from '@mui/icons-material/Favorite';
import Typography from '@mui/material/Typography';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import { getApp, getApps, initializeApp } from "firebase/app";
import { User } from "next-auth";

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

const Comment = (props:any) => {
    const [comments, setComments] = useState<Comment[]>();
  const [content, setContent] = useState("");
  const [user, setUser] = useState<User>();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(props.article.heart ? props.article.heart.length : 0);
  const [deleted, setDeleted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [edited, setEdited] = useState(0);
  const [open, setOpen] = useState(false);
  const [timestamp, setTimestamp] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = 
        collection(db, "text", props.article.docId, "comment");
      const queryText = query(querySnapshot, orderBy("timestamp", "asc"));
      const querySnapshotArticle = await getDocs(queryText);

      const temp:Comment[] = [];

      querySnapshotArticle.forEach( (doc) => {
        temp.push({user:doc.data().user, content:doc.data().content, id:doc.id});
      });
      setComments([...temp]);
    }
      fetchData();
    console.log('user:', user);
    console.log('article:', props.article)

//     const unsub = onAuthStateChanged(auth, (user) => {
//       if (user) {
        
//         setUser(user);
//         setHeart(user)
//       }
//       //console.log(user);
//     });

//     return () => {
//       unsub();
//     }




    
}, [edited, liked, deleted])
  



// async function onSubmit() {
//   if (typeof window !== "undefined") {
//     if (!user) {
//       alert("要登入才能新增留言ㄛ!");
//       //window.alert("要登入才能新增筆記ㄛ!");

//       // <Alert action={
//       //   <Button >
//       //     UNDO
//       //   </Button>
//       // }>要登入才能新增筆記ㄛ! </Alert>


//       router.push("/login");
//     } else {
//       await addDoc(collection(db, "text", props.article.docId, "comment"), {
//         content,
//         userid: user.uid,
//         timestamp: serverTimestamp(),

//         user: user.displayName,

//         //user,

//         // createAt:Timestamp.now(),
//         // author:{
//         //     displayName: auth.currentUser.displayName || "",
//         //     photoURL: auth.currentUser.photoURL || "",
//         //     uid: auth.currentUser.uid,
//         //     email: auth.currentUser.email
//         // },
//       });
//       setContent("");
//       setEdited(edited + 1);

//       //router.push('/');
//     }
//   }

//   // console.log(tagName);
//   // alert(user.uid)
//   // alert(user.email)
//   // await addDoc(collection(db, "text",
//   // props.article.docId,"comment"))
// }








  }
export default Comment;