import { useState, useEffect, useMemo } from 'react';
import router from 'next/router';
import WishDetails from './WishDetails';

//mui
import { Box, ButtonBase } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

import { Wish, Profile } from '../../interfaces/entities';

//firebase
import { firebaseConfig } from '../../settings/firebaseConfig';
import { arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, addDoc, } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';

import dynamic from "next/dynamic";
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.core.css';


const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

type Props = {
   
   wish: Wish;
   update: Function;
};




const WishListItem:
   React.FC<Props> = (props) => {
      const [open, setOpen] = useState(false);
      const [currentUser, setCurrentUser] = useState<User>();
      const [heartCount, setHeartCount] = useState(props.wish.heart ? props.wish.heart.length : 0);
      const [liked, setLiked] = useState(false);
      const [profile, setProfile] = useState<Profile>();
      const [character, setCharacter] = useState("學習者");
      const [decide, setDecide] = useState<boolean>(props.wish.solved);
      const [edited, setEdited] = useState(0);
      const ReactQuillEditor = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);


      const handleOpen = () => {
         setOpen(true);
      }

      const handleClose = () => {
         setOpen(false);
      };

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
               const reff = doc(db, "profile", props.wish.userid);
               const docSnapshot = await getDoc(reff);
if (docSnapshot.exists()){
   setProfile({ photoURL: docSnapshot.data().photoURL, user: docSnapshot.data().user, email: docSnapshot.data().email, character: docSnapshot.data().character ? docSnapshot.data().character : "學習者", majortag: docSnapshot.data().majortag ? docSnapshot.data().majortag : [] });

}
               
               const ref = doc(db, "profile", user.uid);
               const docSnap = await getDoc(ref);

               if (
                  docSnap.exists() &&
                  docSnap.data().character &&
                  docSnap.data().character === "專家"
               ) {
                  setCharacter("專家");
               } else {
                  setCharacter("學習者");
               }

               // const querySnapshot = await getDoc(doc(db, "profile", props.article.userid));
               // if ((querySnapshot).exists()) {
               //    setProfile({ photoURL: querySnapshot.data().photoURL, user: querySnapshot.data().user, email: querySnapshot.data().email, character: querySnapshot.data().character ? querySnapshot.data().character : "學習者", majortag: querySnapshot.data().majortag ? querySnapshot.data().majortag : [] });
               // }

            }
            //console.log(user);
         });



         return () => {
            unsub();
         }

      }, [liked, edited])


      const heart = async function () {
         if (typeof window !== "undefined") {
            if (currentUser) {
               const ref = doc(db, "wish", props.wish.docId);
               const docSnap = await getDoc(ref);
               if ((docSnap.exists())) {
                  if (docSnap.data().heart.includes(currentUser.uid)) {
                     // alert('remove')
                     updateDoc(ref, {
                        heart: arrayRemove(currentUser.uid),
                        heartCount: heartCount-1
                     });
                     setLiked(false)
                     setHeartCount(heartCount - 1)
                  } else {
                     // alert('added')
                     updateDoc(ref, {
                        heart: arrayUnion(currentUser.uid),
                        heartCount: heartCount+1
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

      const Intro = (uid: any) => {
         return (
           <div>

               <CardHeader
                 avatar={
                   <Avatar src={props.wish.userid && profile && profile.photoURL && profile.photoURL}>
                     {/* {props.article.userid && profile && profile.photoURL &&
                     <img className={styles.googlephoto_profile} src={profile.photoURL} />} */}
                   </Avatar>
                 }
                 // title={(props.article.userid==currentUser?.uid?profile?.user:props.article.user)}
                 title={(profile?.user)}
                 subheader={props.wish.timestamp && props.wish.timestamp.toDate().toLocaleDateString()}
                 //item 
                 sx={{ p: 1.2 }}
               ></CardHeader>
               {/* {character=="專家"&&expertIcon()} */}

           </div>
         );
       };

      const solved = async function () {
         // let status = e.target.value
         // console.log("outdateE", status)
         if (typeof window !== "undefined") {
            if (currentUser) {
               const ref = doc(db, "wish", props.wish.docId);
               const docSnap = await getDoc(ref);
               if ((docSnap.exists())) {
                  await updateDoc(doc(db, "wish", props.wish.docId), {
                     solved: true
                  });
                  setEdited(edited + 1)
                  setDecide(true);

               }
            }
         }

         else {
            alert("請登入");
         }
      };

      function solvedIcon() {
         return (
            <div>
               已實現
            </div>
         )
      }

      //btn
      function DefaultBtn() {
         return (
            <Button
               color="info"
               size="small"
               variant="outlined"
               sx={{ borderRadius: 10, mb: 0.5, fontSize: 10, p: 0.4 }}
            >
               我也想問
            </Button>
         )
      }

      function SolvedBtn() {
         return (
            <Button
               color="info"
               size="small"
               variant="outlined"
               sx={{ borderRadius: 10, fontSize: 10 }}
               onClick={solved}
            >
               已實現
            </Button>
         )
      }

      function ClickedBtn() {
         return (
            <Button
               color='info'
               size="small"
               variant="contained"
               sx={{ borderRadius: 10, mb: 0.5, fontSize: 10 }}
            >
               取消
            </Button>
         )
      }

      return (
         <div>
            <WishDetails wish={props.wish} open={open} setOpen={setOpen} update={props.update}  ></WishDetails>
            <Paper
               sx={{
                  display: 'flex',
                  p: 2,
                  marginBottom: 2,
                  flexGrow: 1,
                  justifyContent: 'center',
                  backgroundColor: (theme) =>
                     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
            >
               <Grid container spacing={2} >
                  <Grid item md={2.5}>
                  {/* {Intro(props.wish.userid)} */}
                     <CardHeader
                     avatar={
                       <Avatar src={props.wish.userid && profile && profile.photoURL&& profile.photoURL}>
                         {/* {props.article.userid && profile && profile.photoURL &&
                         <img className={styles.googlephoto_profile} src={profile.photoURL} />} */}
                       </Avatar>
                     }
                        title={props.wish.user}
                        subheader={props.wish.timestamp && props.wish.timestamp.toDate().toLocaleDateString()}
                        //item 
                        sx={{ p: 1.2,size:"small" }}
                     />
                  </Grid>

                  <Grid item xs={12} md={7.5} container sx={{ cursor: 'pointer' }} onClick={handleOpen}>
                     <Grid item direction="column">
                        <Grid item >
                           {(typeof window !== "undefined") &&
                              <ReactQuillEditor
                                 theme="bubble"
                                 style={{ height: 50 }}
                                 readOnly={true}
                                 value={props.wish.content}
                              />
                           }
                        </Grid>
                     </Grid>
                  </Grid>

                  <Grid item display='flex' justifyContent='center' alignItems='center'>
                     <Grid item >
                        {decide == true && solvedIcon()}
                     </Grid>
                     {decide == false && <Grid item md={6}>
                        <Typography sx={{ pr: 2 }} variant="body2">
                           {heartCount}
                        </Typography>
                     </Grid>}
                     <Grid item display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                        {decide == false && <ButtonBase onClick={heart} sx={{ borderRadius: 10 }} >
                           {liked ? <ClickedBtn /> : <DefaultBtn />}
                        </ButtonBase>}
                        {decide == false && <ButtonBase sx={{ borderRadius: 10 }}>
                           {character === "專家" && SolvedBtn()}
                        </ButtonBase>}
                     </Grid>
                  </Grid>

               </Grid>
            </Paper>
         </div >
      )

   }

export default WishListItem;