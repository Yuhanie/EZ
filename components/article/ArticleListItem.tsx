import Image from 'next/image';
import profilePic from '/public/pic/test1.jpeg'
import { firebaseConfig } from '../../settings/firebaseConfig';
import { getApp,getApps, initializeApp } from "firebase/app";
import { arrayUnion, collection, doc, getDocs, getFirestore, increment, updateDoc } from "firebase/firestore";
import { Button, TableCell, TableRow } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useEffect,  useState } from "react";
import ArticleDetails from "./ArticleDetails";
import { Article } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';
//import Heart from '@mui/icons-material/Heart';
import Heart from '@mui/icons-material/Favorite';
import Bookmark from '@mui/icons-material/Bookmark';
import router from 'next/router';
import { useRouter } from "next/router"
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';


const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

type Props = {
  article: Article;
};

const ArticleListItem:
 React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();
  
  

  const handleOpen = () => {
    setOpen(true);
    const ref = doc(db, "text", props.article.docId);
    updateDoc(ref,{count: increment(1)});
  
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user)=>{
      if (user) {
        setCurrentUser(user);
      }
      console.log(user);
    });

    return () => {
      unsub();
    }
  }, []);

  

  const heart = function () {
    if (typeof window !== "undefined") {
      
      if (currentUser) {

        

        
        const ref = doc(db, "text", props.article.docId);
        updateDoc(ref, {
          heart: arrayUnion(currentUser.uid)
      });
      }
      else {
        alert("要登入才能按讚ㄛ!")
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
  <ArticleDetails article={props.article} open={open} setOpen={setOpen} ></ArticleDetails>
  <a onClick={handleOpen}>
  <div className={styles.card} key={props.article.title}>
    
    {/* <h2><a href={props.article.link}>{props.article.title}</a></h2> */}
    <h2><a onClick={handleOpen}>{props.article.title}</a></h2>
    {/* <a href={props.article.link} target="_blank" rel="noreferrer"> */}
      <p onClick={handleOpen}>{props.article.content.substring(0, 65)}{props.article.content.length>65?"...":""}</p>
    {/* </a> */}
    <div className={styles.card2} >
    <Image className={styles.userPhoto} src={profilePic} alt="user" />
      {/* <Image
        className={styles.userPhoto}
        src="/pic/test1.jpeg"
        alt="user"
        width={70}
        height={30}
        // height="50px"
        // width="70px"
      /> */}
      <p className={styles.userName}>{props.article.user}</p>
    
      
      {/* <span className={styles.fiveStar} id="five-star"></span> */}
    </div>
     </div></a>
  
    <div className={styles.like}>{props.article.heart?props.article.heart.length:0}</div>
   <div className={styles.Heart} > <Heart  onClick={heart}/></div> 
   <div className={styles.Bookmark} > <Bookmark/></div> 
 
  </div>
  );
};
export default ArticleListItem;
function setUser(user: import("@firebase/auth").User | null) {
  throw new Error('Function not implemented.');
}

