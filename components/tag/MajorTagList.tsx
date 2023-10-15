import Link from "next/link";
import { MajorTag, Profile } from "../../interfaces/entities";
import styles from "../../styles/Home.module.css";
import { Box, ListItem } from "@mui/material";
import Chip from "@material-ui/core/Chip";

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
      <Box sx={{mr:0.5,mb:0.8}}>
        <a href={`/majorTag/${majortag}`}>
          <Chip label={majortag} />
        </a>
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {props.MajorTag.majortag &&
        props.MajorTag.majortag.map(renderMajorTagTest)}
    </Box>
  );
};
export default MajorTagList;
