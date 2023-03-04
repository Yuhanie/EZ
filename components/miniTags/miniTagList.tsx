import Image from 'next/image';
import Link from 'next/link';
// import tagPic from '/public/pic/test1.jpeg'

import { Button, TableCell, TableRow } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { miniTag, Tag } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';

type Props = {
  minitag: miniTag;
  tag: string;
};

const MiniTagList: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
  <div >
    <h4 className={styles.tag_text}><Link href={`/articleClassification/${props.tag}/${props.minitag.name}`} >{props.minitag.name}</Link></h4>
  </div>
  );
};
export default MiniTagList;