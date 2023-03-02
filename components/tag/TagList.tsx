import Image from 'next/image';
import Link from 'next/link';
// import tagPic from '/public/pic/test1.jpeg'

import { Button, TableCell, TableRow } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Tag } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';

type Props = {
  tag: Tag;
};

const TagList: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
  <div >
    <div className={styles.tag} key={props.tag.name}>
    
      <Link  passHref href={`/articleClassification/${props.tag.name}`} ><><Image width="80%" height="80%" src={"/pic/"+props.tag.pic} alt="user" /></></Link>
      
      {/* <div className={styles.tag2}>
        
    </div> */}
    </div>
    <h4 className={styles.tag_text}><Link href={`/articleClassification/${props.tag.name}`} >{props.tag.name}</Link></h4>
  </div>
  );
};
export default TagList;