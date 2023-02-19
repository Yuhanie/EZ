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
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { firebaseConfig } from '../settings/firebaseConfig';
import ReactDOM from "react-dom";

import ArticleListItem from '../components/article/ArticleListItem';
import TagList from '../components/tag/TagList';
import { Article, Tag } from '../interfaces/entities';
import styles from '../styles/Home.module.css';
import { query, orderBy, limit } from "firebase/firestore";
import Navbar from "../components/navbar/Navbar";
import SearchBar from "material-ui-search-bar";
import navpic from '../public/pic/navpic.jpg';
import nav from '../public/pic/nav.png';
import yuhan from '../public/pic/yuhan.jpg';
import snoopy from '../public/pic/snoopy.png';
import ezlogo from '../public/pic/ezlogo.png';
import { List, ListItem, ListItemText, CircularProgress } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import "../styles/test.css";
import { AppBar, Box, Toolbar, IconButton, Typography, Button, InputBase } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add'
import { styled, alpha } from '@mui/material/styles'
import { render } from "react-dom";
import { green } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';

// import App from 'myapp/src/App';

// const rootElement = document.getElementById("root");
// render(<App />, rootElement);







//////////////////////////////////////////////////////////////////////////

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

//////////////////////////////////////////////////////////////////////////


// const swiperParams: SwiperOptions = {
//   slidesPerView: 3,
//   spaceBetween: 50,
// };

// // const swiper = new Swiper('.swiper', swiperParams);


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



const Demo: React.FC = () => {
  const partnerLogo: Array<string> = [
    '/pic/navpic.jpg',
    '/pic/nav.png',
    '/pic/ezlogo.png',

  ];
  return (
    <div className={styles.demo}>
      {/* 增加"autoplay" */}
      <Swiper spaceBetween={20} slidesPerView={1} loop autoplay>
        {partnerLogo.map((value, index) => {
          console.log("value:", value);
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




// export default Demo;




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
class ReactSlickDemo extends React.Component {
  render() {

    return (
      <div >

        <Slider {...settings}>
          <div >
            <Image alt="navpic" src={navpic} />
          </div>
          <div>
            <Image alt="exlogo" src={ezlogo} />
          </div>
        </Slider>
      </div>

    );

  }
}



const Home: NextPage = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [tag, setTag] = useState<Tag[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  // return (
  //   <Swiper
  //     // install Swiper modules
  //     modules={[Navigation, Pagination, Scrollbar, A11y]}
  //     spaceBetween={50}
  //     slidesPerView={3}
  //     navigation
  //     pagination={{ clickable: true }}
  //     scrollbar={{ draggable: true }}
  //     onSwiper={(swiper) => console.log(swiper)}
  //     onSlideChange={() => console.log('slide change')}
  //   >
  //     <SwiperSlide>Slide 1</SwiperSlide>
  //     <SwiperSlide>Slide 2</SwiperSlide>
  //     <SwiperSlide>Slide 3</SwiperSlide>
  //     <SwiperSlide>Slide 4</SwiperSlide>
  //     ...
  //   </Swiper>
  // );

  useEffect(() => {
    async function readData() {
      setIsLoading(true);
      const querySnapshot = await getDocs(collection(db, "tag"));
      const temp: Tag[] = [];


      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
        temp.push({ name: doc.data().name, pic: doc.data().pic });

      });
      setTag([...temp]);
      const textCollection = collection(db, "text");
      const queryText = query(textCollection, orderBy("count", "desc"), limit(3));
      const querySnapshotArticle = await getDocs(queryText);
      //const querySnapshotArticle  = await getDocs(collection(db, "text"));
      const tempArticle: Article[] = [];
      querySnapshotArticle.forEach((doc) => {
        console.log(doc.id, doc.data());
        tempArticle.push({ docId: doc.id, content: doc.data().content, title: doc.data().title, user: doc.data().user, link: doc.data().link, count: doc.data().count });
      });
      setArticles([...tempArticle]);
      console.log(temp);

      const auth = getAuth();
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
        }
        // else{
        // setCurrentUser()}
        console.log(user);
      });





      setIsLoading(false);

      return () => {
        unsub();
      }
    }

    readData();


  }, []);

  // const test = () => {
  //   console.log("Hello");
  // }

  // const changeStatus = function (props) {
  //   props.setStatus("signUp");
  // }
  const changeStatus = function () {
    if (typeof window !== "undefined") {
      
      if (currentUser) {
        router.push('/Newpost');
      }
      else {
        alert("要登入才能新增筆記ㄛ!")
        //window.alert("要登入才能新增筆記ㄛ!");

        // <Alert action={
        //   <Button >
        //     UNDO
        //   </Button>
        // }>要登入才能新增筆記ㄛ! </Alert>

        router.push('/login');

      }


    }
  }


  // const logout = async function () {
  //   const auth = getAuth();
  //   await signOut(auth);
  //   alert("已登出");
  // };



  const renderText = (article: Article, i: number) => {
    return (
      <ArticleListItem key={article.docId} article={article}></ArticleListItem>
    );

  };

  const renderTag = (tag: Tag, i: number) => {
    return (
      <TagList key={tag.name} tag={tag}></TagList>
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
      <Navbar />


      {/* <h3 className={styles.text_cs}>熱門標籤</h3> */}
      <main className={styles.main}>
<div className={styles.group}>
        <div className={styles.slick_demo}>
          <Demo />
        </div>

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


          : <CircularProgress />
        }
        <h3 className={styles.text_cs}>文章排行榜 <Button variant="contained" color="secondary" onClick={changeStatus}>新增文章</Button></h3>


        {!isLoading ?
          <div className={styles.grid}>
            {articles.map(renderText)}
          </div>
          : <CircularProgress />
        }
</div>

      </main>

    </div>
  )
}

export default Home;

