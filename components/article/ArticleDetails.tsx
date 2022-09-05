import { Article } from "../../interfaces/entities";
import React from "react";
import styles from "/styles/Home.module.css";
import Button from "@mui/material/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";

type Props = {
  article:Article,
  open: boolean;
  setOpen(open: boolean): void;
};

const ArticleDetails: React.FC<Props> = (props) => {

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div className={styles.container}>
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>{props.article.title}</DialogTitle>

          <DialogContent>
            <Stack spacing={2}>
            {props.article.content}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              愛心
            </Button>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              儲存
            </Button>
            <Button color="secondary" variant="contained" onClick={handleClose}>
              分享
            </Button>

            <Button color="primary" variant="contained" onClick={handleClose}>
              關閉
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};

export default ArticleDetails;