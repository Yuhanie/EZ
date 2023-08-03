import { useState, useEffect } from 'react';

//mui
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

import { Wish } from '../../interfaces/entities';

//firebase
import { firebaseConfig } from '../../settings/firebaseConfig';
import { arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, addDoc } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';


const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

type Props = {
   wish: Wish;
};

const WishListItem:
   React.FC<Props> = (props) => {

      return (

         <Paper
            sx={{
               p: 2,
               margin: 'auto',
               flexGrow: 1,
               backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
         >
            <Grid container spacing={2}>
               <Grid item>
                  <CardHeader
                     avatar={
                        <Avatar />
                     }
                     title={'minnn'}
                     subheader={'2023/02/03'}
                     //item 
                     sx={{ p: 1.2 }}
                  />
               </Grid>

               <Grid item xs={12} md={8} container>
                  <Grid item direction="column">
                     <Grid item >
                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                           {props.wish.content}
                        </Typography>
                     </Grid>
                  </Grid>
               </Grid>

               <Grid item direction="column">
                  <Grid item textAlign='center'>
                     <Typography sx={{ cursor: 'pointer' }} variant="body2">
                        數量
                     </Typography>
                  </Grid>
                  <Grid item >
                     <Button
                        color="info"
                        disabled={false}
                        size="small"
                        variant="contained"
                        sx={{ borderRadius: 10 }}
                     >
                        問問
                     </Button>
                  </Grid>
               </Grid>
            </Grid>
         </Paper>

      )

   }

export default WishListItem;