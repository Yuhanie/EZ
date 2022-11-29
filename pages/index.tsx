import type { NextPage } from 'next';
import Head from 'next/head';
import Image from "next/image";
import React, { useState, useEffect, Component } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
// import styles from './index.less';
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs} from "firebase/firestore";
import {firebaseConfig} from '../settings/firebaseConfig';
import ReactDOM from "react-dom";
import ArticleListItem from '../components/article/ArticleListItem';
import TagList from '../components/tag/TagList';
import { Article,Tag } from '../interfaces/entities';
import styles from '../styles/Home.module.css';
import { query, orderBy, limit } from "firebase/firestore";
import Navbar from "../components/navbar/Navbar";
import navpic from '../public/pic/navpic.jpg';
import yuhan from '../public/pic/yuhan.jpg';
import snoopy from '../public/pic/snoopy.png';
import ezlogo from '../public/pic/ezlogo.png';
import {List,ListItem,ListItemText,CircularProgress} from "@mui/material";
import SwiperCore, { Autoplay } from 'swiper';
SwiperCore.use([Autoplay]);

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import "../styles/test.css";
import { AppBar, Box, Toolbar, IconButton, Typography, Button, InputBase } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { styled, alpha } from '@mui/material/styles'
import SearchIcon from '@mui/icons-material/Search'





//////////////////////////////////////////////////////////////////////////

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

//////////////////////////////////////////////////////////////////////////

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// const Header = (props) => {

//   return (
//     <Box color="inherit" sx={{ flexGrow: 1 }}>
//       <AppBar position="static" sx={{ backgroundColor: "#000" }}>
//         <Toolbar>
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ flexGrow: 1 }}
//           >
//             {props.title}
//           </Typography>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase
//               placeholder="Search…"
//               inputProps={{ 'aria-label': 'search' }}
//             />
//           </Search>
//           <Box sx={{ flexGrow: 1 }} />
          
//         </Toolbar>
//       </AppBar>
//     </Box >
//   )
// }

// export default Header

// const Home: NextPage = () => {
//   const [articles, setArticles] = useState<Article[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   useEffect(()=>{
//     async function readData() {
//       setIsLoading(true);
//       // const querySnapshot = await getDocs(collection(db, "text"));
//       const querySnapshot = await getDocs(collection(db, "tag"));
//       const temp:Article[] = [];
      
//       querySnapshot.forEach((doc) => {
//         console.log(doc.id, doc.data());
//         temp.push({docId:doc.id, content:doc.data().content, title:doc.data().title, user:doc.data().user});
//       });

//       console.log(temp);

//       setArticles([...temp]);
//       setIsLoading(false);
//     }

//     readData();

//   },[]);



// const Demo: React.FC = () => {
//   const partnerLogo: Array<string> = [
//     require('@/public/pic/navpic,jpg'),
//     require('@/public/pic/welcome.png'),
//     require('@/public/pic/ezlogo.png'),
//     // require('@/assets/images/demo/partner-logo-4.png'),
//     // require('@/assets/images/demo/partner-logo-5.png'),
//     // require('@/assets/images/demo/partner-logo-6.png'),
//   ];

//   return (
//     <div className={styles.demo}>
//       {/* 增加"autoplay" */}
//       <Swiper spaceBetween={20} slidesPerView={6} loop autoplay>
//         {partnerLogo.map((value, index) => {
//           return (
//             <SwiperSlide key={index}>
//               <img className={styles.item} src={value} />
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </div>
//   );
// };


// export default Demo;




  const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,  // 一次顯示幾張
      slidesToScroll: 1, // 按下一頁的時候，要跑幾張
      centerMode:true,
      arrow:true,
      // nextArrow: <SampleNextArrow />,
      // prevArrow: <SamplePrevArrow />,
      center:true,

  };
  class ReactSlickDemo extends React.Component {
    render() {

      return (
        <div >
          
          <Slider {...settings}>
          <div >
          <Image src={navpic}/>
          </div>
          <div>
            <Image src={ezlogo}/>
          </div>  
          </Slider>
          </div>
    


);
   }
 }










  const Home: NextPage = () => {
    const [tag, setTag] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
  
    useEffect(()=>{
      async function readData() {
        setIsLoading(true);
        // const querySnapshot = await getDocs(collection(db, "text"));
        const querySnapshot = await getDocs(collection(db, "tag"));
        // const temp:Article[] = [];
        const temp:Tag[] = [];
        
        // querySnapshot.forEach((doc) => {
        //   console.log(doc.id, doc.data());
        //   temp.push({docId:doc.id, content:doc.data().content, title:doc.data().title, user:doc.data().user});
        // });
        querySnapshot.forEach((doc) => {
          console.log(doc.id, doc.data());
          temp.push({name:doc.data().name});
        });
  
        console.log(temp);
  
        setTag([...temp]);
        setIsLoading(false);
      }
  
      readData();
  
    },[]);

// const test = () => {
//   console.log("Hello");
// }

  const renderTag = (tag: Tag, i: number) => {
      return (
        <TagList key={tag.name} tag = {tag}></TagList>
      );
    
  };
  

  return (
    <div className={styles.container}>
      <Head>
      <title>筆記分享區</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Navbar/>
      </div>
   <div >
   <ReactSlickDemo />
</div>
      
      <main className={styles.main}>

        
        {/* <nav className={styles.navbar}>
          <div className={styles.form}>
            <h1 className={styles.title}>
              Education Zone
            </h1>
          </div>
        </nav> */}

        {/* {!isLoading ?
            <div className={styles.grid}>
              {articles.map(renderText)}
            </div>
          :<CircularProgress />
        } */}




        {!isLoading ?
          <div className={styles.grid2}>
            
             {tag.map(renderTag)}
          </div>

          
          :<CircularProgress />
        }


      </main>
    </div>
  )
}

export default Home;

