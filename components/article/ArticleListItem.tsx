import Image from 'next/image';
import profilePic from '/public/pic/test1.jpeg'
import { firebaseConfig } from '../../settings/firebaseConfig';
import { getApp, getApps, initializeApp } from "firebase/app";
import { arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, addDoc } from "firebase/firestore";
import { Button, Menu, MenuItem, TableCell, TableRow } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import ArticleDetails from "./ArticleDetails";
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

const ArticleListItem:
  React.FC<Props> = (props) => {
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>();
    const [count, setCount] = useState(props.article.heart ? props.article.heart.length : 0);
    const [bookCount, setBookCount] = useState(props.article.bookmark ? props.article.bookmark.length : 0);
    const [timestamp, setTimestamp] = useState([]);
    const [liked, setLiked] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [bookMarked, setBookMarked] = useState(false);
    // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    // const open = Boolean(anchorEl);
    // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    //   setAnchorEl(event.currentTarget);
    // };
    // const handleClose = () => {
    //   setAnchorEl(null);
    // };



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
              alert('remove')
              updateDoc(ref, {
                bookmark: arrayRemove(currentUser.uid)
              });
              setBookMarked(false)
              setBookCount(bookCount - 1)
            } else {
              alert('added')
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
          //window.alert("要登入才能新增筆記ㄛ!");

          // <Alert action={
          //   <Button >
          //     UNDO
          //   </Button>
          // }>要登入才能新增筆記ㄛ! </Alert>

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
              alert('remove')
              updateDoc(ref, {
                heart: arrayRemove(currentUser.uid)
              });
              setLiked(false)
              setCount(count - 1)
            } else {
              alert('added')
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
          //window.alert("要登入才能新增筆記ㄛ!");

          // <Alert action={
          //   <Button >
          //     UNDO
          //   </Button>
          // }>要登入才能新增筆記ㄛ! </Alert>

          router.push('/login');

        }



      }

    }







    // function heart(){
    //   const ref = doc(db, "text", props.article.docId);
    //   updateDoc(ref,{heart: increment(1)});

    // }  

    return (
      <div>
        <ArticleDetails article={props.article} open={open} setOpen={setOpen} update={props.update} ></ArticleDetails>
        <Card
          sx={{
            // maxWidth: 345,
            width: 340,
            height: 235,
            m: 2,
            spacing: 2,
            borderRadius: 3,
            bgcolor: 'background.paper',
            boxShadow: 1,
          }}
        >
          <CardActionArea sx={{ p: 1, height: 170 }}>
            <CardContent onClick={handleOpen}>
              <Typography gutterBottom variant="h5" component="div" onClick={handleOpen}>
                {props.article.title}
                {/* <MenuItem>
              
            </MenuItem> */}

              </Typography>
              <Typography variant="body2" color="text.secondary" onClick={handleOpen}>
                {props.article.content.substring(0, 65)}{props.article.content.length > 65 ? "..." : ""}
              </Typography>
            </CardContent>
          </CardActionArea>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe"></Avatar>
                }
                title={props.article.user}
                subheader={props.article.timestamp && props.article.timestamp.toDate().toLocaleString()}
                //item 
                sx={{ p: 1.2 }}
              />
            </Box>

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

          </Box>

          {/* <IconButton onClick={handleOpen}><MoreVertIcon sx={{}}/></IconButton> */}






        </Card>

      </div>
    );
  };
export default ArticleListItem;
function setUser(user: import("@firebase/auth").User | null) {
  throw new Error('Function not implemented.');
}
