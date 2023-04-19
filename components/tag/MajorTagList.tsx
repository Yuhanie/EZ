import Image from 'next/image';
import Link from 'next/link';
// import tagPic from '/public/pic/test1.jpeg'

import { Button, TableCell, TableRow } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Tag, MajorTag, Profile } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';
import { ListItem } from "@mui/material";

type Props = {
    MajorTag: Profile; 
};

const MiniTags: React.FC<Props> = (props) => {
    //   const [open, setOpen] = useState(false);
    
    //   const handleOpen = () => {
    //     setOpen(true);
    //   };
    
    //   const handleClose = () => {
    //     setOpen(false);
    //   };
     
      return (
      <ListItem>{props.MajorTag.majortag}
        {/* <Link href={`/articleClassification/${props.tag.name}`} ></Link> */}
      </ListItem>
      );
    };
    export default MajorTag;