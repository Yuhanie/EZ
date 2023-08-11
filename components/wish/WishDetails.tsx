import * as React from 'react';
import { useEffect, useState, useMemo } from "react";


//mui
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CardHeader } from '@mui/material';
import Avatar from '@mui/material/Avatar';


//firebase
import { Wish,Profile } from '../../interfaces/entities';
import { firebaseConfig } from '../../settings/firebaseConfig';
import { arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, addDoc, } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { ReactPropTypes } from 'react';


const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

type Props = {
   wish: Wish;
   update: Function;
   open: boolean;
   setOpen: (open: boolean) => void;
};

const WishDetails:
   React.FC<Props> = (props) => {
      const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
      const [profile, setProfile] = useState<Profile>();

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
               <DialogTitle id="scroll-dialog-title" sx={{minWidth:320,p:1}}>
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
               <DialogContent dividers={scroll === 'paper'} sx={{minHeight:150}}>
                  <DialogContentText
                     id="scroll-dialog-description"
                     tabIndex={-1}
                  >
                     {props.wish.content}
                  </DialogContentText>
               </DialogContent>
               {/* <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleClose}>Subscribe</Button>
               </DialogActions> */}
            </Dialog>
         </div>
      )
   }
export default WishDetails;