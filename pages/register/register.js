import Head from 'next/head'
import Image from 'next/image'
import { getApps, getApp, initializeApp } from "firebase/app";
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import styles from "/styles/Home.module.css";
import {firebaseConfig} from '../../settings/firebaseConfig';

export default function SignUp() {
  if (getApps().length===0) {
    initializeApp(firebaseConfig);
  }
  const [account, setAccount] = useState({email:"",password:"", displayName:""});
  const [message, setMessage] = useState("");
  const handleChange = function(e){
    setAccount({...account,[e.target.name]:e.target.value})
  }
  const handleSubmit = async function(){
    try {
      const auth = getAuth();
      const res = await createUserWithEmailAndPassword(auth, account.email, account.password);
      if (res) {
        await updateProfile(auth.currentUser,{displayName: account.displayName});
      }
      setMessage("");

    }
    catch(error){
      setMessage(""+error);
    }
  }

  

  return (
    <div className={styles.container}>
      <Head>
      <title>筆記分享區</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>

      
      <div className={styles.introduce}>
        <img src="pic/welcome.png" width="300px" />
        
        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.post}>
            <p>先看看其他文章 &rarr;</p>
          </a>
        </div>
      </div>
     
      <div className={styles.logincon}>
        <form method="post" action="login.php">
        <p className={styles.emailpass}>使用者名稱：</p>
          <input className={styles.enter} type="text" name="username" placeholder="(日後可更改)"/>
        <p className={styles.emailpass}>常用信箱：</p>
          <input className={styles.enter} type="text" name="account" placeholder="請輸入信箱"/>
        <p className={styles.emailpass}>密碼：</p>
          <input className={styles.enter} type="password" name="password" placeholder="請輸入密碼"/>
        <p className={styles.emailpass}>確認密碼：</p>
          <input className={styles.enter} type="password" name="password_check" placeholder="再次輸入密碼"/>

        <input className={styles.loginbtn} type="submit" value="註冊" name="register_btn"/>
        <p>已經有帳號了嗎？</p>
        <h4><a href="login.tsx">點此登入</a></h4>
        </form>
      </div>
      
      </main>
   

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
    </div>
  )
}
