import Container from "@mui/material/Container";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";
import { Image } from "@mui/icons-material";
import { Card, ImageListItem } from "@mui/material";
import Button from "@mui/material/Button";


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
    img: 'https://qr-official.line.me/gs/M_467mfwsu_BW.png',
  }
]


export default function Footer() {
  return (
    <footer>
      <Box
        bgcolor="#000000"
        p={2}

      >
        <Box
          display="flex"
          justifyContent="center"
        >
          <Grid container spacing={4} maxWidth="80%" display="flex" flexWrap="wrap">
            <Grid item xs={4} minWidth={300}>
              <Item sx={{ height: 150 }} >
                <Box display="flex">
                  <Grid xs={7}>
                    <Typography variant="h6" sx={{ p: 1,textAlign:"left" }}>官方帳號</Typography>
                    <Typography variant="button" display="block" gutterBottom sx={{ p: 1,textAlign:"left" }}>加入我們！<br/>讓學習變得更easy</Typography>
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
              </Item>
            </Grid>
            <Grid item xs={4}>
              <Item>2</Item>
            </Grid>
            <Grid item xs={4}>
              <Item>3</Item>
            </Grid>
          </Grid>
        </Box>


      </Box>
    </footer>

  );
}
