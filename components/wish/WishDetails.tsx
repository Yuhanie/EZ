import * as React from 'react';
import { useEffect, useState, useMemo } from "react";
import dynamic from 'next/dynamic';

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
import { Wish, Profile, Comment } from '../../interfaces/entities';
import { firebaseConfig } from '../../settings/firebaseConfig';
import { arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, addDoc, query, orderBy, serverTimestamp, } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { ReactPropTypes } from 'react';
import { ChatBubble } from '@mui/icons-material';
import router from 'next/router';
import WishComment from './WishComment';


const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

type Props = {
   wish: Wish;
   Comment: Comment;
   update: Function;
   open: boolean;
   setOpen: (open: boolean) => void;
   //currentUser: string;
};

const WishDetails:
   React.FC<Props> = (props) => {
      const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
      const [profile, setProfile] = useState<Profile>();
      const [comments, setComments] = useState<Comment[]>();
      const [user, setUser] = useState<User>();
      const [edited, setEdited] = useState<number>(0);
      const [deleted, setDeleted] = useState<number>(0);
      const [content, setContent] = useState("");
      const ReactQuillEditor = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

      useEffect(() => {
         async function fetchData() {

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
               // let data = { ...doc.data(), id: doc.id };
               temp.push({
                  docId: doc.id,
                  content: doc.data().content,
                  user: doc.data().user,
                  userid: doc.data().userid,
                  heart: doc.data().heart,
                  timestamp: doc.data().timestamp,
               });
               // console.log("data:", data);
            });

            // setComments(() => [temp1, temp2]);
            setComments([...temp]);
         }
         fetchData();
         // console.log("user:", user);
         // console.log("article:", props.article);

         // eslint-disable-next-line
      }, [edited, deleted]);

      useEffect(() => {
         // async function fetchData() {
         //     console.log("comment:", props.comment);

         // }
         // fetchData();


         const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
               setUser(user);
               // setHeart(user);
               console.log("user", user);
            }
         });

         return () => {
            unsub();
         };

         // eslint-disable-next-line
      }, [edited, deleted]);

      const handleClose = () => {
         props.setOpen(false);
      };

      async function onSubmit() {
         if (typeof window !== "undefined") {
            if (!user) {
               alert("要登入才能新增留言ㄛ!");
               router.push("/login");
            } else {
               await addDoc(collection(db, "wish", props.wish.docId, "comment"), {
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

      const renderComment = (comment: Comment) => {
         return (
            <div key={comment.content}>
               {comment && (
                  <div style={{ padding: 14 }} className="App">
                     <WishComment
                        wish={props.wish}
                        comment={comment}
                        update={setEdited}
                        edited={edited}
                     />
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
                  <Box>
                     <Chip label={props.wish.tag} size="small" />
                  </Box>
               </DialogContent>
               <DialogActions sx={{ alignItems: 'flex-end', }}>
                  {comments && comments.map((comment) => renderComment(comment))}
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
                  <IconButton><SendIcon sx={{ fontSize: 20, pb: 0.2 }} onClick={onSubmit} /></IconButton>
               </DialogActions>
            </Dialog>
         </div>
      )
   }
export default WishDetails;