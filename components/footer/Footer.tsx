import Container from "@mui/material/Container";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Footer() {
  return (
    <footer>
      <Box
        bgcolor="#000000"
        height={200}
        pt={2}
        
      >
        <Box
          display="flex"
          justifyContent="center"
        >
          <Grid container spacing={5} maxWidth="80%" display="flex" >
            <Grid item xs={4}>
              <Item>1</Item>
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
