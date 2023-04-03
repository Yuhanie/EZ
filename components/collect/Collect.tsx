import Image from 'next/image';
import profilePic from '/public/pic/test1.jpeg'
import { firebaseConfig } from '../../settings/firebaseConfig';
import { getApp, getApps, initializeApp } from "firebase/app";
import { arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, addDoc } from "firebase/firestore";
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Article } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';
//import Heart from '@mui/icons-material/Heart';
import Heart from '@mui/icons-material/Favorite';
import Bookmark from '@mui/icons-material/Bookmark';
import router from 'next/router';
import { useRouter } from "next/router"
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import { CardActionArea } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';


const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

type Props = {
  article: Article;
  update: Function;
};

const Collect:
  React.FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>();
    const [count, setCount] = useState(props.article.heart ? props.article.heart.length : 0);
    const [bookCount, setBookCount] = useState(props.article.bookmark ? props.article.bookmark.length : 0);
    const [timestamp, setTimestamp] = useState([]);
    const [liked, setLiked] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [bookMarked, setBookMarked] = useState(false);




    const handleOpen = () => {
      setOpen(true);
      const ref = doc(db, "text", props.article.docId);
      updateDoc(ref, { count: increment(1) });

    };

    const handleClose = () => {
      setOpen(false);
    };
    const setHeart = async (user: User) => {
      const ref = doc(db, "text", props.article.docId);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        if (user) {
          if (props.article.heart && docSnap.data().heart.includes(user.uid)) {
            setLiked(true)
            console.log(props.article.title + 'liked')
          }
          else {

            setLiked(false)
            console.log(props.article.title + 'unliked')

          }
        }

      }
    }

    const setBookmark = async (user: User) => {
      const ref = doc(db, "text", props.article.docId);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        if (user) {
          if (props.article.bookmark && docSnap.data().bookmark.includes(user.uid)) {
            setBookMarked(true)
            console.log(props.article.title + 'bookmarked')
          }
          else {

            setBookMarked(false)
            console.log(props.article.title + 'bookmarked')

          }
        }

      }
    }



    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('currentUser', user)
          setCurrentUser(user);
          setHeart(user);
          setBookmark(user);
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
          const ref = doc(db, "text", props.article.docId);
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
          const ref = doc(db, "text", props.article.docId);
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

    const changeStatus = function () {
      router.push('/introduction');
    }



    return (
      <>
      <Grid >
          <Card sx={{ m: 2, width: 300 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {props.article.title}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {props.article.content.substring(0, 30)}{props.article.content.length > 30 ? "..." : ""}
              </Typography>
              {/* <Stack direction="row" spacing={1}>
                <Chip label="tag 1" component="a" href="#chip" />
                <Chip label="tag 2" component="a" href="#chip" />
                <Chip label="tag 3" component="a" href="#chip" />
              </Stack> */}
            </CardContent>
          </Card>
      </Grid>
</>
    );
  };
export default Collect;
function setUser(user: import("@firebase/auth").User | null) {
  throw new Error('Function not implemented.');
}


