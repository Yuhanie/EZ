import Head from 'next/head';
import Navbar from '../../components/navbar/Navbar';
import magicCat from '../../public/pic/magicCat.png';
import WishListItem from '@/components/wish/WishListItem';
import { useEffect, useState } from 'react';

//mui
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import ButtonBase from '@mui/material/ButtonBase';
import Button from '@mui/material/Button';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';

import { red } from '@mui/material/colors';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import styles from '../../styles/Home.module.css';

//firebase
import { Wish } from '../../interfaces/entities';
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { firebaseConfig } from '../../settings/firebaseConfig';


const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();


const Item = styled(Paper)(({ theme }) => ({
   //backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
   backgroundColor: '#ffffff',
   ...theme.typography.body2,
   margin: theme.spacing(2),
   padding: theme.spacing(1),
   textAlign: 'center',
   color: theme.palette.text.secondary,
}));

// 星星動畫 //
interface StarProps {
   x: number;
   y: number;
}

const Star: React.FC<StarProps> = ({ x, y }) => {
   return <div className={styles.star} style={{ left: `${x}px`, top: `${y}px` }}></div>;
};

const getRandomPosition = () => {
   const x = Math.random() * 320; // 0 to 280 (300 - star width)
   const y = Math.random() * 280; // 0 to 280 (300 - star height)
   return { x, y };
};

//New wish
const Newwish = () => {
   const numStars = 30; // 星星的數量
   const stars = Array.from({ length: numStars }, (_, index) => {
      const { x, y } = getRandomPosition();
      return <Star key={index} x={x} y={y} />;
   });
   return (
      <Grid item direction='column'>
         <Grid item xs={8}>
            <Paper
               sx={{
                  width: 330,
                  height: 'auto',
                  margin: 'auto',
                  flexGrow: 1,
               }}
            >
               <div style={{
                  position: 'relative',
                  height: 280,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                  backgroundColor: '#425E99',
               }}>

                  {stars}
                  <Image src={magicCat} height='900' />
               </div>
               <Box sx={{ p: 2, }}>
                  <Typography variant="body2" gutterBottom >
                     找不到想看的內容嗎？試著在這裡許下願望，讓願望藉由大家的力量實現吧！
                  </Typography>
                  <Typography
                     variant="button"
                     display="block"
                     gutterBottom
                     sx={{
                        cursor: 'pointer',
                        textAlign: 'center',
                        color: '#425E99',
                        mt: 2
                     }}
                  >
                     Make a wish
                  </Typography>

               </Box>

            </Paper>
         </Grid>
      </Grid>
   )
}


//wishes
const renderWish = (wish: Wish, i: number) => {
   return (
      <WishListItem key={wish.docId} wish={wish}></WishListItem>
   );

};

function WishLoad() {
   return (
      <Paper
            sx={{
               p: 1,
               margin: 'auto',
               flexGrow: 1,
            }}
         >
         <Grid container justifyContent='space-between'>
            <Grid item xs={5}>
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
            </Grid>
            <Grid item justifyItems='flex-end'>
               <CardContent>
               <Skeleton variant="rounded" width={60} height={30} sx={{borderRadius:10}} />
               </CardContent>
            </Grid>
         </Grid>
      </Paper>
   )
}







const WishingPool = () => {
   const [wishes, setWishes] = useState<Wish[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   useEffect(() => {
      async function readData() {
         setIsLoading(true);
         const WishCollection = collection(db, "wish");
         const queryWish = query(WishCollection, orderBy("timestamp", "desc"));
         const querySnapshot = await getDocs(queryWish);
         const temp: Wish[] = [];
         querySnapshot.forEach((doc) => {
            temp.push({
               docId: doc.id,
               content: doc.data().content,
               userid: doc.data().userid,
               user: doc.data().user,
               timestamp: doc.data().timestamp,
            });
         });
         setWishes([...temp]);
         setIsLoading(false);
      }
      readData();
   }, []);

   return (
      <div>
         <Head>
            <title>許願池</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" ></meta>
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Navbar />
         <Toolbar />
         <Container>
            <Grid
               xs={12}
               mt={5}
               container
               flexDirection={{ xs: 'column', sm: 'row' }}
               sx={{ fontSize: '12px' }}
               spacing={2}
            >
               <Grid item container xs={12} md={4} direction='column'>
                  <Newwish />
               </Grid>
               <Grid item xs={12} md={8}>
                  {!isLoading ?
                     <div>
                        {wishes.map(renderWish)}
                     </div>
                     : <WishLoad />
                  }
               </Grid>
            </Grid>
            
         </Container>
      </div>
   )

};
export default WishingPool;