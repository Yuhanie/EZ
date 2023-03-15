import type { NextPage } from 'next';
import Head from 'next/head';

import Image from 'next/image';

import React, { useState, useEffect } from "react";
import {
  Fab, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from "@mui/material";
//import DeleteIcon from '@mui/icons-material/Delete';
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from '../../../settings/firebaseConfig';
import styles from '/styles/Home.module.css';
import Link from 'next/link';
import ArticleDetails from '../../../components/post/ArticleDetails';
import ArticleListItem from '../../../components/article/ArticleListItem';
import MiniTags from '../../../components/miniTags/miniTags';
import MiniTagList from '../../../components/miniTags/miniTagList';
import TagList from '../../../components/tag/TagList';
import { Article, Tag, miniTag } from '../../../interfaces/entities';
// import { tags } from '../../interfaces/entities';

import { query, orderBy, limit, where } from "firebase/firestore";
import Navbar from "../../../components/navbar/Navbar";

import { useRouter } from 'next/router'

//material ui
import { List, ListItem, ListItemText, CircularProgress, IconButton, Button } from "@mui/material";
import { ClassNames } from '@emotion/react';
import { style, Box } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { title } from 'process';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

//////////////////////////////////////////////////////////////////////////

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

export async function getServerSideProps() {
  return {
    props: {},
  };
}

//////////////////////////////////////////////////////////////////////////
const Article = () => {
  const router = useRouter()
  //   const { tag } = router.query
  const { tag, minitag } = router.query

  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [miniTags, setminiTags] = useState<miniTag[]>([]);
  const [updated, setUpdated] = useState(0);

  //console.log(props)

  useEffect(() => {
    async function readData() {
      setIsLoading(true);
      // console.log("minitag:", minitag)
      const querySnapshot = await getDocs(query(collection(db, "text"), where("mini tag", "array-contains", minitag), where("tag", "==", tag)));
      // const querySnapshot = await getDocs(query(collection(db, "text"), where("mini tag", "array-contains", minitag), where("tag", "==", tag), orderBy("order")));
      // const querySnapshot2 = await getDocs(query(collection(db, "/tag/"+{tag}+"/分類" )));
      // const querySnapshot2 = await getDocs(query(collection(db, "/tag/{tag}/分類")));

      const temp: Article[] = [];
      const temp2: Tag[] = [];
      const temp3: miniTag[] = [];
      querySnapshot.forEach(async (doc) => {
        console.log(doc.id);
        console.log(doc.data());
        temp.push({ docId: doc.id, content: doc.data().content, title: doc.data().title, user: doc.data().user, userid: doc.data().userid, link: doc.data().link, count: doc.data().count, heart: doc.data().heart, timestamp: doc.data().timestamp, bookmark: doc.data().bookmark, outdateCount: doc.data().outdateCount, outdate: doc.data().outdate});
      });

      // const querySnapshot2 = await getDocs(query(collection(db, "text"), where("tag", "==", tag)));
      // querySnapshot2.forEach(async (doc) => {
      //   console.log(doc.id);
      //   console.log(doc.data());
      //   temp.push({ docId: doc.id, content: doc.data().content, title: doc.data().title, user: doc.data().user, userid: doc.data().userid, link: doc.data().link, count: doc.data().count, heart: doc.data().heart, timestamp: doc.data().timestamp });
      // });

      const querySnapshot3 = await getDocs(query(collection(db, "/tag/" + tag + "/分類")));
      querySnapshot3.forEach(async (doc2) => {
        console.log(doc2.id);
        console.log(doc2.data());
        temp2.push({ name: doc2.data().name, pic: doc2.data().pic });
        
      });

      const docRef = doc(db, "/tag/" + tag + "/分類/" + minitag);
      const docSnap = await getDoc(docRef);

      setArticles([...temp]);
      setminiTags([...temp3]);
      setIsLoading(false);
    }

    readData();
    //加tag會有問題，先diable警告
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUpdated = ()=>{
    setUpdated((currentValue)=>currentValue+1)
  }

  const renderText = (article: Article, i: number) => {
    return (
      <ArticleListItem key={article.docId} article={article} update={updateUpdated}></ArticleListItem>

    );
  };

  // const renderTag = (tag: Tag, i: number) => {
  //   console.log("tags3:",tag);
  //   return (
  //     <MiniTags key={tag.name} miniTag={tag}></MiniTags>
  //     <MiniTagList key={tag.name} tag={tag} minitag={minitag}></MiniTagList>
  //   );
  // };

  const renderTag = (minitag: miniTag, i: number) => {
    //console.log("tags3:",tag);
    return (
      <div>
      {!Array.isArray(tag)&&tag&&
      <MiniTagList key={minitag.name} tag={tag} minitag={minitag}></MiniTagList>}
      </div>
    );
  };


  ////////////////////////////////////////////////////////////sidebar
  const drawerWidth = 240;

  interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
  }

  const ResponsiveDrawer = (props: Props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    function back(){
      router.back();
    }

    const drawer = (
      <div>
        <Box sx={{ overflow: 'auto' }}>
          <Toolbar />
          <Box display="flex" pt={3.5} pb={2}>
            <IconButton
              onClick={back}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <Chip
              icon={<BookmarksIcon sx={{ fontSize: 20 }} />}
              sx={{
                bgcolor: "#CACDF5",
                fontSize: 18,
                fontWeight: "bold",
                p: 2.5,
                width: 180,

              }}
              label={tag}
            />
          </Box>
          <Box display="flex" p={1}>
            < LocalFireDepartmentIcon color="error" />
            <Typography>
              更多熱門主題
            </Typography>
          </Box>
          <Divider />

          <List className={styles.line} aria-label="mailbox folders">
            {/* <ListItem button> */}
            {/* <ListItemText primary="分類" />
                <ListItemText/> */}
            {tags.map(renderTag)}
            {/* </ListItem> */}
          </List>
        </Box>
      </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ p: 2, mt: 8 }}>
          <IconButton
            aria-label="ArrowBack"
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
            href="/"
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <Button
            variant="contained"
            size="medium"
            color="primary"
            sx={{ mr: 2, display: { sm: 'none', } }}

          >
          </Button>
          <Button
            variant="contained"
            size="medium"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            更多熱門主題
          </Button>
        </Box>

        <Box
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

      </Box>

    );

  }


  return (
    <div className={styles.container}>
      <Head>
        <title>筆記分享區</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <ResponsiveDrawer />


      <div className={styles.classification_container}>
        <div className={styles.classification_sidebar}>

        </div>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
        >

          {!isLoading ?
            <div className={styles.grid}>
              {articles.map(renderText)}
            </div>
            : <CircularProgress />
          }


        </Box>

      </div>
    </div>
  )
}
export default Article