import { useState, useEffect } from 'react';
import router from 'next/router';

//mui
import { Box, ButtonBase } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

import { Wish } from '../../interfaces/entities';

//firebase
import { firebaseConfig } from '../../settings/firebaseConfig';
import { arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, addDoc, } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';


const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

type Props = {
   wish: Wish;
   update: Function;
};




const WishListItem:
   React.FC<Props> = (props) => {
      const [currentUser, setCurrentUser] = useState<User>();
      const [heartCount, setHeartCount] = useState(props.wish.heart ? props.wish.heart.length : 0);
      const [liked, setLiked] = useState(false);

      const setHeart = async (user: User) => {
         const ref = doc(db, "wish", props.wish.docId);
         const docSnap = await getDoc(ref);
         if (docSnap.exists()) {
            if (user) {
               if (props.wish.heart && docSnap.data().heart.includes(user.uid)) {
                  setLiked(true)
                  console.log(props.wish.content + 'liked')
               }
               else {

                  setLiked(false)
                  console.log(props.wish.content + 'unliked')

               }
            }

         }
      }

      useEffect(() => {
         const unsub = onAuthStateChanged(auth, async (user) => {
            if (user) {
               console.log('currentUser', user)
               setCurrentUser(user);
               setHeart(user);

               const ref = doc(db, "profile", user.uid);
               const docSnap = await getDoc(ref);

               //   if (
               //     docSnap.exists() &&
               //     docSnap.data().character &&
               //     docSnap.data().character === "專家"
               //   ) {
               //     setCharacter("專家");
               //   } else {
               //     setCharacter("學習者");
               //   }

               //   const querySnapshot = await getDoc(doc(db, "profile", props.article.userid));
               //   if ((querySnapshot).exists()) {
               //     setProfile({ photoURL: querySnapshot.data().photoURL, user: querySnapshot.data().user, email: querySnapshot.data().email, character: querySnapshot.data().character ? querySnapshot.data().character : "學習者", majortag: querySnapshot.data().majortag ? querySnapshot.data().majortag : [] });
               //   }

            }
            //console.log(user);
         });



         return () => {
            unsub();
         }

      }, [liked])


      const heart = async function () {
         if (typeof window !== "undefined") {
            if (currentUser) {
               const ref = doc(db, "wish", props.wish.docId);
               const docSnap = await getDoc(ref);
               if ((docSnap.exists())) {
                  if (docSnap.data().heart.includes(currentUser.uid)) {
                     // alert('remove')
                     updateDoc(ref, {
                        heart: arrayRemove(currentUser.uid)
                     });
                     setLiked(false)
                     setHeartCount(heartCount - 1)
                  } else {
                     // alert('added')
                     updateDoc(ref, {
                        heart: arrayUnion(currentUser.uid)

                     });
                     setLiked(true)
                     setHeartCount(heartCount + 1)


                  }
               }
            }

            else {
               alert("  請先登入!")
               router.push('/login');
            }
         }
      }


      //btn
      function DefaultBtn() {
         return (
            <Button
               color="info"
               size="small"
               
               variant="outlined"
               sx={{ borderRadius: 10 }}
            >
               問問
            </Button>
         )
      }

      function ClickedBtn() {
         return (
            <Button
               color='info'
               size="small"
               variant="contained"
               sx={{ borderRadius: 10 }}
            >
               取消
            </Button>
         )
      }

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
                     title={props.wish.user}
                     subheader={props.wish.timestamp && props.wish.timestamp.toDate().toLocaleDateString()}
                     //item 
                     sx={{ p: 1.2 }}
                  />
               </Grid>

               <Grid item xs={12} md={8} container sx={{ cursor: 'pointer' }}>
                  <Grid item direction="column">
                     <Grid item >
                        <Typography variant="body2">
                           {props.wish.content}
                        </Typography>
                     </Grid>
                  </Grid>
               </Grid>

               <Grid item direction="column">
                  <Grid item textAlign='center'>
                     <Typography sx={{ cursor: 'pointer' }} variant="body2">
                        {heartCount}
                     </Typography>
                  </Grid>
                  <Grid item >
                     <ButtonBase onClick={heart} sx={{borderRadius:10}}>
                        {liked ? <ClickedBtn /> : <DefaultBtn />}
                     </ButtonBase>
                  </Grid>
               </Grid>
            </Grid>
         </Paper>

      )

   }

export default WishListItem;