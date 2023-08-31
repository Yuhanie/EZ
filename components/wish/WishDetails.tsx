import * as React from 'react';
import { useEffect, useState, useMemo } from "react";
import dynamic from 'next/dynamic';


//mui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CardHeader, Chip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import { styled, alpha } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';

//quill
// import ReactQuill from "react-quill";
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.core.css';

//firebase
import { Wish, Profile } from '../../interfaces/entities';
import { firebaseConfig } from '../../settings/firebaseConfig';
import { arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, addDoc, } from "firebase/firestore";
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { ReactPropTypes } from 'react';
import { ChatBubble } from '@mui/icons-material';


const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

type Props = {
   wish: Wish;
   update: Function;
   open: boolean;
   setOpen: (open: boolean) => void;
   //currentUser: string;
};

const WishDetails:
   React.FC<Props> = (props) => {
      const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
      const [profile, setProfile] = useState<Profile>();
      const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
      const open = Boolean(anchorEl);
      const [report, setReport] = React.useState('');
      const ReactQuillEditor = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);

      const handleClose = () => {
         props.setOpen(false);
      };


      const handleToolClick = (event: React.MouseEvent<HTMLElement>) => {
         setAnchorEl(event.currentTarget);
      };
      const handleToolClose = () => {
         setAnchorEl(null);
      };

      const handleReportChange = (event: SelectChangeEvent) => {
         setReport(event.target.value as string);
      };

      const reportMenu = () => {
         // const StyledMenu = styled((props: MenuProps) => (
         //    <Menu
         //       elevation={0}
         //       anchorOrigin={{
         //          vertical: 'bottom',
         //          horizontal: 'right',
         //       }}
         //       transformOrigin={{
         //          vertical: 'top',
         //          horizontal: 'right',
         //       }}
         //       {...props}
         //    />
         // ))(({ theme }) => ({
         //    '& .MuiPaper-root': {
         //       borderRadius: 6,
         //       marginTop: theme.spacing(1),
         //       minWidth: 180,
         //       color:
         //          theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
         //       boxShadow:
         //          'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
         //       '& .MuiMenu-list': {
         //          padding: '4px 0',
         //       },
         //       '& .MuiMenuItem-root': {
         //          '& .MuiSvgIcon-root': {
         //             fontSize: 18,
         //             color: theme.palette.text.secondary,
         //             marginRight: theme.spacing(1.5),
         //          },
         //          '&:active': {
         //             backgroundColor: alpha(
         //                theme.palette.primary.main,
         //                theme.palette.action.selectedOpacity,
         //             ),
         //          },
         //       },
         //    },
         // }));
         return (
            <div>
               <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleToolClick}
               >
                  <MoreVertIcon />
               </IconButton>
               <Menu
                  id="long-menu"
                  // MenuListProps={{
                  //    'aria-labelledby': 'long-button',
                  // }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleToolClose}

                  anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'right',
                  }}
                  transformOrigin={{
                     vertical: 'top',
                     horizontal: 'right',
                  }}
                  
               >
               <Typography variant='body2' sx={{ ml: 2,mr:2 }}>
                  文章內容有問題？
               </Typography>
               <FormControl sx={{ m: 2,minWidth:120 }}>
                  <InputLabel id="demo-simple-select-label">選擇問題</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     label="Report"
                     value={report}
                     onChange={handleReportChange}
                  // value={topicName}
                  // label="topic"
                  // onChange={(e) => {
                  //   Denounce(e.target.value);
                  //   // setReport(e.target.value);
                  // }}
                  >
                     <MenuItem value="stale">過時或無法使用</MenuItem>
                     <MenuItem value="empty">內容空泛</MenuItem>
                     <MenuItem value="curse">中傷、挑釁、謾罵他人</MenuItem>
                     <MenuItem value="spamming">惡意洗版</MenuItem>
                     {/* <MenuItem value="tagerror">文章分類錯誤</MenuItem> */}
                  </Select>
               </FormControl>


               <Box
                  display='flex'
                  justifyContent='flex-end'
               >
                  <Button onClick={handleToolClose} size='small'>取消</Button>
                  <Button size='small'>回報</Button>
               </Box>
            </Menu>
            </div >
         )
      }

return (
   <div>
      <Dialog
         open={props.open}
         onClose={handleClose}
         scroll={scroll}
         aria-labelledby="scroll-dialog-title"
         aria-describedby="scroll-dialog-description"
      >
         <DialogTitle
            id="scroll-dialog-title"
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            sx={{
               minWidth: 320,
               p: 1,
               display: { xs: 6, md: 12 }
            }}
         >

            <CardHeader
               avatar={
                  <Avatar src={props.wish.userid && profile && profile.photoURL && profile.photoURL}>
                  </Avatar>
               }
               title={props.wish.user}
               subheader={props.wish.timestamp && props.wish.timestamp.toDate().toLocaleDateString()}
               //item 
               sx={{ p: 1.2 }}
            />
            {/* {reportMenu()} */}
         </DialogTitle>
         <DialogContent dividers={scroll === 'paper'} sx={{ minHeight: 150, }}>
            <DialogContentText
               id="scroll-dialog-description"
               tabIndex={-1}
               sx={{ mb: 10 }}
            >
               {(typeof window !== "undefined") &&
                  <ReactQuillEditor
                     theme="bubble"
                     //style={{ height: 50 }}
                     readOnly={true}
                     value={props.wish.content}
                  />
               }
            </DialogContentText>
            <Box>
               <Chip label={props.wish.tag} size="small" />
            </Box>
         </DialogContent>
         <DialogActions sx={{ alignItems: 'flex-end', }}>
            {/* <Grid xs={1.5} sx={{ m: 1 }}>
                     <Avatar sx={{ width: 30, height: 30, }} />
                  </Grid> */}
            <Grid item xs={12}>
               {(typeof window !== "undefined") &&

                  <ReactQuillEditor
                     theme="bubble"
                     placeholder='留言'
                     //placeholder={`以${props.currentUser}新增留言`}
                     style={{
                        minHeight: 40,
                        border: 'solid',
                        borderRadius: 8,
                        margin: 8,
                        borderColor: '#9a9a9a',
                     }}
                  />}
            </Grid>
            <IconButton><SendIcon sx={{ fontSize: 20, pb: 0.2 }} /></IconButton>
         </DialogActions>
      </Dialog>
   </div>
)
   }
export default WishDetails;