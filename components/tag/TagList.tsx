import Image from 'next/image';
import Link from 'next/link';
// import tagPic from '/public/pic/test1.jpeg'

import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Tag, MajorTag } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';

//firebase
import { firebaseConfig } from '../../settings/firebaseConfig';
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { query, orderBy, limit, where } from "firebase/firestore";
import { arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, addDoc } from "firebase/firestore";


//利用prop接值
/***
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
    <div>
      <div className={styles.tag} key={props.tag.name}>
        <Typography sx={{cursor:"pointer"}}>
          <Link passHref href={`/articleClassification/${props.tag.name}`} ><Image width="80%" height="80%" src={"/pic/" + props.tag.pic} alt="tags" /></Link>
        </Typography>
      </div>
      <h4 className={styles.tag_text}><Link href={`/articleClassification/${props.tag.name}`} >{props.tag.name}</Link></h4>
    </div>
  );
};
export default TagList;
***/

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

const TagList: React.FC = () =>{
  const [tagsList, setTagsList] = useState<Tag[]>([]);

 
  useEffect(() => {
    const getTagList = async () => {
      try {
        const tagsRef = collection(db, 'tag');
        const data = await getDocs(tagsRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData);
        //setTagsList(filteredData);
      } catch (error) {
        console.log(error);
      }

    }
    getTagList();
  }, []);

  return (
    <div>

      <div>
        {tagsList.map((tag) => (
          <div className={styles.tag} key={tag.name}>
            <Typography sx={{ cursor: "pointer" }}>
              <Link passHref href={`/articleClassification/${tag.name}`} ><Image width="80%" height="80%" src={"/pic/" + tag.pic} alt="tags" /></Link>
            </Typography>
          </div>

        ))}
      </div>
      {/* <h4 className={styles.tag_text}><Link href={`/articleClassification/${props.tag.name}`} >{props.tag.name}</Link></h4> */}

    </div>
  )
}
export default TagList;