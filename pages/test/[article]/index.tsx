
import * as React from 'react';
import { useEffect, useState } from 'react';
import Head from "next/head";
import router, { useRouter } from 'next/router';
import Navbar from '../../../components/navbar/Navbar';
//firebase
import { firebaseConfig } from '../../../settings/firebaseConfig';
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { query, orderBy, limit, where } from "firebase/firestore";
import { arrayUnion, collection, deleteDoc, doc, getDocs, getFirestore, increment, updateDoc, getDoc, arrayRemove, addDoc } from "firebase/firestore";
//mui
import { styled } from '@mui/material/styles';
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Toolbar from '@mui/material/Toolbar';

/*** firebase ***/
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();



const ArticleListItem = () => {
    const router = useRouter()
    const { articleMajorTag } = router.query

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        async function readData(){
            setIsLoading(true);
            const querySnapshot = await getDocs(collection(db, "text"));

        }
        readData();
    })

    return (
        <div>
            <Head>
                <title>測試筆記頁面</title>
            </Head>

            <Navbar />

            
            <Container>
                <Toolbar />
                {/* 手機版頁面 */}
                <Box>
                    
                </Box>
            </Container>

        </div>
    );
}

export default ArticleListItem