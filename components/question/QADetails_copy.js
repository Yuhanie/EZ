import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import OutlinedInput from "@mui/material/OutlinedInput";
import SendIcon from "@mui/icons-material/Send";
import Image from "next/image";
import VI from "@mui/icons-material/Visibility";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";

export default function AlignItemsList() {
  return (
    <div className={styles.container}>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>
        {outdateIcon()}
          <a href={props.article.link}>{props.article.title}</a>

          <Stack spacing={1} className={styles.view}>
            <VI />
            <div className={styles.views}>{props.article.count}</div>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={1}>
            {/* {props.article.content} */}
            <div className={styles.card3}>
              <a href={props.article.link}>
                {props.article.content.substring(0, 165)}
                {props.article.content.length > 165 ? "..." : ""}
              </a>
            </div>
          </Stack>
          {character==="expert"&&expert()}

          <div style={{ padding: 14 }} className="App">
            {props.article.outdate ==='stale' && (
              <h2>
                <Image alt="版本疑慮" src={warning} />
                版本疑慮
              </h2>
            )}

            <div className={styles.yu}>
              {props.article.outdate ==='stale'
                ? "這篇文章已經不符合現在的版本或者無法使用"
                : ""}
            </div>
            
            <IconButton
                style={{  }}
                aria-label="heart"
                size="medium"
                onClick={()=>outdateCount()}
                sx={{textAlign: "left", left: 300, bottom: 80,
                  color: outdated?"orange":"grey" 
                }}
              >
            <LiveHelpIcon/>
            </IconButton>

            <Typography
                style={{ position: "relative", bottom: 110, left: 340 }}
                variant="body2"
                color="text.secondary"
              >
                {outdateCount ? count : 0}
              </Typography>

            {comments.map((comment)=>renderComment(comment))}
            {/* <Comment article={props.article} /> */}
          </div>
          {user && user.displayName}
          <OutlinedInput
          value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ padding: 1, margin: 5 , left: -20 , top: -1 , borderRadius: 12 , width: 340 , height: 35}}
            placeholder='我要留言...'
            // onClick={onSubmit}
          />
          <Button
            size="small"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={onSubmit}
            sx={{ padding: 0, margin: 1 ,right: -425 ,  top: -84 , borderRadius: 5 , width: 2 , height: 35}}
          ></Button>
        </DialogContent>

        <DialogActions>
          {user && user.uid === props.article.userid && Update()}
          {/* {user.uid}/{props.article.userid} */}
          {/* {props.article.userid} */}
          {user && Report()}
          {}
          {/* <Button color="primary" variant="contained" onClick={handleClose}>
            關閉
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}