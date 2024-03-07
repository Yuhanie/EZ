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
import { firebaseConfig } from '../../settings/firebaseConfig';
import ReactDOM from "react-dom";

import { createTheme } from "@mui/material/styles";
import ArticleListItem from '../../components/article/ArticleListItem';
import TagList from '../../components/tag/TagList';
import { Article, Newtext, Tag } from '../../interfaces/entities';
import styles from '../../styles/Home.module.css';
import { query, orderBy, limit } from "firebase/firestore";
import Navbar from "../../components/navbar/Navbar";
// import navpic from '../../public/pic/navpic.jpg';
// import nav from '../../public/pic/nav.png';
// import ezlogo from '../../public/pic/ezlogo.png';
import { List, ListItem, ListItemText, CircularProgress, Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import "../styles/test.css";
import { AppBar, Box, Toolbar, IconButton, Typography, Button, InputBase, Container } from '@mui/material'
//import AddIcon from '@mui/icons-material/Add'
import { styled, alpha } from '@mui/material/styles'
import { green } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { getAuth, onAuthStateChanged, signOut, User } from 'firebase/auth';
import Footer from '../../components/footer/Footer';
import SearchIcon from '@mui/icons-material/Search';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import "swiper/css";
import "swiper/css/pagination";
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';


// import App from 'myapp/src/App';

// const rootElement = document.getElementById("root");
// render(<App />, rootElement);


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//import { Stack } from 'react-bootstrap';
//import { Card } from 'react-bootstrap';



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

//色調
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
    '/pic/deeplink.png',
    '/pic/recommend.png',
    // '/pic/report.png',

  ];
  return (
    // <div className={styles.demo}>
    <div className={styles.demo}>

      {/* 增加"autoplay" */}
      <Swiper spaceBetween={20} slidesPerView={1} loop autoplay pagination={{ clickable: true, }}
        modules={[Pagination]}
        className="mySwiper" >
        {partnerLogo.map((value, index) => {
          //console.log("value:", value);
          return (
            <SwiperSlide key={value} >
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
// class ReactSlickDemo extends React.Component {
//   render() {

//     return (
//       <div >

//         <Slider {...settings}>
//           <div >
//             <Image alt="navpic" src={navpic} />
//           </div>
//           <div>
//             <Image alt="exlogo" src={ezlogo} />
//           </div>
//         </Slider>
//       </div>

//     );

//   }
// }

//search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));




const Home: NextPage = () => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [tag, setTag] = useState<Tag[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [newTexts, setNewTexts] = useState<any[]>();
  const [bookText, setBookText] = useState<any[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updated, setUpdated] = useState(0);
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
  const updateUpdated = () => {
    setUpdated((currentValue) => currentValue + 1)
  }
  useEffect(() => {

    async function readData() {


      setIsLoading(true);
      const examCollection = collection(db, "text");
      const queryExam = query(examCollection, orderBy("timestamp", "desc"), limit(3));
      const querySnapnewtext = await getDocs(queryExam);
      const temp2: Article[] = [];
      querySnapnewtext.forEach((doc) => {
        temp2.push({
          docId: doc.id,
          content: doc.data().content,
          title: doc.data().title,
          user: doc.data().user,
          link: doc.data().link,
          userid: doc.data().userid,
          count: doc.data().count,
          heart: doc.data().heart,
          heartCount: doc.data().heartCount,
          timestamp: doc.data().timestamp,
          bookmark: doc.data().bookmark,
          bookCount: doc.data().bookCount,
          outdateCount: doc.data().outdateCount,
          outdate: doc.data().outdate,
          majortag: doc.data().majortag,
          minitag: doc.data().minitag,
          tag: doc.data().tag,
          email: doc.data().email
        });
        console.log(`newtext ${doc.id} => ${doc.data()}`);
      });
      setNewTexts([...temp2]);

      setIsLoading(true);
      // const querySnapshot = await getDocs(query(collection(db, "tag"), orderBy("order", "asc")));
      const Tag = collection(db, "tag");
      const queryTag = query(Tag, orderBy("order", "asc"));
      const querySnapshot = await getDocs(queryTag);
      const temp: Tag[] = [];
      querySnapshot.forEach((doc) => {
        //console.log(doc.id, doc.data());
        temp.push({ name: doc.data().name, pic: doc.data().pic, order: doc.data().order });
      });
      setTag([...temp]);

      const textCollection = collection(db, "text");
      const queryText = query(textCollection, orderBy("heartCount", "desc"), limit(3));
      //const queryNewText =query(textCollection, orderBy("timestamp", "desc"), limit(3)); 
      const querySnapshotArticle = await getDocs(queryText);
      //const querySnapshotArticle  = await getDocs(collection(db, "text"));
      const tempArticle: Article[] = [];
      // const tempNewtext: Newtext[] = [];
      querySnapshotArticle.forEach((doc) => {
        //console.log(doc.id, doc.data());
        tempArticle.push({
          docId: doc.id,
          content: doc.data().content,
          title: doc.data().title,
          user: doc.data().user,
          link: doc.data().link,
          userid: doc.data().userid,
          count: doc.data().count,
          heart: doc.data().heart,
          heartCount: doc.data().heartCount,
          timestamp: doc.data().timestamp,
          bookmark: doc.data().bookmark,
          bookCount: doc.data().bookCount,
          outdateCount: doc.data().outdateCount,
          outdate: doc.data().outdate,
          majortag: doc.data().majortag,
          minitag: doc.data().minitag,
          tag: doc.data().tag,
          email: doc.data().email
        });
      });
      setArticles([...tempArticle]);

      const bookCollection = collection(db, "text");
      const queryBook = query(bookCollection, orderBy("bookCount", "desc"), limit(3));
      const querySnapshotBookText = await getDocs(queryBook);
      const tempBookText: Article[] = [];
      querySnapshotBookText.forEach((doc) => {
        //console.log(doc.id, doc.data());
        tempBookText.push({
          docId: doc.id,
          content: doc.data().content,
          title: doc.data().title,
          user: doc.data().user,
          link: doc.data().link,
          userid: doc.data().userid,
          count: doc.data().count,
          heart: doc.data().heart,
          heartCount: doc.data().heartCount,
          timestamp: doc.data().timestamp,
          bookmark: doc.data().bookmark,
          bookCount: doc.data().bookCount,
          outdateCount: doc.data().outdateCount,
          outdate: doc.data().outdate,
          majortag: doc.data().majortag,
          minitag: doc.data().minitag,
          tag: doc.data().tag,
          email: doc.data().email
        });
      });
      setBookText([...tempBookText]);



      //console.log(temp);

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


  }, [currentUser]);



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
      <ArticleListItem key={article.docId} article={article} update={updateUpdated}></ArticleListItem>
    );

  };

  const renderBookText = (article: Article, i: number) => {
    return (
      <ArticleListItem key={article.docId} article={article} update={updateUpdated}></ArticleListItem>
    );

  };

  const renderNewText = (newTexts: Article, i: number) => {
    return (
      <ArticleListItem key={newTexts.docId} article={newTexts} update={updateUpdated}></ArticleListItem>
    );

  };

  const renderTag = (tag: Tag, i: number) => {
    return (
      <TagList key={tag.name} tag={tag}></TagList>
    );

  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function Load() {
    return (
      <Card sx={{ width: 320, height: 235, m: 2 }}>
        <Skeleton variant="rectangular" width={320} height={170} />
        <CardHeader
          avatar={
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
          }
          title={
            <Skeleton
              animation="wave"
              height={10}
              width="20%"
              style={{ marginBottom: 6 }}
            />
          }
          subheader={
            <Skeleton animation="wave" height={10} width="40%" />
          }
        />
      </Card>
    )
  }

  function ArticleLoading() {
    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        <Load />
        <Load />
        <Load />
      </Box>
    )
  }

  function TabLoad() {
    return (
      <Stack display='flex' flexDirection='row' justifyContent='center' mt={2} mb={4}>
        <Skeleton animation="wave" variant="circular" width={100} height={100} sx={{ mr: 4 }} />
        <Skeleton animation="wave" variant="circular" width={100} height={100} sx={{ mr: 4 }} />
        <Skeleton animation="wave" variant="circular" width={100} height={100} sx={{ mr: 4 }} />
        <Skeleton animation="wave" variant="circular" width={100} height={100} sx={{ mr: 4 }} />
        <Skeleton animation="wave" variant="circular" width={100} height={100} />
      </Stack>
    );
  }

  return (
    <div>

      <Head>
        <title>資訊分享區</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Toolbar />
      <Box>
        <Demo />
      </Box>
      <Container>
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
              {tag.map(renderTag)}

            </Tabs>
            : <TabLoad />
          }
        </Box>

        {/* <Toolbar>
        <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="尋找更多好文章"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </Toolbar> */}
      </Container>
      <Container sx={{ display: { xs: "flex", md: "none" }, justifyContent: "center" }}>

        <Box>
          <Button variant="contained" color="secondary" onClick={changeStatus} sx={{mt:3,mb:-0.8,ml:2}}>新增文章</Button>
          {/* <h3 className={styles.text_cs}>文章排行榜 <Button variant="contained" color="secondary" onClick={changeStatus}>新增文章</Button></h3> */}
          <Box
            display="flex"
            pl="5%"
            pt={4}
            alignItems='center'
          >
            <LabelImportantIcon />
            <Typography variant='h6' pr={2}>愛心榜</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
          >
            {!isLoading ?
              <div className={styles.grid}>
                {articles.map(renderText)}
              </div>
              : <ArticleLoading />
            }
          </Box>

          <Box
            display="flex"
            pl="5%"
            pt={4}
            alignItems='center'
          >
            <LabelImportantIcon />
            <Typography variant='h6' pr={2}>收藏榜</Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
          >
            {!isLoading ?
              <div className={styles.grid}>
                {bookText && bookText.map(renderBookText)}
              </div>
              : <ArticleLoading />
            }
          </Box>


          <Box
            display="flex"
            pl="5%"
            pt={4}
            alignItems='center'
          >
            <LabelImportantIcon />
            <Typography variant='h6' pr={2}>最新文章</Typography>
            {/* <Button variant="contained" color="secondary" onClick={changeStatus}>新增文章</Button> */}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
          >
            {!isLoading ?
              <div className={styles.grid}>
                {newTexts && newTexts.map(renderNewText)}
              </div>
              : <ArticleLoading />
            }
          </Box>

        </Box>
      </Container>

      <Box sx={{ m: 2, }}>
        <Grid container sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
          <Grid item >
            <Button variant="contained" color="secondary" onClick={changeStatus}>新增文章</Button>
            <Box>
              {/* <h3 className={styles.text_cs}>文章排行榜 <Button variant="contained" color="secondary" onClick={changeStatus}>新增文章</Button></h3> */}
              <Box
                display="flex"
                pl="1%"
                pt={4}
                alignItems='center'
              >
                <LabelImportantIcon />
                <Typography variant='h6' pr={2}>愛心榜</Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
              >
                {!isLoading ?
                  <div className={styles.grid}>
                    {articles.map(renderText)}
                  </div>
                  : <ArticleLoading />
                }
              </Box>

              <Box
                display="flex"
                pl="1%"
                pt={4}
                alignItems='center'
              >
                <LabelImportantIcon />
                <Typography variant='h6' pr={2}>收藏榜</Typography>
              </Box>
              <Box
                display="flex"
                justifyContent="center"
              >
                {!isLoading ?
                  <div className={styles.grid}>
                    {bookText && bookText.map(renderBookText)}
                  </div>
                  : <ArticleLoading />
                }
              </Box>



              <Box
                display="flex"
                pl="1%"
                pt={4}
                alignItems='center'
              >
                <LabelImportantIcon />
                <Typography variant='h6' pr={2}>最新文章</Typography>
                {/* <Button variant="contained" color="secondary" onClick={changeStatus}>新增文章</Button> */}
              </Box>
              <Box
                display="flex"
                justifyContent="center"
              >
                {!isLoading ?
                  <div className={styles.grid}>
                    {newTexts && newTexts.map(renderNewText)}
                  </div>
                  : <ArticleLoading />
                }
              </Box>
            </Box>


          </Grid>
          <Grid item >
            <Box sx={{ maxWidth: 320 }}>
              <Card sx={{ ml: 1, p: 2, width: "100%", mb: 3, mt: 5 }} >
                <Typography variant='h6' sx={{ mb: 1 }}>觀看</Typography>
                <Typography variant='body2'>你可以透過觀看他人撰寫的文章學習新知。並針對喜歡的文章進行按愛心、收藏鼓勵所有分享知識的人，或在留言區進行討論，也可以分享給你所有朋友~讓更多人知道這些好文章！</Typography>
              </Card>
              <Card sx={{ ml: 1, p: 2, width: "100%" }} >
                <Typography variant='h6' sx={{ mb: 1 }}>分享</Typography>
                <Typography variant='body2'>最近在學習新的知識嗎？要不要試著寫下來與大家分享呢？你可以在這邊遇到與你共同學習的夥伴，甚至是領域的專家！一起學習與討論，讓大家的學習之路不再孤單～</Typography>
              </Card>
            </Box>
          </Grid>

        </Grid>
      </Box>




      <Footer />

    </div>
  )

}
export default Home;

