import * as React from 'react';
import { useEffect, useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import wishComment from "./wishComment";

//mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CardHeader, Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';

//quill
// import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.core.css';

//firebase
import { Wish, Profile, Article, Comment } from '../../interfaces/entities';
import { firebaseConfig } from '../../settings/firebaseConfig';
import { arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, addDoc, query, orderBy, serverTimestamp, } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { ReactPropTypes } from 'react';
import { ChatBubble } from '@mui/icons-material';
import router from 'next/router';


const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

type Props = {
   wish: Wish;
   update: Function;
   open: boolean;
   setOpen: (open: boolean) => void;
   //currentUser: string;
};

const WishDetails:
   React.FC<Props> = (props) => {
      const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
      const [profile, setProfile] = useState<Profile>();
      const ReactQuillEditor = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
      const [comments, setComments] = useState<Comment>();
      const [deleted, setDeleted] = useState<number>(0);
      const [user, setUser] = useState<User>();
      const [edited, setEdited] = useState<number>(0);
      const [content, setContent] = useState<string>();

      const handleClose = () => {
         props.setOpen(false);
      };


      useEffect(() => {
         async function fetchData() {

            //   const querySnapshotDenounce = collection(
            //     db,
            //     "text",
            //     props.article.docId,
            //     "denounce"
            //   );
            //   const queryReport = query(querySnapshotDenounce);
            //   const querySnapshotReport = await getDocs(queryReport);
            //   const tempReport = [];
            //   querySnapshotReport.forEach((doc) => {

            //     let reportMessage = "";

            //     switch (doc.data().reason) {
            //       case "empty":
            //         reportMessage = "內容空泛";
            //         break;
            //       case "curse":
            //         reportMessage = "中傷、挑釁、謾罵他人";
            //         break;
            //       case "spamming":
            //         reportMessage = "惡意洗版";
            //         break;
            //       // default:
            //       //   reportMessage = "分類錯誤";
            //     }

            //     // setMessage(() => [...]);
            //     let reportdata = { ...doc.data(), id: doc.id, message: reportMessage };
            //     // console.log("reportData", reportdata)
            //     tempReport.push(reportdata);


            //   });

            //   setDenounces(() => [...tempReport]);



            // setReportMessage(reportMessage);






            const querySnapshot = collection(
               db,
               "wish",
               props.wish.docId,
               "comment"
            );
            const queryText = query(querySnapshot, orderBy("timestamp", "asc"));
            const querySnapshotArticle = await getDocs(queryText);
            const temp: Comment[] = [];

            querySnapshotArticle.forEach((doc) => {
               // let data = { ...doc.data(), id: doc.id, user: doc.user, content:doc.content };
               temp.push({ id: doc.id, user: doc.user, content: doc.content });
               // console.log("data:", data);
            });

            // setComments(() => [temp1, temp2]);
            setComments(() => [...temp]);
         }
         fetchData();
         // console.log("user:", user);
         // console.log("article:", props.article);

         // eslint-disable-next-line
      }, [edited, deleted]);

      async function onSubmit() {
         if (typeof window !== "undefined") {
            if (!user) {
               alert("要登入才能新增留言ㄛ!");
               router.push("/login");
            } else {
               await addDoc(collection(db, "text", props.wish.docId, "comment"), {
                  content,
                  userid: user.uid,
                  timestamp: serverTimestamp(),
                  heart: [],
                  user: user.displayName,
               });
               setContent("");
               setEdited(edited + 1);

               //router.push('/');
            }
         }
      }

      const renderComment = (comment: Comment, i: number) => {
         return (
            <div key={comment.content}>
               {comment && (
                  <div style={{ padding: 14 }} className="App">
                     <Comment key={comment.docId} comment={comment} update={updateUpdated} />
                     {/* <Comment
                        edited={edited}
                        setEdited={setEdited}
                        article={props.article}
                        comment={comment}
                     /> */}
                  </div>
               )}
            </div>
         );
      };

      return (
         <div>
            <Dialog
               open={props.open}
               onClose={handleClose}
               scroll={scroll}
               aria-labelledby="scroll-dialog-title"
               aria-describedby="scroll-dialog-description"
            >
               <DialogTitle
                  id="scroll-dialog-title"
                  sx={{
                     minWidth: 320,
                     p: 1,
                     display: { xs: 6, md: 12 }
                  }}
               >

                  <CardHeader
                     avatar={
                        <Avatar src={props.wish.userid && profile && profile.photoURL && profile.photoURL}>
                        </Avatar>
                     }
                     title={props.wish.user}
                     subheader={props.wish.timestamp && props.wish.timestamp.toDate().toLocaleDateString()}
                     //item 
                     sx={{ p: 1.2 }}
                  />
               </DialogTitle>
               <DialogContent dividers={scroll === 'paper'} sx={{ minHeight: 150, }}>
                  <DialogContentText
                     id="scroll-dialog-description"
                     tabIndex={-1}
                     sx={{ mb: 10 }}
                  >
                     {(typeof window !== "undefined") &&
                        <ReactQuillEditor
                           theme="bubble"
                           //style={{ height: 50 }}
                           readOnly={true}
                           value={props.wish.content}
                        />
                     }
                  </DialogContentText>
                  {comments.map((comment) => renderComment(comment))}
                  <Box>
                     <Chip label={props.wish.tag} size="small" />
                  </Box>
               </DialogContent>
               <DialogActions sx={{ alignItems: 'flex-end', }}>
                  {/* <Grid xs={1.5} sx={{ m: 1 }}>
                     <Avatar sx={{ width: 30, height: 30, }} />
                  </Grid> */}
                  <Grid item xs={12}>
                     {(typeof window !== "undefined") &&

                        <ReactQuillEditor
                           theme="bubble"
                           placeholder='留言'
                           //placeholder={`以${props.currentUser}新增留言`}
                           style={{
                              minHeight: 40,
                              border: 'solid',
                              borderRadius: 8,
                              margin: 8,
                              borderColor: '#9a9a9a',
                           }}
                        />}
                  </Grid>
                  <IconButton><SendIcon sx={{ fontSize: 20, pb: 0.2 }} /></IconButton>
               </DialogActions>
            </Dialog>
         </div>
      )
   }
export default WishDetails;