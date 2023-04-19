import React from 'react';
import Image from 'next/image';
// import profilePic from '/public/pic/yuhan.jpg'
import { firebaseConfig } from '../../settings/firebaseConfig';
import { getApp,getApps, initializeApp } from "firebase/app";
import { collection, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { Button, TableCell, TableRow, Tooltip } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';

import QADetails from "./QADetails";
import { Question } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';
//import Heart from '@mui/icons-material/Heart';
import Heart from '@mui/icons-material/Favorite';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Bookmark from '@mui/icons-material/Bookmark';
import router from 'next/router';
import ShareIcon from '@mui/icons-material/Share';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';






const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();


type Props = {
  question: Question;
  update: Function;
};

const QAListItem:
 React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const [count, setCount] = useState(props.question.heart ? props.question.heart.length : 0);
  const [bookCount, setBookCount] = useState(props.question.bookmark ? props.question.bookmark.length : 0);
  const [timestamp, setTimestamp] = useState([]);
  const [liked, setLiked] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookMarked, setBookMarked] = useState(false);
  const [character, setCharacter] = useState("學習者");


  const handleOpen = () => {
    setOpen(true);
    const ref = doc(db, "question", props.question.docId);
    updateDoc(ref,{count: increment(1)});
  
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setHeart = async (user: User) => {
    const ref = doc(db, "text", props.question.docId);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      if (user) {
        if (props.question.heart && docSnap.data().heart.includes(user.uid)) {
          setLiked(true)
          console.log(props.question.title + 'liked')
        }
        else {

          setLiked(false)
          console.log(props.question.title + 'unliked')

        }
      }

    }
  }

  const setBookmark = async (user: User) => {
    const ref = doc(db, "text", props.question.docId);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      if (user) {
        if (props.question.bookmark && docSnap.data().bookmark.includes(user.uid)) {
          setBookMarked(true)
          console.log(props.question.title + 'bookmarked')
        }
        else {

          setBookMarked(false)
          console.log(props.question.title + 'bookmarked')

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
        setBookmark(user);
        
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
      }
    //console.log(user);
  });

  return () => {
    unsub();
  }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liked, bookMarked]);

  const bookmark = async function () {
    if (typeof window !== "undefined") {
      if (currentUser) {
        const ref = doc(db, "text", props.question.docId);
        const docSnap = await getDoc(ref);
        if ((docSnap.exists())) {
          if (docSnap.data().bookmark.includes(currentUser.uid)) {
            // alert('remove')
            updateDoc(ref, {
              bookmark: arrayRemove(currentUser.uid)
            });
            setBookMarked(false)
            setBookCount(bookCount - 1)
          } else {
            // alert('added')
            updateDoc(ref, {
              bookmark: arrayUnion(currentUser.uid)
            });
            setBookMarked(true)
            setBookCount(bookCount + 1)
          }
        }
      }
      else {
        alert("要登入才能收藏ㄛ!")
        router.push('/login');
      }
    }
  }

  const heart = async function () {
    if (typeof window !== "undefined") {
      if (currentUser) {
        const ref = doc(db, "text", props.question.docId);
        const docSnap = await getDoc(ref);
        if ((docSnap.exists())) {
          if (docSnap.data().heart.includes(currentUser.uid)) {
            // alert('remove')
            updateDoc(ref, {
              heart: arrayRemove(currentUser.uid)
            });
            setLiked(false)
            setCount(count - 1)
          } else {
            // alert('added')
            updateDoc(ref, {
              heart: arrayUnion(currentUser.uid)

            });
            setLiked(true)
            setCount(count + 1)


          }
        }


      }

      else {
        alert("要登入才能收藏ㄛ!")
        router.push('/login');

      }



    }

  }
  





  const intro = (uid:any) => {
    router.push('/introduction?userId=' + uid);
  }

  const Intro = (uid:any) => {
    return (
      <div>
        <Box onClick={() => intro(uid)}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe"></Avatar>
            }
            title={props.question.user}
            subheader={props.question.timestamp && props.question.timestamp.toDate().toLocaleString()}
            //item 
            sx={{ p: 1.2 }}
          />
          {/* {character=="專家"&&expertIcon()} */}
        </Box>
      </div>
    );
  };

// function heart(){
//   const ref = doc(db, "text", props.article.docId);
//   updateDoc(ref,{count: increment(1)});
  
// }  

  return (
    <div>
          {/* <div className={styles.QAmenu}> */}

    <QADetails question={props.question} open={open} setOpen={setOpen} update={props.update} ></QADetails>
    <Card
          sx={{
            // maxWidth: 345,
            width: 770,
            maxheight: 200,
            m: 2,
            spacing: 2,
            borderRadius: 3,
            bgcolor: 'background.paper',
            boxShadow: 1,
          }}
        >
      <Box display="flex" justifyContent="space-between">
          {/* <Box onClick={changeStatus}> */}
          <Box>
          {Intro(props.question.userid)}
        </Box>
      <CardHeader>
        
        
        title={props.question.user}
        subheader={props.question.timestamp && props.question.timestamp.toDate().toLocaleString()}
      </CardHeader>
      </Box>
      {/* </Box> */}
      <CardActionArea sx={{ p: 1, height: 170 }}>
            <CardContent onClick={handleOpen}>
              <Typography gutterBottom variant="h5" component="div" onClick={handleOpen}>
                {props.question.title}
                
                </Typography>
              <Typography variant="body2" color="text.secondary" onClick={handleOpen}>

                {props.question.content}
                </Typography>
              </CardContent>
                {/* <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  
                </CardActions>
                */}
      </CardActionArea>
       <Box display="flex" sx={{ pr: 2 }}>
          <CardActions sx={{ p: 0 }}>
            <IconButton aria-label="heart" size="medium" onClick={heart} sx={liked ? { color: 'error.main' } : { color: 'text.disabled' }} >
              <Heart />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
              {count}
            </Typography>

          </CardActions>
          <CardActions sx={{ p: 0 }}>
            <IconButton aria-label="bookmark" size="medium" onClick={bookmark} sx={bookMarked ? { color: 'info.main' } : { color: 'text.disabled' }}>
              <Bookmark />
            </IconButton>
            <Typography variant="body2" color="text.secondary">
             {bookCount}
            </Typography>
          </CardActions>
        </Box>

     
    </Card>
          

    

      {/* <IconButton onClick={handleOpen}><MoreVertIcon sx={{}}/></IconButton> */}






{/* </div> */}
{/* <br/> */}
  </div>
  );
};
export default QAListItem;
function setUser(user: import("@firebase/auth").User | null) {
  throw new Error('Function not implemented.');
}


