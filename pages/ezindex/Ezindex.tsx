import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import Image from "next/image";

import { Button, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Head from "next/head";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import workingPerson from "../../public/pic/workingPerson.png";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Card from "@mui/material/Card";
import VI from "@mui/icons-material/Visibility";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { createTheme, ThemeProvider } from '@mui/material/styles';

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

const Ezindex = () => {

    return (
        <div>
            <Head>
                <title>首頁</title>
            </Head>
            <Navbar />

            <Toolbar />
            <Container>
                <ThemeProvider theme={lightTheme}>
                    <Grid display="flex" flexWrap="wrap" flexDirection="column">
                        <Grid item>

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
                                    <Button variant="contained" color="secondary" href="/" sx={{ mt: 7 }}>筆記分享區</Button>
                                </Box>
                                <Toolbar />
                                <Box sx={{ maxWidth: 600, p: 4 }}>
                                    <Image src={workingPerson} />
                                </Box>
                            </Box>

                        </Grid>

                        <Grid item minWidth={300}>
                            <Box display="flex" flexWrap="wrap" >

                                <Grid xs={6} sx={{ p: 4 }}>
                                    <Box display="flex" flexDirection="column" flexWrap="wrap">
                                        <Typography variant="h6">文章狀態</Typography>
                                        <Box display="flex" alignItems="center">
                                            <IconButton ><CheckCircleIcon sx={{ color: "Green" }} /></IconButton>
                                            <Typography>正確</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <IconButton><NotificationImportantIcon sx={{ color: "Gold" }} /></IconButton>
                                            <Typography>審查中</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" >
                                            <IconButton><WarningIcon sx={{ color: "Crimson" }} /></IconButton>
                                            <Typography>版本疑慮</Typography><br />
                                        </Box>
                                        <Typography variant="caption">經由專家審查後，確認文章版本過時或無法使用</Typography>
                                    </Box>

                                </Grid>
                                <Grid xs={3}>
                                    <Card sx={{ width: 350, height: 500, p: 2 }}>
                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                            <Box display="flex">
                                                <WarningIcon />
                                                <Typography>文章標題</Typography>
                                            </Box>
                                            <Box display="flex">
                                                <VI  />
                                                <Typography variant="body2">10</Typography>
                                                <MoreHorizIcon sx={{bgcolor:"#FFF6E1",borderRadius:10}}/>
                                            </Box>
                                        </Box>
                                        <Box sx={{ height: 150, bgcolor: "#fafafa", p: 2, m: 2 }}>
                                            <Typography>文章內容</Typography>
                                        </Box>
                                        <Box sx={{ height: 100, bgcolor: "#fafafa", p: 2, m: 2 }}>
                                            <Typography>文章過時</Typography>
                                        </Box>



                                    </Card>
                                </Grid>
                                <Grid xs={3}>
                                    <Box display="flex" flexDirection="column" sx={{m:2,pl:4}}>
                                        <Box sx={{m:1,p:2,height:150,bgcolor:"#FFF6E1"}}>
                                            <Typography variant="h6">學習者</Typography>
                                        </Box>
                                        <Box sx={{m:1,p:2,height:150,bgcolor:"#E9F0E7"}}>
                                            <Typography variant="h6">專家</Typography>
                                        </Box>

                                    </Box>

                                </Grid>



                            </Box>
                        </Grid>

                    </Grid>
                </ThemeProvider>
            </Container>

            <Footer />

        </div>
    )
}
export default Ezindex;