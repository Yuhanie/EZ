import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import Image from "next/image";
import workingPerson from "../public/pic/workingPerson.png";
import expert from "../public/pic/expert.png";
import learner from "../public/pic/learner.png";
import code1 from "../public/pic/code1.png"

import { Button, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Card from "@mui/material/Card";
import VI from "@mui/icons-material/Visibility";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import styles from "/styles/Home.module.css";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';


import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";
import { bgcolor } from "@mui/system";

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

function Solgan() {
    return (
        <div>

            <Container>


                <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center">
                    <Box display="flex" flexDirection="column" justifyContent="space-between" maxWidth={400} sx={{ p: 4 }}>
                        {/* 網頁 */}
                        <Typography
                            variant="h2"
                            noWrap
                            component="a"
                            sx={{
                                display: { xs: "none", md: "flex" },
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                                pb: 3
                            }}
                        >
                            讓學習變得<br />更Easy
                        </Typography>
                        {/* 手機 */}
                        <Typography
                            variant="h3"
                            noWrap
                            component="a"

                            sx={{
                                display: { xs: "flex", md: "none" },
                                flexGrow: 1,
                                fontWeight: 700,
                                letterSpacing: ".3rem",
                                color: "inherit",
                                textDecoration: "none",
                                pb: 3
                            }}
                        >
                            讓學習變得<br />更Easy
                        </Typography>

                        <Typography variant="body1" sx={{ textAlign: "left", letterSpacing: ".1rem", lineHeight: 1.8, color: "#000000" }}>以「Tag、Link、Update」優化文章閱讀體驗，快速獲得正確知識，讓學習更省時、更高效。</Typography>
                        {/* <Typography sx={{ textAlign: "left", }}>獲取最新的資訊</Typography> */}
                        <Button variant="contained" color="secondary" href="/note" sx={{ mt: 7 }}>筆記分享區</Button>
                    </Box>
                    <Toolbar />
                    <Box sx={{ maxWidth: 600, p: 4 }}>
                        <Image src={workingPerson} />
                    </Box>
                </Box>
            </Container>

        </div>

    );
}

function Character() {
    return (
        <div>
            <Box sx={{ bgcolor: "#fafafa" }}>
                <Container>
                    <Grid container spacing={4} display="flex" flexWrap="wrap" alignItems="center" justifyContent="center" >
                        <Grid item xs={4} sx={{ bgcolor: "#fafafa", minWidth: 345, }}>

                            <Typography

                                variant="h2"
                                noWrap
                                component="a"

                                sx={{
                                    fontWeight: 600,
                                    letterSpacing: ".3rem",
                                    color: "#000000",
                                    textDecoration: "none",
                                    mb: 5,
                                    height: 80,
                                    minWidth: 345,
                                }}
                            >
                                角色
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{
                                    letterSpacing: ".1rem",
                                    color: "#000000",
                                    textDecoration: "none",
                                    minWidth: 345,
                                }}
                            >
                                如果你在某個領域擁有一定程度的知識，並且想要分享你所學，幫助更多人解決他們的問題。
                                你可以向官方申請或藉由其他專家推薦，成為某領域的專家！
                                <br /><br />
                                透過雙向的知識交流，「加強過往所學、更新過時知識」，建構出更完善的學習環境。
                                幫助雙方共同發展成長。

                            </Typography>

                        </Grid>
                        <Grid item xs={4} sx={{ minWidth: 345, }}>
                            <CardMedia>
                                <Image
                                    src={expert}
                                />
                            </CardMedia>

                            <CardContent >
                                {/* <Typography variant="body2" color="text">
                                專家可以透過經驗分享和討論的方式與學習者交流。
                                </Typography> */}
                                {/* <Typography variant="body1" color="text">
                                「經驗分享」「尋求新知」//把這個內容加到圖上
                                </Typography> */}
                            </CardContent>

                        </Grid>
                        <Grid item xs={4} sx={{ minWidth: 345, }}>
                            <CardMedia>
                                <Image
                                    src={learner}
                                />
                            </CardMedia>

                            <CardContent>
                                {/* <Typography variant="body2" color="text">
                                學習者可以透過問題和反饋的方式與專家交流。
                                </Typography> */}
                                {/* <Typography variant="body1" color="text">
                                「閱讀」「提問」「反饋」//把這個內容加到圖上
                                </Typography> */}
                            </CardContent>

                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );

}

function Update() {
    return (
        <div>
            <Container>
                {/* 網頁 */}
                <Typography
                    display="flex"
                    justifyContent="center"
                    variant="h2"
                    noWrap
                    component="a"
                    sx={{
                        display: { xs: "none", md: "flex" },
                        maxWidth: 280,
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "#ffffff",
                        textDecoration: "none",
                        pb: 5,
                        bgcolor: "#7A82E7",
                        borderTopRightRadius: 12,
                        borderTopLeftRadius: 12,
                        height: 80,
                    }}
                >
                    Update
                </Typography>
                {/* 手機 */}
                <Typography
                    display="flex"
                    justifyContent="center"
                    variant="h4"
                    noWrap
                    component="a"
                    sx={{
                        display: { xs: "flex", md: "none" },
                        maxWidth: 200,
                        fontWeight: 700,
                        letterSpacing: ".3rem",
                        color: "#ffffff",
                        textDecoration: "none",
                        pb: 3,
                        bgcolor: "#7A82E7",
                        borderTopRightRadius: 12,
                        borderTopLeftRadius: 12,
                        height: 50,
                    }}
                >
                    Update
                </Typography>

                {/* 網頁*/}
                <Card sx={{ p: 2, boxShadow: 4, display: { xs: "none", md: "flex" }, }}>
                    <Grid item minWidth={340}>
                        <Grid display="flex" flexWrap="wrap" spacing={4}>

                            <Grid item xs={4}>
                                {/* <Box display="flex" flexDirection="column" flexWrap="wrap">

                                        <Typography variant="h6">文章狀態</Typography>
                                        <Box display="flex" alignItems="center">
                                            <IconButton ><CheckCircleIcon sx={{ color: "Green" }} /></IconButton>
                                            <Typography>審核通過</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <IconButton><NotificationImportantIcon sx={{ color: "Gold" }} /></IconButton>
                                            <Typography>專家審核中</Typography>
                                        </Box>
                                        <Typography variant="caption" sx={{ pl: 5 }}>
                                            此為專家角色權限，可針對有問題的文章做審核。
                                        </Typography>
                                        <Box display="flex" alignItems="center" >
                                            <IconButton><WarningIcon sx={{ color: "Crimson" }} /></IconButton>
                                            <Typography>版本疑慮</Typography><br />

                                        </Box>
                                        <Typography variant="caption" sx={{ pl: 5 }}>經由專家審核後，這篇文章已經不符合現在的版本或者無法使用</Typography>
                                    </Box> */}


                                <List sx={{ width: '100%', maxWidth: 340, bgcolor: 'background.paper' }}>
                                    <Typography variant="h6">文章狀態</Typography>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="check" sx={{ color: "Green", bgcolor: "#ffffff" }} ><CheckCircleIcon /></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary=" 審核通過"
                                            secondary={

                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    「文章預設」、文章審核通過
                                                </Typography>


                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="check" sx={{ color: "Gold", bgcolor: "#ffffff" }} ><NotificationImportantIcon /></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="專家審核中"
                                            secondary={

                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    有學習者針對此文章做出問題回報。

                                                </Typography>


                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start" className={styles.section1}>
                                        <ListItemAvatar>
                                            <Avatar alt="check" sx={{ color: "Crimson", bgcolor: "#ffffff" }} ><WarningIcon /></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="版本疑慮"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        經由專家審核後，這篇文章已經不符合現在的版本或者無法使用。
                                                    </Typography>
                                                    {"出現提示框告知讀者文章狀態。"}
                                                </React.Fragment>


                                            }
                                        />
                                    </ListItem>
                                </List>
                            </Grid>


                            <Grid item xs={4} sx={{ m: 2 }}>
                                <Card sx={{ display: { xs: "none", md: "flex" }, flexDirection: "column", width: 340, height: 450, p: 2 }}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box display="flex">
                                            <WarningIcon />
                                            <Typography>文章標題</Typography>
                                        </Box>
                                        <Box display="flex">
                                            <VI />
                                            <Typography variant="body2">10</Typography>
                                            <MoreHorizIcon sx={{ bgcolor: "#FFF6E1", borderRadius: 10 }} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ height: 150, bgcolor: "#fafafa", p: 2, m: 2 }}>
                                        <Typography>文章內容</Typography>
                                    </Box>

                                    {/* empty */}
                                    {/* <Box
                                            alignItems="center"
                                            sx={{ height: 100, bgcolor: "#fafafa", p: 2, m: 2 }}
                                        >
                                            <Box >
                                                文章狀態
                                                
                                            </Box>
                                            
                                        </Box> */}

                                    {/* 版本疑慮 */}
                                    <Box
                                        alignItems="center"
                                        sx={{ height: 100, bgcolor: "#fafafa", p: 2, m: 2 }}
                                    >
                                        <Box display="flex">
                                            <WarningIcon />
                                            <Typography>版本疑慮</Typography>
                                        </Box>
                                        <Typography variant="subtitle2">這篇文章已經不符合現在的版本或者無法使用</Typography>
                                    </Box>

                                    {/* test */}
                                    {/* <Box
                                        sx={{bgcolor:"#000000"}}
                                        display="none"
                                        >
                                            <Typography>test</Typography>
                                        </Box> */}



                                </Card>


                            </Grid>

                            <Grid item xs={4}>
                                <Typography variant="h6" sx={{ pl: 1 }}>使用者權限</Typography>
                                <Box display="flex" flexDirection="column" sx={{ m: 1 }}>
                                    <Box sx={{ m: 1, p: 2, bgcolor: "#FFF6E1" }}>
                                        <Typography variant="h6">學習者</Typography>
                                        <Typography variant="caption" >學習者可透過<MoreHorizIcon sx={{ fontSize: 18, bgcolor: "#ffffff", borderRadius: 10, p: 0.2 }} />內檢舉功能的「過時或無法使用」</Typography><br />
                                        <Typography variant="caption">做出過時回報，文章經回報過後，狀態更新為<NotificationImportantIcon sx={{ color: "Gold", fontSize: 18, bgcolor: "#ffffff", borderRadius: 10, p: 0.2 }} /> </Typography>
                                        <Box sx={{ p: 1, bgcolor: "#fafafa", borderRadius: 3 }}>
                                            <Box component="form" sx={{ display: "flex" }}>
                                                <FormControl sx={{ width: 140 }} size="small">
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        sx={{ m: 1, height: 35 }}

                                                    >
                                                        <MenuItem value="stale">過時或無法使用</MenuItem>
                                                        <MenuItem value="empty">內容空泛</MenuItem>
                                                        <MenuItem value="curse">中傷、挑釁、謾罵他人</MenuItem>
                                                        <MenuItem value="spamming">惡意洗版</MenuItem>
                                                        <MenuItem value="tagerror">文章分類錯誤</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    size="small"
                                                    sx={{ m: 1, height: 35 }}

                                                >
                                                    檢舉
                                                </Button>
                                            </Box>


                                        </Box>
                                    </Box>
                                    <Box sx={{ m: 1, p: 2, bgcolor: "#E9F0E7" }}>
                                        <Typography variant="h6">專家</Typography>
                                        <Typography variant="caption" >專家可審核有疑慮的文章</Typography><br />
                                        <Typography variant="caption">-沒問題：狀態更新為<CheckCircleIcon sx={{ color: "Green", fontSize: 16 }} /></Typography><br />
                                        <Typography variant="caption">-過時：狀態更新為<WarningIcon sx={{ color: "Crimson", fontSize: 16 }} /></Typography>
                                        <Box display="flex" sx={{ p: 1, bgcolor: "#fafafa", borderRadius: 3 }}>
                                            <EmojiObjectsIcon sx={{ mt: 2 }} />
                                            <Typography variant="body1" sx={{ mt: 2 }}>
                                                專家審核
                                            </Typography>

                                            <FormControl sx={{ width: 140, }} size="small">
                                                {/* <InputLabel id="demo-simple-select-label">過時與否</InputLabel> */}
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    // value={topicName}
                                                    // label="topic"

                                                    sx={{ m: 1 }}
                                                >
                                                    <MenuItem value="solved">沒問題</MenuItem>
                                                    <MenuItem value="stale">過時或無法使用</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <br />
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                size="small"
                                                sx={{ m: 1, height: 35 }}
                                            >
                                                送出
                                            </Button>
                                        </Box>
                                    </Box>

                                </Box>

                            </Grid>



                        </Grid>
                    </Grid>
                </Card>

                {/* 手機 */}
                <Card sx={{ p: 2, boxShadow: 4, display: { xs: "flex", md: "none" }, maxWidth: 360 }}>
                    <Grid item minWidth={300} alignContent="center">
                        <Grid display="flex" flexWrap="wrap" spacing={4}>

                            <Grid item xs={4}>
                                {/* <Box display="flex" flexDirection="column" flexWrap="wrap">

                                        <Typography variant="h6">文章狀態</Typography>
                                        <Box display="flex" alignItems="center">
                                            <IconButton ><CheckCircleIcon sx={{ color: "Green" }} /></IconButton>
                                            <Typography>審核通過</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <IconButton><NotificationImportantIcon sx={{ color: "Gold" }} /></IconButton>
                                            <Typography>專家審核中</Typography>
                                        </Box>
                                        <Typography variant="caption" sx={{ pl: 5 }}>
                                            此為專家角色權限，可針對有問題的文章做審核。
                                        </Typography>
                                        <Box display="flex" alignItems="center" >
                                            <IconButton><WarningIcon sx={{ color: "Crimson" }} /></IconButton>
                                            <Typography>版本疑慮</Typography><br />

                                        </Box>
                                        <Typography variant="caption" sx={{ pl: 5 }}>經由專家審核後，這篇文章已經不符合現在的版本或者無法使用</Typography>
                                    </Box> */}


                                <List sx={{ width: '100%', maxWidth: 320, bgcolor: 'background.paper' }}>
                                    <Typography variant="h6">文章狀態</Typography>
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="check" sx={{ color: "Green", bgcolor: "#ffffff" }} ><CheckCircleIcon /></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary=" 審核通過"
                                            secondary={

                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    「文章預設」、文章審核通過
                                                </Typography>


                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start">
                                        <ListItemAvatar>
                                            <Avatar alt="check" sx={{ color: "Gold", bgcolor: "#ffffff" }} ><NotificationImportantIcon /></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="專家審核中"
                                            secondary={

                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    有學習者針對此文章做出問題回報。

                                                </Typography>


                                            }
                                        />
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                    <ListItem alignItems="flex-start" className={styles.section1}>
                                        <ListItemAvatar>
                                            <Avatar alt="check" sx={{ color: "Crimson", bgcolor: "#ffffff" }} ><WarningIcon /></Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="版本疑慮"
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >
                                                        經由專家審核後，這篇文章已經不符合現在的版本或者無法使用。
                                                    </Typography>
                                                    {"出現提示框告知讀者文章狀態。"}
                                                </React.Fragment>


                                            }
                                        />
                                    </ListItem>
                                </List>
                            </Grid>


                            <Grid item xs={4} sx={{ ml: 0.5, mb: 2 }}>
                                <Card sx={{ display: { xs: "flex", md: "none" }, flexDirection: "column", width: 320, height: 350, p: 2 }}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Box display="flex">
                                            <WarningIcon />
                                            <Typography>文章標題</Typography>
                                        </Box>
                                        <Box display="flex">
                                            <VI />
                                            <Typography variant="body2">10</Typography>
                                            <MoreHorizIcon sx={{ bgcolor: "#FFF6E1", borderRadius: 10 }} />
                                        </Box>
                                    </Box>
                                    <Box sx={{ height: 150, bgcolor: "#fafafa", p: 2, m: 2 }}>
                                        <Typography>文章內容</Typography>
                                    </Box>

                                    <Box
                                        alignItems="center"
                                        sx={{ height: 100, bgcolor: "#fafafa", p: 2, m: 2 }}
                                    >
                                        <Box display="flex">
                                            <WarningIcon />
                                            <Typography>版本疑慮</Typography>
                                        </Box>
                                        <Typography variant="subtitle2">這篇文章已經不符合現在的版本或者無法使用</Typography>
                                    </Box>

                                </Card>
                            </Grid>

                            <Grid item xs={4}>
                                <Typography variant="h6" sx={{ pl: 1, height: 40 }}>使用者權限</Typography>
                                <Box display="flex" flexDirection="column" >
                                    <Box sx={{ mb: 2, p: 2, bgcolor: "#FFF6E1" }}>
                                        <Typography variant="h6">學習者</Typography>
                                        <Typography variant="caption" sx={{height:18}}>學習者可透過<MoreHorizIcon sx={{ fontSize: 18, bgcolor: "#ffffff", borderRadius: 10, p: 0.2 }} />內檢舉功能的「過時或無法使用」</Typography><br />
                                        <Typography variant="caption">做出過時回報，文章經回報過後，狀態更新為<NotificationImportantIcon sx={{ color: "Gold", fontSize: 18, bgcolor: "#ffffff", borderRadius: 10, p: 0.2 }} /> </Typography>
                                        <Box sx={{ p: 1, bgcolor: "#fafafa", borderRadius: 3 }}>
                                            <Box component="form" sx={{ display: "flex" }}>
                                                <FormControl sx={{ width: 140 }} size="small">
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        sx={{ m: 1, height: 35 }}

                                                    >
                                                        <MenuItem value="stale">過時或無法使用</MenuItem>
                                                        <MenuItem value="empty">內容空泛</MenuItem>
                                                        <MenuItem value="curse">中傷、挑釁、謾罵他人</MenuItem>
                                                        <MenuItem value="spamming">惡意洗版</MenuItem>
                                                        <MenuItem value="tagerror">文章分類錯誤</MenuItem>
                                                    </Select>
                                                </FormControl>

                                                <Button
                                                    color="primary"
                                                    variant="contained"
                                                    size="small"
                                                    sx={{ m: 1, height: 35 }}

                                                >
                                                    檢舉
                                                </Button>
                                            </Box>


                                        </Box>
                                    </Box>
                                    <Box sx={{ p: 2, bgcolor: "#E9F0E7" }}>
                                        <Typography variant="h6">專家</Typography>
                                        <Typography variant="caption" >專家可審核有疑慮的文章</Typography><br />
                                        <Typography variant="caption">-沒問題：狀態更新為<CheckCircleIcon sx={{ color: "Green", fontSize: 16 }} /></Typography><br />
                                        <Typography variant="caption">-過時：狀態更新為<WarningIcon sx={{ color: "Crimson", fontSize: 16 }} /></Typography>
                                        <Box display="flex" sx={{ p: 1, bgcolor: "#fafafa", borderRadius: 3 }}>
                                            <EmojiObjectsIcon sx={{ mt: 2 }} />
                                            <Typography variant="body1" sx={{ mt: 2 }}>
                                                專家審核
                                            </Typography>

                                            <FormControl sx={{ width: 140, }} size="small">
                                                {/* <InputLabel id="demo-simple-select-label">過時與否</InputLabel> */}
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    // value={topicName}
                                                    // label="topic"

                                                    sx={{ m: 1 }}
                                                >
                                                    <MenuItem value="solved">沒問題</MenuItem>
                                                    <MenuItem value="stale">過時或無法使用</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <br />
                                            <Button
                                                color="primary"
                                                variant="contained"
                                                size="small"
                                                sx={{ m: 1, height: 35 }}
                                            >
                                                送出
                                            </Button>
                                        </Box>
                                    </Box>

                                </Box>

                            </Grid>



                        </Grid>
                    </Grid>
                </Card>
            </Container>

        </div>

    );
}




function Index() {

    return (
        <div>
            <Head>
                <title>首頁</title>
            </Head>
            <Navbar />

            <Toolbar />



            <ThemeProvider theme={lightTheme}>
                <Grid display="flex" flexWrap="wrap" flexDirection="column" >

                    <Solgan />

                    <Toolbar />
                    <Toolbar />

                    <Character />

                    <Toolbar />
                    <Toolbar />

                    <Update />




                </Grid>

            </ThemeProvider>

            <Toolbar />

            <Footer />

        </div>
    )
}
export default Index;