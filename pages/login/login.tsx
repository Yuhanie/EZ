import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import styles from "/styles/Home.module.css";

import { getApps, getApp, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from '../../settings/firebaseConfig';
import { useRouter } from "next/router";
import Link from 'next/link';
import myImage from '../../public/pic/welcome.png';

//import { getFirestore, collection, getDocs } from "firebase/firestore";


export default function SignIn(props: { setStatus: (arg0: string) => void; }) {
  const router = useRouter();
  if (getApps().length === 0) {
    initializeApp(firebaseConfig);
  }
  const [account, setAccount] = useState({ email: "", password: "", displayName: "" });
  const [message, setMessage] = useState("");
  const handleChange = function (e: { target: { name: any; value: any; }; }) {
    setAccount({ ...account, [e.target.name]: e.target.value })
  }
  const handleSubmit = async function () {
    try {
      const auth = getAuth();
      const res = await signInWithEmailAndPassword(auth, account.email, account.password);
      //console.log(res);
      if (res) {
        //console.log(auth.currentUser.displayName);
        //props.setStatus("signedIn");
        //useRouter().push("/");
        router.push('/')
      }


    }
    catch (error) {
      setMessage("" + error);
    }
  }
  const changeStatus = function () {
    props.setStatus("signUp");
  }


  return (
    <div className={styles.container}>
      <Head>
        <title>筆記分享區</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>


        <div className={styles.group}>
          <div className={styles.introduce}>

            <Image src={myImage}/>

            <div className={styles.grid}>
              <a href="/" className={styles.post}>
                <p>先看看其他文章 &rarr;</p>
              </a>

            </div>
            <form>
              <div className={styles.logincon}>
                <p className={styles.emailpass}>常用信箱：</p>
                <input className={styles.enter} type="text" name="email" value={account.email} placeholder="請輸入信箱..." onChange={handleChange} autoComplete="email" /><br/>
                <p className={styles.emailpass}>密碼：</p>
                <input className={styles.enter} type="password" name="password" value={account.password} placeholder="請輸入密碼..." onChange={handleChange} autoComplete="current-password" /><br />
                {message}
                <Button className={styles.login_btn} variant="contained" color="primary" onClick={handleSubmit}>登入</Button><br />
                <a href="">忘記密碼</a><br /><br/>
                <p>沒有帳號？現在就加入我們吧！</p><br/>
                <h4><Button variant="contained" color="secondary" onClick={changeStatus}>我要註冊</Button></h4>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}


