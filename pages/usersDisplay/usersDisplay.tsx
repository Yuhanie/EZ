import * as React from "react";
import Navbar from "@/components/navbar/Navbar"

//mui
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { Avatar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";

const UsersDisplay = () => {
  const theme = useTheme();

  function CounterBox() {
    return (
      <Grid container xs={12} justifyContent="center">
        <Grid xs={3.5} sx={{ p: 1 }}>
          <Typography variant="overline" display="block" textAlign="center">
            {" "}
            文章發布數
          </Typography>
          <Typography variant="h5" textAlign="center">
            3
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid xs={3.5} sx={{ p: 1 }}>
          <Typography variant="overline" display="block" textAlign="center">
            {" "}
            愛心＋收藏
          </Typography>
          <Typography variant="h5" textAlign="center">
            3
          </Typography>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid xs={3.5} sx={{ p: 1 }}>
          <Typography variant="overline" display="block" textAlign="center">
            {" "}
            追蹤數
          </Typography>
          <Typography variant="h5" textAlign="center">
            5
          </Typography>
        </Grid>
      </Grid>
    );
  }

  function UserCard() {
    return (
      <Card sx={{ display: "flex" }}>
        <CardContent
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          <Box sx={{ my: 1, mx: 2 }} >
            <Grid container alignItems="center" justifyContent="space-between">
              <Grid>
                <CardHeader
                  avatar={
                    <Avatar>
                      {/* {props.article.userid && profile && profile.photoURL &&
                  <img className={styles.googlephoto_profile} src={profile.photoURL} />} */}
                    </Avatar>
                  }
                  title="username"
                  subheader="專家/學習者"
                  sx={{ p: 1.2 }}
                />
              </Grid>
              <Grid>
                <Typography variant="body2" display="button">查看更多</Typography>
              </Grid>
            </Grid>
          </Box>
          <Box display="flex">
            <CounterBox />
          </Box>
          <Divider variant="middle" />
          <Box sx={{ m: 2 }}>
            <Stack direction="row" spacing={1}>
              <Chip label="Extra Soft" />
              <Chip color="primary" label="Soft" />
              <Chip label="Medium" />
              <Chip label="Hard" />
            </Stack>
          </Box>
          <Box sx={{ mt: 3, ml: 2, mb: 1 }}>
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                size="small"
                sx={{ borderRadius: 20, height: 30 }}
              >
                追蹤
              </Button>
              <Button variant="outlined" size="small" sx={{ borderRadius: 20 }}>
                推薦
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Navbar/>
      <Toolbar sx={{mb:3}}/>
      <Container>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {Array.from(Array(6)).map((_, index) => (
            // <Grid xs={2} sm={4} md={4} key={index}>
            <Grid xs={12} sm={4} key={index}>
              <UserCard />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
export default UsersDisplay;
