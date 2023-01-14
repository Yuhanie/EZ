import { Article } from "../../interfaces/entities";
import Image from "next/image";
// import React from "react";
import React,{useEffect, useState} from 'react';
import warning from '../../public/pic/warning.jpg';
import styles from "/styles/Home.module.css";
import Button from "@mui/material/Button";
import { doc, getDoc } from "firebase/firestore";
// import { db } from "firebase/firestore";

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



// const docRef = doc(db, "English", "1");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }


// useEffect(() => {
//   async function fetchData() {
//     const querySnapshot = await getDoc(collection(db, "English"));
//     const temp: any[] = [];
//     querySnapshot.forEach((doc) => {
//       temp.push(doc.data());
//       console.log(`${doc.id} => ${doc.data().question}`);
//     });
//     setExams(() => [...temp]);
//   }
//   fetchData();
//   // eslint-disable-next-line
// }, []);


type Props = {
  article:Article,
  open: boolean;
  setOpen(open: boolean): void;
};

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


const ArticleDetails: React.FC<Props> = (props) => {

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    
    <div className={styles.container}>
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>{props.article.title}</DialogTitle>

          <DialogContent>
            <Stack spacing={2}>
            {props.article.content}
            </Stack>



            <div style={{ padding: 14 }} className="App">
            
      <h2><Image src={warning}/>版本疑慮</h2>
      <div className={styles.yu}>這篇文章已經不符合現在的版本或者無法使用</div><br/>
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp"/>
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>

      <Paper style={{ padding: "40px 20px", marginTop: 100 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp"  />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp" />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp"  />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
      <Paper style={{ padding: "40px 20px", marginTop: 10 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar alt="Remy Sharp"  />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Michel Michel</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
              posted 1 minute ago
            </p>
          </Grid>
        </Grid>
      </Paper>
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
  );
};

export default ArticleDetails;