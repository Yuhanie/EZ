import Image from 'next/image';
import profilePic from '/public/pic/test1.jpeg'

import { Button, TableCell, TableRow } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import ArticleDetails from "./ArticleDetails";
import { Article } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';

type Props = {
  article: Article;
};

const ArticleListItem: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
  <div>
  <ArticleDetails article={props.article} open={open} setOpen={setOpen}></ArticleDetails>
  <div className={styles.card} key={props.article.title}>
    
    <h2>{props.article.title}</h2>
    <p onClick={handleOpen}>{props.article.content.substring(0, 65)}{"..."}</p>
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
      <p>{props.article.user}</p>
      <span className={styles.heart} id="heart"></span>
      <span className={styles.fiveStar} id="five-star"></span>
    </div>
      

  </div>
  </div>
  );
};
export default ArticleListItem;
