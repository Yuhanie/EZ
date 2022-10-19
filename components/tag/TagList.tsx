import Image from 'next/image';
import Link from 'next/link';
// import tagPic from '/public/pic/test1.jpeg'

import { Button, TableCell, TableRow } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Tag } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';

import { useRouter } from 'next/router'

// const Post = () => {
//     const router = useRouter()
//     const {tag} = router.query
//       return <p>tag:{tag}</p>
// }

// type Props = {
//   tag: Tag;
// };

// const TagList: React.FC<Props> = (props) => {
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

  

//   return (
//   <div>
  
//   <div className={styles.tag} key={props.tag.name}>
    
//     <h2><Link href={`/articleClassification/${props.tag.name}`}>{props.tag.name}</Link></h2>
//     {/* <Image className={styles.userPhoto} src={tagPic} alt="user" /> */}
      

//   </div>
//   </div>
//   );
// };
// export default TagList;

export default function Page() {
  const router = useRouter()
  const {tag} = router.query

  return (
    <button type="button" className={styles.tag} onClick={() => router.push(`/articleClassification/${tag}`)}>
      <h2><Link href={`/articleClassification/${tag}`}>{tag}</Link></h2>
    </button>
  )
}