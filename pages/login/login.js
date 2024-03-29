import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import styles from "/styles/Home.module.css";
import Index from "pages";
import googleIcon from "../../public/pic/googleIcon.png";
import Note from "../../pages/note"
//firebase
import { getApps, getApp, initializeApp } from "firebase/app";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { firebaseConfig } from "../../settings/firebaseConfig";
import { useRouter } from "next/router";
import Link from "next/link";
import myImage from "../../public/pic/welcome.png";

//mui
import { Container } from "@mui/material/Container";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { Button, TextField, Card, Divider, Alert } from "@mui/material";

//import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "myapp/src/firebase";
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
} from "firebase/firestore";
import { async } from "@firebase/util";

const db = getFirestore();
export default function SignIn() {
  const [value, setValue] = useState('');
const provider2=new GoogleAuthProvider();

  const handleClick = async() => {
    signInWithPopup(auth, provider2).then((async data => {
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
// console.log("value",data.user)
      if (value) {
      const ref = doc(db, "profile", data.user.uid);
      const docSnap = await getDoc(ref);
      // console.log("login!!!!",docSnap)
      if (docSnap.exists()) {
        // updateDoc(doc(db, "profile", data.user.uid), {
        //   character: docSnap.character,
        //   majortag: [],
        //   userid: auth.currentUser.uid,
        //   user: auth.currentUser.displayName,
        //   email: auth.currentUser.email,
        //   photoURL: data.user.photoURL,
        // });
      }
      else {
        // console.log("login", data.user.uid)
        await setDoc(doc(db, "profile", data.user.uid), {
          character: "學習者",
          majortag: [],
          userid: auth.currentUser.uid,
          user: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoURL: data.user.photoURL,
        });
      }

        router.push("/note")
      }
    }))
    // {value?router.push("/note"): }
  }
  useEffect(() => {
    setValue(localStorage.getItem('email'))
  },[])


  const router = useRouter();
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
  const [account, setAccount] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [message, setMessage] = useState("");
  const handleChange = function (e) {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };
  const handleSubmit = async function () {
    try {
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(
        auth,
        account.email,
        account.password
      );
      //console.log(res);
      if (res) {
        //console.log(auth.currentUser.displayName);
        //props.setStatus("signedIn");
        //useRouter().push("/");
        alert("登入成功");
        router.push("/note");
      }
    } 
    catch (error) {
      let errorMsg =''
      switch (error.code) {
        case 'auth/invalid-email':
          errorMsg = '電子信箱格式錯誤'
          break
        case 'auth/user-not-found':
          errorMsg = '此用戶不存在'
          break
        case 'auth/missing-password':
          errorMsg = '密碼錯誤'
          break
        default:
          errorMsg = error.code + ':' + error.message
      }
      setMessage(<Alert sx={{mt:2,mb:1.5}} severity="info">{errorMsg}</Alert>);
    }
  };



  const handleForgetPwd = () => {
    //const email = form.getFieldValue('email')
    const auth = getAuth();
    if (account.email) {
      sendPasswordResetEmail(auth, account.email)
        .then(function () {
          // message.info('密碼重設信件已寄出，請依照信中連結進行重設。')
          alert('密碼重設信件已寄出，請依照信中連結進行重設。')
          // console.log("密碼重設信件已寄出，請依照信中連結進行重設。")
        })
        .catch(function (error) {
          let errorMsg = ''
          switch (error.code) {
            case 'auth/invalid-email':
              errorMsg = '電子信箱格式錯誤'
              break
            case 'auth/user-not-found':
              errorMsg = '此用戶不存在'
              break
            default:
              errorMsg = error.code + ':' + error.message
          }
          // message.error('忘記密碼: ' + errorMsg)
          alert('忘記密碼: ' + errorMsg)
          // console.log('忘記密碼: ' + errorMsg)

        })
    } else {
      // message.warn('請輸入電子信箱')
      alert('請輸入電子信箱')
      // console.log('請輸入電子信箱')
    }
  }

  const changeStatus = function () {
    router.push("/register");
    //props.setStatus("signUp");
  };

  // useEffect(() => {
  //   const auth = getAuth();
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     console.log("user:", user);
  //     if (user) {
  //       //remove user.password since there is no passwortd in user
  //       setAccount({ ...account, email: user.email });
  //     }
  //   });

  //   return () => {
  //     unsub();
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div>
      <Head>
        <title>登入</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" pt={"10%"}>
        <Card
          display="flex"
          flexDirection="column"
          sx={{
            width: 345,
            height: 450,
            // bgcolor: "#000000",
            borderRadius: 2,
            p: 2,
            m: 2
          }}
        >
          <Image alt="裝飾用圖片" src={myImage} sx={{ p: 5 }} />
          <Button href="/note" variant="contained" fullWidth="full">
            先看看其他文章 &rarr;
          </Button>
        </Card>

        <Card
          display="flex"
          flexDirection="column"
          sx={{
            width: 345,
            borderRadius: 2,
            m: 2,
            pb:2
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center", m: 1 }}>登入</Typography>
          <Divider />
          <Box p={2}>
            <Typography variant="body1">常用信箱：</Typography>
            <TextField
              type="text"
              name="email"
              value={account.email}
              placeholder="請輸入信箱..."
              onChange={handleChange}
              autoComplete="email"
              margin="dense"
              fullWidth
            />
            <Typography variant="body1">密碼：</Typography>
            <TextField
              type="password"
              name="password"
              value={account.password}
              placeholder="請輸入密碼..."
              onChange={handleChange}
              autoComplete="current-password"
              fullWidth
              margin="dense"
            />

            {message}

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              sx={{ m: 1 }}
            >
              登入
            </Button>
            {/* <googleSignin/> */}
            <Button onClick={handleForgetPwd}>忘記密碼</Button>

            {/* {value?router.push("/note"): */}

            {/* }  */}
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography variant="body2" sx={{ m: 1 }}>沒有帳號？現在就加入我們吧！</Typography>
              <Button
                variant="contained"
                color="secondary"
                onClick={changeStatus}
                cursor="pointer"
              >
                註冊
              </Button>
            </Box>

          </Box>
          <Divider />

          <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 2 }}>

            <Button variant="contained" sx={{ bgcolor: "#ffffff", color: "#000000", borderRadius: 10 }} onClick={handleClick}>
              <Box sx={{width:20,height:20,mr:1}}>
                <Image src={googleIcon} />
              </Box>
              Signin with Google
            </Button>
          </Box>

        </Card>
      </Box>

      {/* <main className={styles.main}>
        <div className={styles.group}>
          <div className={styles.introduce}>
            <Image alt="裝飾用圖片" src={myImage} />

            <div className={styles.grid}>
              <Link href="/" className={styles.post}>
                <p>先看看其他文章 &rarr;</p>
              </Link>
            </div>
            {/* <form> */}
      {/* <div className={styles.logincon}>
              <p className={styles.emailpass}>常用信箱：</p>
              <input
                className={styles.enter}
                type="text"
                name="email"
                value={account.email}
                placeholder="請輸入信箱..."
                onChange={handleChange}
                autoComplete="email"
              />
              <br />
              <p className={styles.emailpass}>密碼：</p>
              <input
                className={styles.enter}
                type="password"
                name="password"
                value={account.password}
                placeholder="請輸入密碼..."
                onChange={handleChange}
                autoComplete="current-password"
              />
              <br />
              {message}
              <Button
                className={styles.login_btn}
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                登入
              </Button>
              <br />
              <Button onClick={handleForgetPwd}>忘記密碼</Button>
              <br />
              <br />
              <p>沒有帳號？現在就加入我們吧！</p>
              <br />
              <h4>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={changeStatus}
                >
                  我要註冊
                </Button>
              </h4>
            </div>
            {/* </form> */}
      {/* </div> */}
      {/* </div> */}
      {/* </main> */}
    </div>
  );
}
