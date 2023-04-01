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
                                <Box display="flex" flexDirection="column" justifyContent="space-between"  maxWidth={400} sx={{ p: 4 }}>
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
                                            pb:3
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
                                            pb:3
                                        }}
                                    >
                                        讓學習變得<br />更Easy
                                    </Typography>

                                    <Typography variant="body1" sx={{ textAlign: "left",letterSpacing:".1rem",lineHeight:1.8,color:"#000000" }}>以「Tag、Link、Update」優化文章閱讀體驗，快速獲得正確知識，讓學習更省時、更高效。</Typography>
                                    {/* <Typography sx={{ textAlign: "left", }}>獲取最新的資訊</Typography> */}
                                    <Button variant="contained" color="secondary" href="/" sx={{mt:7}}>文章分享區</Button>
                                </Box>
                                <Toolbar />
                                <Box sx={{ maxWidth: 600, p: 4 }}>
                                    <Image src={workingPerson} />
                                </Box>
                            </Box>

                        </Grid>

                        {/* <Grid item minWidth={300}>
                        <Box sx={{ height: 140 }}>
                            <Typography variant="h6" sx={{ p: 1, textAlign: "left" }}>聯絡我們</Typography>
                            <Box display="flex" m={1} >

                                <Typography>educationZone@gmail.com</Typography>
                            </Box>
                            <Typography variant="body2" sx={{ m: 1 }}>多利用Line官方帳號提問更便利！</Typography>
                        </Box>
                    </Grid> */}

                    </Grid>
                </ThemeProvider>
            </Container>

            <Footer />

        </div>
    )
}
export default Ezindex;