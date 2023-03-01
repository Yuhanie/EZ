import { Article } from "../../interfaces/entities";
import Image from "next/image";
// import React from "react";
import React,{useEffect, useState} from 'react';
import router from 'next/router';
import {useRouter} from "next/router"
import warning from '../../public/pic/warning.jpg';
import styles from "/styles/Home.module.css";
import Button from "@mui/material/Button";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, Doc, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from '../../settings/firebaseConfig';
import VI from '@mui/icons-material/Visibility';
import OutlinedInput from '@mui/material/OutlinedInput';
import SendIcon from '@mui/icons-material/Send';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Avatar, 
  Grid, 
  Paper
} from "@mui/material";
import { getApp,getApps, initializeApp } from "firebase/app";



// const docRef = doc(db, "English", "1");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();




// function Model(){
//   const [icoStatus, setIcoStatus] = useState(true)
//   const iconSouCangData = (event, props) => {
//     setIcoStatus(!icoStatus)
//   }
//     return(
//      <>
//                <span className={iconSouCang ? "opts-icon icon-soucang2 soucang-color" : "icon-hide"} onClick={(e) => iconSouCangData(e,props)}></span>
//               <span className={iconSouCang ? "icon-hide" : "opts-icon icon-soucang"} onClick={(e) => iconSouCangData(e,props)}></span>
//      </>
//     )}


const ArticleDetails= (props) => {
  const [comments,setComments]=useState([]);
  const [content, setContent] = useState('');
  const [user, setUser] = useState();
useEffect(() => {





  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "text",
    props.article.docId,"comment"));

    // const temp1= [user];
    // const temp2= [content];
    const temp= [];

    querySnapshot.forEach((doc) => {
      // temp1.push(doc.data());
      // temp2.push(doc.data());
      temp.push(doc.data());
      console.log(`${doc.id} => ${doc.data().content}`);
    });

    // setComments(() => [temp1, temp2]);
    setComments(() => [...temp]);
  }
  fetchData();


   const unsub = onAuthStateChanged(auth, (user)=>{
      setUser(user);
      console.log(user);
    });
  
    return () => {
      unsub();
    }


  // eslint-disable-next-line
}, []);


  




  const handleClose = () => {
    props.setOpen(false);
  };

  async function onSubmit(){
    
    if (typeof window !== "undefined") {

      if (!user) {
        alert("要登入才能新增留言ㄛ!")
        //window.alert("要登入才能新增筆記ㄛ!");

        // <Alert action={
        //   <Button >
        //     UNDO
        //   </Button>
        // }>要登入才能新增筆記ㄛ! </Alert>

        router.push('/login');
      }
      else {
        await addDoc(collection(db, "text",
      props.article.docId,"comment"), {
  
        content,
        userid: user.uid,
  
        user:user.displayName,
  
        //user, 
  
        // createAt:Timestamp.now(),
        // author:{
        //     displayName: auth.currentUser.displayName || "",
        //     photoURL: auth.currentUser.photoURL || "",
        //     uid: auth.currentUser.uid,
        //     email: auth.currentUser.email
        // },
      });
    
  
        

      }


    }









    // console.log(tagName);
    // alert(user.uid)
    // alert(user.email)        
    // await addDoc(collection(db, "text",
    // props.article.docId,"comment"))
    
    
  }










  const renderComment = (comment, i) => {
    return (
      

      
      
      <div key={comment.content} style={{ padding: 14 }} className="App">
      <Paper style={{ padding: "40px 20px" }}>
      <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
         <Avatar alt="Remy Sharp" />
          </Grid>
         <Grid  justifyContent="left" item xs zeroMinWidth>
         <h4 style={{ margin: 0, textAlign: "left" }}>{comment.user}</h4>
         <p style={{ textAlign: "left" }}>
          {comment.content}
          </p>
         <p style={{ textAlign: "left", color: "gray" }}>
         {/* posted 1 minute ago */}
          </p>
         
        
         
         

        
      </Grid>
      </Grid>

      </Paper>
      </div>
    );
  };

return(
  <div className={styles.container}>
    <Dialog open={props.open} onClose={handleClose}>
    <DialogTitle><a href={props.article.link}>{props.article.title}</a>
    
      <Stack spacing={1} className={styles.view}>
      <VI/>
      <div className={styles.views}>{props.article.count}</div>
           
           
            </Stack>
    
    
    </DialogTitle>
  
    
    
    <DialogContent>
    
      
      <Stack spacing={1}>
           {/* {props.article.content} */}
           <div className={styles.card3}>
            <a href={props.article.link}>{props.article.content.substring(0, 165)}{props.article.content.length>165?"...":""}</a>
           </div>

            </Stack>
            
            <div style={{ padding: 14 }} className="App">
            {props.article.content.length>180&&
            <h2><Image alt="版本疑慮" src={warning}/>版本疑慮</h2>}
      
           <div className={styles.yu}>{props.article.content.length>180?"這篇文章已經不符合現在的版本或者無法使用":""}</div>
            {comments.map(renderComment)}

            </div>
            {user&&user.displayName}
        <OutlinedInput onChange={(e) => setContent(e.target.value)} onClick={onSubmit}/>
        <Button variant="contained"  endIcon={<SendIcon />} onClick={onSubmit}>
        </Button>

      </DialogContent>


      <DialogActions>
             <Button color="secondary" variant="contained" onClick={handleClose}>
              愛心
            </Button>
           <Button color="secondary" variant="contained" onClick={handleClose}>
              儲存
            </Button>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              分享
            </Button>

            <Button color="primary" variant="contained" onClick={handleClose}>
              關閉
            </Button>


          </DialogActions> 








    </Dialog>

  </div>



)
  // return (
    
  //   <div className={styles.container}>
  //       <Dialog open={props.open} onClose={handleClose}>
  //         <DialogTitle>{props.article.title}</DialogTitle>

  //         <DialogContent>
  //           <Stack spacing={2}>
  //           {props.article.content}
  //           </Stack>



  //           <div style={{ padding: 14 }} className="App">
            
  //     <h2><Image src={warning}/>版本疑慮</h2>
      
  //     <div className={styles.yu}>這篇文章已經不符合現在的版本或者無法使用</div><br/>
  //     <Paper style={{ padding: "40px 20px" }}>
  //       <Grid container wrap="nowrap" spacing={2}>
  //         <Grid item>
  //           <Avatar alt="Remy Sharp" />
  //         </Grid>
  //         <Grid justifyContent="left" item xs zeroMinWidth>
  //           <h4 style={{ margin: 0, textAlign: "left" }}>aaa</h4>
  //           <p style={{ textAlign: "left" }}>
              
              
           
            
  //           </p>
  //           <p style={{ textAlign: "left", color: "gray" }}>
  //             posted 1 minute ago
  //           </p>
  //         </Grid>
  //       </Grid>
  //       <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
  //       </Paper>
  //       </div>





            
  //         </DialogContent>
  //         <DialogActions>
  //           <Button color="secondary" variant="contained" onClick={handleClose}>
  //             愛心
  //           </Button>
  //           <Button color="secondary" variant="contained" onClick={handleClose}>
  //             儲存
  //           </Button>
  //           <Button color="secondary" variant="contained" onClick={handleClose}>
  //             分享
  //           </Button>

  //           <Button color="primary" variant="contained" onClick={handleClose}>
  //             關閉
  //           </Button>








            
  //         </DialogActions>
  //       </Dialog>
  //   </div>
  // );
};

export default ArticleDetails;