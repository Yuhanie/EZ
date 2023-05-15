import * as React from 'react';
import { useRouter } from "next/router"
//firebase
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseConfig } from '../../settings/firebaseConfig';
import { collection, getDocs, query } from "firebase/firestore";
import { orderBy, limit, where } from "firebase/firestore";

import { Profile, BookMark, Article } from 'interfaces/entities';
//mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Navbar from '../../components/navbar/Navbar';
import Head from 'next/head';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { spacing } from '@material-ui/system';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import EditIcon from '@material-ui/icons/Edit';
import { Avatar } from '@mui/material';
import { createTheme } from '@material-ui/core/styles';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import FaceIcon from '@mui/icons-material/Face';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import useId from '@mui/material/utils/useId';
import ArticleListItem from '../../components/article/ArticleListItem';

//firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();


//chip的style
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

//edit_chip_select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'cpp',
    'Java',
    'react',
];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

type Props = {
    article: Article;
    update: Function;
};


const Introduction:
    React.FC<Props> = (props) => {
        const router = useRouter();
        const { userId } = router.query;
        const [currentUser, setCurrentUser] = useState<User>();
        const [open, setOpen] = React.useState(false);
        const [openDrawer, setOpenDrawer] = React.useState(true);
        const theme = useTheme();
        const [profile, setProfile] = useState<Profile>();
        const [intro, setIntro] = useState<Article>();
        const [newTexts, setNewTexts] = useState<any[]>();
        const [isLoading, setIsLoading] = useState<boolean>(false);



        const handleClickOpen = () => {
            setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };

        const handleClick = () => {
            setOpenDrawer(!openDrawer);
        };

        // useEffect(() => {
        //     async function readData() {
        //         if (userId) {

        //         }

        //     }
        //     readData();
        // }
        //     , [userId])



        useEffect(() => {
            async function readData() {
                //var temp: Profile;

                // if (currentUser) {
                //     const querySnapshot = await getDoc(doc(db, "profile", currentUser.uid));
                //     if (querySnapshot.exists()) {
                //         //console.log(doc.id, doc.data());
                //         setProfile({ character: querySnapshot.data().character });
                //     };
                // }

                // const unsub = onAuthStateChanged(auth, (user) => {
                //     if (user) {
                //         console.log('currentUser', user)
                //         setCurrentUser(user);
                //     }
                // });
                //讀所有的texts
                setIsLoading(true);
                const textsCollection = collection(db, "text");
                //const queryTexts = query(textsCollection, orderBy("timestamp", "desc"), limit(3));
                const queryTexts = query(textsCollection);
                const querySnapnewtexts = await getDocs(queryTexts);
                const temp2: Article[] = [];
                querySnapnewtexts.forEach((doc) => {
                    temp2.push({ 
                        docId: doc.id, 
                        content: doc.data().content, 
                        title: doc.data().title, 
                        user: doc.data().user, 
                        link: doc.data().link, 
                        userid: doc.data().userid, 
                        count: doc.data().count, 
                        heart: doc.data().heart, 
                        timestamp: doc.data().timestamp, 
                        bookmark: doc.data().bookmark, 
                        outdateCount: doc.data().outdateCount, 
                        outdate: doc.data().outdate,
                        majortag: doc.data().majortag,
                        tag: doc.data().tag,
                        email: doc.data().email
                       });

                    console.log(`newtexts ${doc.id} => ${doc.data()}`);
                });
                setNewTexts([...temp2]);

               



                // console.log("introduction", props.article)
                // const ref = doc(db, "text", props.article.docId);
                // const docSnapshot = await getDoc(ref);


                // if (docSnapshot.exists()) {
                //     console.log("doc", docSnapshot.data().userId)
                //     // setTitle(docSnapshot.data().title)
                //     // setContent(docSnapshot.data().content)
                //     // setLink(docSnapshot.data().link)
                //     // setTagName(docSnapshot.data().tag)
                // }

                




            }
            readData();
        }, [userId]);










        return (
            <div>
                <Head>
                    <title>的個人檔案</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <Navbar />
                <div>
                    <Container >
                        <Toolbar />
                        <br />
                        <Card>

                            <Box sx={{ bgcolor: '#ffffff' }}>
                                {/* <Box sx={{ bgcolor: '#BCD4DE', height: '100vh', }}> */}

                                <Box display="flex" p={2} flexWrap="wrap">
                                    <Grid bgcolor={'#ffffff'} display="flex" flexDirection="row" flexWrap="wrap"  >
                                        <Box display="flex" flexDirection="column" sx={{ p: 2, width: 300 }} bgcolor={'#fafafa'} >
                                            <Box display="flex">
                                                <Box display="flex" flexDirection="column" sx={{ pr: 3 }}>
                                                    <Avatar
                                                        sx={{
                                                            width: 70,
                                                            height: 70,
                                                            mb: 1,
                                                        }}
                                                    >
                                                    </Avatar>
                                                    <Chip label={profile ? (profile.character ? profile.character : "...") : "未登入"} />
                                                </Box>
                                                <Box>
                                                    <Typography pt={0.8} fontSize={25}>{ }</Typography>
                                                    <Typography fontSize={12}>{ }</Typography>

                                                </Box>
                                            </Box>

                                        </Box>


                                        <Grid >
                                            <Card sx={{ m: 2, width: 300 }}>
                                                {/* <Card sx={{ minWidth: 275 }}> */}
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        擅長領域
                                                    </Typography>
                                                    <Stack direction="row" spacing={1}>
                                                        <Chip label="tag 1" component="a" href="#chip" />
                                                        <Chip label="tag 2" component="a" href="#chip" />
                                                        <Chip label="tag 3" component="a" href="#chip" />
                                                    </Stack>
                                                </CardContent>
                                            </Card>

                                            <Card sx={{ m: 2, width: 300 }}>
                                                {/* <Card sx={{ minWidth: 275 }}> */}
                                            </Card>
                                        </Grid>
                                    </Grid>

                                </Box>
                            </Box>
                        </Card>
                    </Container>
                </div>

            </div>
        );
    }
export default Introduction;