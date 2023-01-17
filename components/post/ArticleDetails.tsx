import { Article } from "../../interfaces/entities";
// import React from "react";
import React,{useState} from 'react';
import styles from "/styles/Home.module.css";
import Button from "@mui/material/Button";
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
          <DialogTitle><a href={props.article.link}>{props.article.title}</a></DialogTitle>

          <DialogContent>
            <Stack spacing={2}>
            {props.article.content.substring(0, 65)}{props.article.content.length>65?"...":""}
            </Stack>
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