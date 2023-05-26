import Link from 'next/link';
import { MajorTag, Profile } from '../../interfaces/entities';
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
      <a href={`/majorTag/${majortag}`}>
        <Chip label={majortag}/>
      </a>
    );
  };

    
    return (
      <ListItem>
          {(props.MajorTag.majortag&&props.MajorTag.majortag.map(renderMajorTagTest))}
      </ListItem>
    );
};
export default MajorTagList;