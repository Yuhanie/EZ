import { useState } from "react";
import { miniTag } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';

type Props = {
  miniTag: miniTag;
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
 <div>{props.miniTag.name}</div>
  );
};
export default MiniTags;
