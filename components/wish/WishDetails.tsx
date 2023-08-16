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
import { Wish, Profile } from '../../interfaces/entities';
import { firebaseConfig } from '../../settings/firebaseConfig';
import { arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, addDoc, } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { ReactPropTypes } from 'react';
import { ChatBubble } from '@mui/icons-material';


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

      const handleClose = () => {
         props.setOpen(false);
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