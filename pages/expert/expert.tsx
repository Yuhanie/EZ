import type { NextPage } from 'next';
import Head from 'next/head';
import Image from "next/image";
import React, { useState, useEffect, Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import { SwiperOptions } from 'swiper';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useRouter } from "next/router"
// import styles from '../index.less';
// import Navbar3 from "../components/navbar/Navbar3";

import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, where, doc, getDoc } from "firebase/firestore";
import { firebaseConfig } from '../../settings/firebaseConfig';
import ReactDOM from "react-dom";

import {  createTheme} from "@mui/material/styles";
import ArticleListItem from '../../components/article/ArticleListItem';
import TagList from '../../components/tag/TagList';
import { Article, Newtext, Tag, Denounce } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';
import { query, orderBy, limit } from "firebase/firestore";
import Navbar from "../../components/navbar/Navbar";
import SearchBar from "material-ui-search-bar";
import navpic from '../public/pic/navpic.jpg';
import nav from '../public/pic/nav.png';
import yuhan from '../public/pic/yuhan.jpg';
import snoopy from '../public/pic/snoopy.png';
import ezlogo from '../public/pic/ezlogo.png';
import { List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import WarningIcon from '@mui/icons-material/Warning';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import "../styles/test.css";
import { AppBar, Box, Toolbar, IconButton, Typography, Button, InputBase, Container } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add'
import { styled, alpha } from '@mui/material/styles'
import { render } from "react-dom";
import { green } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import Footer from '@/components/footer/Footer';



import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();


const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#7A82E7",
    },
    text: {
      secondary: "#E2655E",
    },
  },
});


const Demo: React.FC = () => {
  const partnerLogo: Array<string> = [
    '/pic/welcomepage.png',
    '/pic/recommend.png',
    '/pic/introduction.png',

  ];
  return (
    // <div className={styles.demo}>
    <div className={styles.demo}>

      {/* 增加"autoplay" */}
      <Swiper spaceBetween={20} slidesPerView={1} loop autoplay>
        {partnerLogo.map((value, index) => {
          //console.log("value:", value);
          return (
            <SwiperSlide key={value}>
              <img alt={value} className={styles.item} src={value} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,  // 一次顯示幾張
  slidesToScroll: 1, // 按下一頁的時候，要跑幾張
  centerMode: true,
  arrow: true,
  // nextArrow: <SampleNextArrow />,
  // prevArrow: <SamplePrevArrow />,
  center: true,

};



const Home: NextPage = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [tag, setTag] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [denounces, setDenounces] = useState<Article[]>([]);
  const [updated, setUpdated] = useState(0);
  const [pending, setPending] = useState<Article[]>([]);
  const [processing, setProcessing] = useState<Article[]>([]);
  const [open, setOpen] =useState<boolean>(false);
  const router = useRouter();
  
  const updateUpdated = ()=>{
    setUpdated((currentValue)=>currentValue+1)
  }
  console.log("open:", open)
  useEffect(() => {

    async function readData() {
     console.log("readData")


      setIsLoading(true);

      const queryExam = await getDocs(open?query(collection(db, "text"), where("outdate", "==", "stale")):query(collection(db, "text"), where("outdate", "==", "stale"), limit(3)));
      const tempStale: Article[] = [];
      queryExam.forEach((doc) => {
        tempStale.push({docId: doc.id, content: doc.data().content, title: doc.data().title, user: doc.data().user, link: doc.data().link, userid: doc.data().userid, count: doc.data().count, heart: doc.data().heart,timestamp: doc.data().timestamp, bookmark: doc.data().bookmark, outdateCount: doc.data().outdateCount, outdate: doc.data().outdate});

        console.log(`newtext ${doc.id} => ${doc.data()}`);
      });
      setDenounces([...tempStale]);

      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "tag"));
      const temp: Tag[] = [];
      querySnapshot.forEach((doc) => {
        temp.push({ name: doc.data().name, pic: doc.data().pic });

      });
      setTag([...temp]);

      setIsLoading(true);
      const queryPending = await getDocs(query(collection(db, "text"), where("outdate", "==", "pending"), limit(3)));
      const tempPending: Article[] = [];
      queryPending.forEach((doc) => {
        tempPending.push({docId: doc.id, content: doc.data().content, title: doc.data().title, user: doc.data().user, link: doc.data().link, userid: doc.data().userid, count: doc.data().count, heart: doc.data().heart,timestamp: doc.data().timestamp, bookmark: doc.data().bookmark, outdateCount: doc.data().outdateCount, outdate: doc.data().outdate});

        console.log(`newtext ${doc.id} => ${doc.data()}`);
      });
      setPending([...tempPending]);

      const auth = getAuth();
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
        }

        console.log(user);
      });

      setIsLoading(false);

      return () => {
        unsub();
      }
    }

    readData();


  }, [open]);

  const changeStatus = function () {
    if (typeof window !== "undefined") {

      if (currentUser) {
        router.push('/Newpost');
      }
      else {
        alert("要登入才能新增筆記ㄛ!")
        router.push('/login');

      }


    }
  }

  const more = async function (status:string) {
    if (typeof window !== "undefined") {
      if (currentUser) {
        if(status=="morePending"){
          setOpen(true)
          console.log("clicked")
        }
        else{
          // handleClose;
        }
        if(status=="moreStale"){
          // handleOpen;
        }
        else{
          // handleClose;
        }
      }
    } else {
      alert("請登入");
    }
  };


  // const MorePending = (id) => {
  //   return (
  //     <div>
  //       <Button color="secondary" variant="contained" onClick={()=>update(id)}>
  //         修改
  //       </Button>
  //       <Button color="secondary" variant="contained" onClick={deleteData}>
  //         刪除
  //       </Button>
  //     </div>
  //   );
  // };

  // const MoreStale = (id) => {
  //   return (
  //     <div>
  //       <Button color="secondary" variant="contained" onClick={()=>update(id)}>
  //         修改
  //       </Button>
  //       <Button color="secondary" variant="contained" onClick={deleteData}>
  //         刪除
  //       </Button>
  //     </div>
  //   );
  // };


  const renderStale = (denounces: Article, i: number) => {
    return (
      <ArticleListItem key={denounces.docId} article={denounces} update={updateUpdated}></ArticleListItem>
    );

  };

  const renderPending = (pending: Article, i: number) => {
    return (
      <ArticleListItem key={pending.docId} article={pending} update={updateUpdated}></ArticleListItem>
    );

  };

  // const renderTag = (tag: Tag, i: number) => {
  //   return (
  //     <TagList key={tag.name} tag={tag}></TagList>
  //   );

  // };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

 
  return (
    <div >
      <Head>
        <title>筆記分享區</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Toolbar />
      <Container>
        {/* <Box>
          <Demo />
        </Box> */}

        <Box
          display="flex"
          justifyContent="center"
        >
          {!isLoading ?
            <Tabs
              //value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              allowScrollButtonsMobile
              aria-label="scrollable force tabs example"
            >
              {/* {tag.map(renderTag)} */}

            </Tabs>
            : <CircularProgress />
          }
        </Box>

        <Box>
          {/* <h3 className={styles.text_cs}>文章排行榜 <Button variant="contained" color="secondary" onClick={changeStatus}>新增文章</Button></h3> */}
          <Box
            display="flex"
            pl="10%"
            pt={4}
          >
            <NotificationImportantIcon
            sx={{color: 'Gold', left:200}}
            
            />
            <Typography variant='h6' pr={2}>待處理</Typography>
            <Button variant="contained" color="secondary" onClick={() => {more("morePending")}}>查看更多</Button>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
          >
            {!isLoading ?
              <div className={styles.grid}>
                {pending&&pending.map(renderPending)}
              </div>
              : <CircularProgress />
            }
          </Box>


          <Box
            display="flex"
            pl="10%"
            pt={4}
          >
            <WarningIcon
            sx={{color: 'Crimson'}}
            />
            <Typography variant='h6' pr={2}>過時</Typography>
            <Button variant="contained" color="secondary" onClick={() => {more("moreStale")}}>查看更多</Button>
            {/* <Button variant="contained" color="secondary" onClick={changeStatus}>新增文章</Button> */}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
          >
            {!isLoading ? 
              <div className={styles.grid}>
                {denounces&&denounces.map(renderStale)}
              </div>
              : <CircularProgress />
            }
          </Box>
          
          
        


        </Box>

      </Container>

      <Footer />





    </div>
  )

}
export default Home;

