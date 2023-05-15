import Image from 'next/image';
import Link from 'next/link';
// import tagPic from '/public/pic/test1.jpeg'
import Box from '@mui/material/Box';
import { Button, TableCell, TableRow } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { Tag, MajorTag, Profile } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';
import { ListItem } from "@mui/material";
import Chip from '@material-ui/core/Chip';

type Props = {
  MajorTag: Profile;
};

const MajorTagList: React.FC<Props> = (props) => {
  //   const [open, setOpen] = useState(false);

  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  const renderMajorTagTest = (majortag: string, i: number) => {
    return (
      <Link key={majortag} href={`/note`}>
        <Chip label={majortag} />
      </Link>
    );
  };

    
    return (
      <ListItem>
        {/* <Link href={`/note`}> */}
          {(props.MajorTag.majortag&&props.MajorTag.majortag.map(renderMajorTagTest))}
        {/* </Link> */}
      </ListItem>
    );
};
export default MajorTagList;