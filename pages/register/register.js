import Head from "next/head";
import Image from "next/image";
import { getApps, getApp, initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import styles from "/styles/Home.module.css";
import { firebaseConfig } from "../../settings/firebaseConfig";
import myImage from "../../public/pic/welcome.png";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Button, TextField, Card, Divider } from "@mui/material";
import {
  collection,
  addDoc,
  Doc,
  setDoc,
  doc,
  getDocs,
  deleteDoc,
  getDoc,
  getFirestore,
  query,
  orderBy,
  limit,
  updateDoc,
  serverTimestamp,
  arrayRemove,
  arrayUnion,
  getCountFromServer
} from "firebase/firestore";

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();


if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
const Home = () => {
  const [account, setAccount] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [message, setMessage] = useState("");
  const auth = getAuth();
  const handleChange = function (e) {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  const handleOnClick = async function () {


    // const res = await createUserWithEmailAndPassword(
    //   auth,
    //   account.email,
    //   account.password
    // );
    // updateProfile(auth.currentUser, {
    //   displayName: "Jane Q. User",
    //   photoURL: "https://example.com/jane-q-user/profile.jpg",
    // })
    //   .then(() => {
    //     // Profile updated!
    //     // ...
    //   })
    //   .catch((error) => {
    //     // An error occurred
    //     // ...
    //   });

    try {
      console.log("account:", account);
      const res = await createUserWithEmailAndPassword(
        auth,
        account.email,
        account.password
      );

      if (res) {
        await updateProfile(auth.currentUser,{displayName: account.displayName});
 
   
        // await addDoc(collection(db, "profile"),{character:"學習者",tag});
        // let addDoc = db.collection('profile').doc(uid);
      }
      setMessage("帳號已產生");
      console.log({ res });
    } catch (error) {
      let message = "";

      switch (error.code) {
        case "auth/email-already-in-use":
          message = "電子信箱已註冊";
          break;
        case "auth/weak-password":
          message = "密碼強度不足";
          break;
        case "auth/invalid-email":
          message = "電子郵件格式錯誤";
          break;
        default:
          message = "系統錯誤:" + error.code;
      }
      setMessage(message);
    }

    // await addDoc(doc(db, "text", auth.uid), {
    //   character: "學習者",
    //   tag:""
    // });
    
  }

  return (
    <div>
      <Head>
        <title>註冊</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" pt={"5%"}>
        <Card
          display="flex"
          flexDirection="column"
          sx={{
            width: 345,
            height: 550,
            // bgcolor: "#000000",
            borderRadius: 2,
            p: 2,
            m: 2
          }}
        >
          <Image alt="裝飾用圖片" src={myImage} sx={{ p: 5 }} />
          <Button href="/" variant="contained" fullWidth="full">
            先看看其他文章 &rarr;
          </Button>
        </Card>


        <Card
          display="flex"
          flexDirection="column"
          sx={{
            width: 345,
            height: 550,
            borderRadius: 2,
            m: 2
          }}
        >

          <Typography variant="h5" sx={{ textAlign: "center", m: 1 }}>註冊</Typography>
          <Divider />
          <Box p={2}>
            <Typography variant="body1">使用者名稱</Typography>
            <TextField
              type="text"
              name="displayName"
              value={account.displayName}
              onChange={handleChange}
              placeholder="(日後可更改)"
              margin="dense"
              fullWidth
            />
            <Typography variant="body1">常用信箱</Typography>
            <TextField
              type="text"
              name="email"
              value={account.email}
              placeholder="請輸入信箱"
              onChange={handleChange}
              margin="dense"
              fullWidth
            />
            <Typography variant="body1">密碼</Typography>
            <TextField
              type="password"
              name="password"
              value={account.password}
              placeholder="請輸入密碼"
              onChange={handleChange}
              fullWidth
              margin="dense"
            />
            {/* <Typography variant="body1">確認密碼</Typography>
            <TextField
             type="password"
             name="password_check"
             placeholder="再次輸入密碼"
              fullWidth
              margin="dense"
            /> */}
            {message}

            <Button
              variant="contained"
              color="primary"
              onClick={handleOnClick}
              sx={{ m: 1 }}

            >
              註冊
            </Button>
            <Typography variant="body2" sx={{ m: 1 }}>
              已經有帳號了嗎？
              <Link sx={{color:"secondary"}} href="/login">點此登入</Link>
            </Typography>

          </Box>
        </Card>


      </Box>
      {/* <main className={styles.main}>
        <div className={styles.group}>
          <div className={styles.introduce}>
            {/* <Image alt="裝飾用圖片" src={myImage} />

            <div className={styles.grid}>
              <Link href="/" className={styles.post}>
                <p>先看看其他文章 &rarr;</p>
              </Link>
            </div> */}
      {/* <form> */}
      {/* <div className={styles.logincon}>
              <p className={styles.emailpass}>使用者名稱：</p>
              <input
                className={styles.enter}
                type="text"
                name="displayName"
                value={account.displayName}
                onChange={handleChange}
                placeholder="(日後可更改)"
              />
              <p className={styles.emailpass}>常用信箱：</p>
              <input
                className={styles.enter}
                type="text"
                name="email"
                value={account.email}
                onChange={handleChange}
                placeholder="請輸入信箱"
              />
              <p className={styles.emailpass}>密碼：</p>
              <input
                className={styles.enter}
                type="password"
                name="password"
                value={account.password}
                onChange={handleChange}
                placeholder="請輸入密碼"
              />
              {/* <p className={styles.emailpass}>確認密碼：</p>
              <input
                className={styles.enter}
                type="password"
                name="password_check"
                placeholder="再次輸入密碼"
              /> */}
      {/* {message}
              <input
                className={styles.loginbtn}
                type="button"
                onClick={haddleOnClick}
                value="註冊"
                name="register_btn"
              />
              <p>已經有帳號了嗎？</p>
              <h4>
                <Link href="/login">點此登入</Link>
              </h4>
            </div> */}
      {/* </form> */}
      {/* </div> */}
      {/* </div> */}
      {/* </main> */}

    </div>
  );
};
export default Home;
