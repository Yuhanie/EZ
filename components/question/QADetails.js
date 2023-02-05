import { Question } from "../../interfaces/entities";
import Image from "next/image";
// import React from "react";
import React,{useEffect, useState} from 'react';
import warning from '../../public/pic/warning.jpg';
import styles from "/styles/Home.module.css";
import Button from "@mui/material/Button";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { firebaseConfig } from '../../settings/firebaseConfig';
import VI from '@mui/icons-material/Visibility';

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


const QADetails= (props) => {
  const [answers,setAnswers]=useState([])
useEffect(() => {
  async function fetchData() {
    const querySnapshot = await getDocs(collection(db, "question",
    props.question.docId,"answer"));

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
    setAnswers(() => [...temp]);
  }
  fetchData();
  // eslint-disable-next-line
}, []);
  const handleClose = () => {
    props.setOpen(false);
  };

  const renderAnswer = (answer, i) => {
    return (
      

      
      
      <div key={answer.content} style={{ padding: 14 }} className="App">
      <Paper style={{ padding: "40px 20px" }}>
      <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
         <Avatar alt="Remy Sharp" />
          </Grid>
         <Grid  justifyContent="left" item xs zeroMinWidth>
         <h4 style={{ margin: 0, textAlign: "left" }}>{answer.user}</h4>
         <p style={{ textAlign: "left" }}>
          {answer.content}
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
    <DialogTitle>{props.question.title}
    
      <div spacing={1} className={styles.view}>
      <VI/>
      <div className={styles.views}>{props.question.count}</div>
 </div>
    
    
    </DialogTitle>
    <div>
  <a className={styles.users}>使用者{props.question.user}發布</a>
  </div>
    <DialogContent>

      <Stack spacing={2}>
           {props.question.content}
           
            </Stack>
            
            <div style={{ padding: 14 }} className="App">
            <h2>回答</h2>
      
           {/* <div className={styles.yu}>這篇文章已經不符合現在的版本或者無法使用</div><br/> */}
            {answers.map(renderAnswer)}

            </div>
            
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

export default QADetails;