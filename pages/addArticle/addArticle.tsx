import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from "/styles/Home.module.css";
import Link from 'next/link'
import {
  Button, TextField, Container, Autocomplete, Stack, Box, Select, MenuItem,
  FormControl, OutlinedInput, Chip, InputLabel, SelectChangeEvent,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
  crossOrigin="anonymous"
/>




const Home: NextPage = () => {

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
    '1',
    '2',
    '3',
    '4',
    '5',
  ];

  function getStyles(name: string, personName: readonly string[], theme: Theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>新增筆記</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container sx={{ padding: 5, borderRadius: 4, background: 'white', width: 0.6 }}>

        <img className={styles.user_image} src="pic/test1.jpeg" />

        <Box sx={{ margin: 4, }}>
          <TextField id="outlined-basic" label="請輸入文章標題" variant="outlined" /><br />
          <TextField
            id="outlined-multiline-static"
            label="請輸入文章內容"
            multiline
            fullWidth
            rows={10}
            margin="normal"

          /><br />
          <div>
          <h4>請選擇標籤</h4>
          <FormControl sx={{ m: 0.5, width: 300 }}>
          <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
              >
                <MenuItem value="note">課堂筆記</MenuItem>
                <MenuItem value="diary">修課心得</MenuItem>
                <MenuItem value="project">專題相關</MenuItem>
                <MenuItem value="company">業界資源</MenuItem>
                <MenuItem value="other">其他</MenuItem>
              </Select><br />
           </FormControl>
            <FormControl sx={{ m: 0.5, width: 300 }}>
            
              <InputLabel id="demo-multiple-chip-label">標籤</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))} 
              </Select>
            </FormControl>
          </div>

          <Button color="primary" ><input multiple type="file" /></Button>

          <div>
            <Button variant="contained" >發布</Button>
            <Button variant="contained">取消</Button>
          </div>
        </Box>


      </Container>





      {/* <footer className={styles.footer}>
        <Link
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </Link>
      </footer> */}
    </div>
  )




}





export default Home
