import Container from "@mui/material/Container";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Card, ImageListItem } from "@mui/material";
import Button from "@mui/material/Button";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import welcome2 from "../../public/pic/welcome2.png"


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

//QRcode
const itemData = [
  {
    img: "https://qr-official.line.me/gs/M_190tnsge_GW.png",
  }
]


export default function Footer() {
  return (
    <footer>
      <Box
        bgcolor="#fafafa"
        p={2}

      >
        <Box
          display="flex"
          justifyContent="center"
        >
          <Grid container maxWidth="80%" display="flex" flexWrap="wrap">
            <Grid item xs={4} minWidth={300}>
              <Box display="flex" sx={{ height: 150 }}>
                <Grid item xs={7}>
                  <Typography variant="h6" sx={{ p: 1, textAlign: "left" }}>官方帳號</Typography>
                  <Typography variant="button" display="block" gutterBottom sx={{ p: 1, textAlign: "left", href: "https://lin.ee/qh8TtVP" }}>加入我們！<br />讓學習變得更easy</Typography>
                </Grid>
                <Grid sx={{ width: 130 }}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                        src={`${item.img}?w=100&fit=crop&auto=format`}
                      />
                    </ImageListItem>
                  ))}
                </Grid>
              </Box>
            </Grid>

            <Grid item xs={4} minWidth={300}>
              <Box sx={{ height: 140 }}>
                <Typography variant="h6" sx={{ p: 1, textAlign: "left" }}>聯絡我們</Typography>
                <Box display="flex" m={1} >
                  <MailOutlineIcon sx={{ mr: 2 }} />
                  <Typography>ezgroup329@gmail.com</Typography>
                </Box>
                <Typography variant="body2" sx={{ m: 1 }}>多利用Line官方帳號提問更便利！</Typography>
              </Box>
            </Grid>
            <Grid item xs={4} minWidth={350}>
              <Box width="1" height={100}>
                <Image
                  src={welcome2}
                  alt="welcome"
                  width={350}
                  height={170}
                  objectFit="none"
                  objectPosition="top"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>


      </Box>
    </footer>

  );
}
