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
   const x = Math.random() * 260; // 0 to 280 (300 - star width)
   const y = Math.random() * 260; // 0 to 280 (300 - star height)
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



const De = () => {
   const numStars = 30; // 星星的數量
   const stars = Array.from({ length: numStars }, (_, index) => {
      const { x, y } = getRandomPosition();
      return <Star key={index} x={x} y={y} />;
   });

   return (
      <Grid
         xs={12}
         mt={5}
         container
         flexDirection={{ xs: 'column', sm: 'row' }}
         sx={{ fontSize: '12px' }}
         spacing={2}
      >
         <Grid item container xs={12} md={4} direction='column'>
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



            {/* <Grid item display='flex' alignContent='center'>
                  <LocalFireDepartmentIcon sx={{ color: red[800], mr: 1, ml: 2, fontSize: 28 }} />
                  <Typography fontSize={18} >熱門話題</Typography>
            </Grid> */}

         </Grid>

         {/* wishes */}
         <Grid item xs={12} md={8}>
            <Paper
               sx={{
                  p: 2,
                  margin: 'auto',
                  flexGrow: 1,
                  backgroundColor: (theme) =>
                     theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
               }}
            >
               <Grid container spacing={2}>
                  <Grid item>
                     <CardHeader
                        avatar={
                           <Avatar />
                        }
                        title={'minnn'}
                        subheader={'2023/02/03'}
                        //item 
                        sx={{ p: 1.2 }}
                     />
                  </Grid>

                  <Grid item xs={12} md={8} container>
                     <Grid item direction="column">
                        <Grid item >
                           <Typography sx={{ cursor: 'pointer' }} variant="body2">
                              這邊放問題
                           </Typography>
                        </Grid>
                     </Grid>
                  </Grid>

                  <Grid item direction="column">
                     <Grid item textAlign='center'>
                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                           數量
                        </Typography>
                     </Grid>
                     <Grid item >
                        <Button
                           color="info"
                           disabled={false}
                           size="small"
                           variant="contained"
                           sx={{ borderRadius: 10 }}
                        >
                           問問
                        </Button>
                     </Grid>
                  </Grid>
               </Grid>
            </Paper>

         </Grid>
      </Grid>
   )

}



const WishingPool = () => {
   const [wishes, setWishes] = useState<Wish[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);

   // useEffect(() => {
   //    async function readData() {
   //       setIsLoading(true);
   //       const WishCollection = collection(db, "wish");
   //       const queryWish = query(WishCollection, orderBy("timestamp", "desc"));
   //       const querySnapshot = await getDocs(queryWish);
   //       const temp: Wish[] = [];
   //       querySnapshot.forEach((doc) => {
   //          temp.push({
   //             docId: doc.id,
   //             content: doc.data().content,
   //             userid: doc.data().userid,
   //             user: doc.data().user,
   //             timestamp: doc.data().timestamp,
   //          });
   //       });
   //       setWishes([...temp]);
   //       setIsLoading(false);
   //    }
   //    readData();
   // });

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
                  {/* {!isLoading ?
                     <div>
                        {wishes.map(renderWish)}
                     </div>
                     : <CircularProgress />
                  } */}
               </Grid>
            </Grid>
         </Container>
      </div>
   )

};
export default WishingPool;