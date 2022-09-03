import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';
import styles from "/styles/Home.module.css";
<<<<<<< Updated upstream
=======
import { getApps, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {config} from '../settings/firebaseConfig';

////////////////////////////////////////////////

export default function SignIn(props) {
  if (getApps().length===0) {
    initializeApp(config);
  }
  const [account, setAccount] = useState({email:"",password:"", displayName:""});
  const [message, setMessage] = useState("");
  const handleChange = function(e){
    setAccount({...account,[e.target.name]:e.target.value})
  }
  const handleSubmit = async function(){
    try {
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(auth, account.email, account.password);
      //console.log(res);
      if (res) {
        //console.log(auth.currentUser.displayName);
        props.setStatus("signedIn");
      }
      setMessage("");
    }
    catch(error){
      setMessage(""+error);
    }
  }
  const changeStatus = function(){
    props.setStatus("signUp");
  }

/////////////////////////////////////////////////////////


>>>>>>> Stashed changes

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
      <title>筆記分享區</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

<<<<<<< Updated upstream
      
      <div className={styles.introduce}>
        <img src="pic/welcome.png" width="300px" />
        
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.post}>
            <p>先看看其他文章 &rarr;</p>
          </a>
=======
          </div>
          <form>
          <div className={styles.logincon}>
            <p className={styles.emailpass}>常用信箱：</p>
            <input className={styles.enter} type="text" name="email" value={account.email} placeholder="請輸入信箱..." onChange={handleChange} autoComplete="email"/>
            <p className={styles.emailpass}>密碼：</p>
            <input className={styles.enter} type="password" name="password" value={account.password} placeholder="請輸入密碼..." onChange={handleChange} autoComplete="current-password"/><br />
            {message}<br/>
            <Button className={styles.login_btn} variant="contained" color="primary" onClick={handleSubmit}>登入</Button><br />
            <a href="">忘記密碼</a><br />
            <p>沒有帳號？現在就加入我們吧！</p>
            <h4><Button variant="contained" color="secondary" onClick={changeStatus}>我要註冊</Button></h4>
          </div>
          </form>
>>>>>>> Stashed changes
        </div>
      </div>
     
      <div className={styles.logincon}>
        <p className={styles.emailpass}>常用信箱：</p>
          <input className={styles.enter} type="text" name="email" placeholder="請輸入信箱..."/>
        <p className={styles.emailpass}>密碼：</p>
          <input className={styles.enter} type="password" name="password" placeholder="請輸入密碼..."/><br/>
        <input className={styles.loginbtn} type="submit" value="登入" name="submit"/><br/>
        <a href="">忘記密碼</a><br/>
        <p>沒有帳號？現在就加入我們吧！</p>
        <h4><a href="register.php">點此註冊</a></h4>
      </div>
      
      </main>
<<<<<<< Updated upstream
   

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
=======
>>>>>>> Stashed changes
    </div>
  )
}

export default Home
