import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../styles/Home.module.css'
import Button from 'react-bootstrap/Button';

<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
  integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
  crossOrigin="anonymous"
/>

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
      <title>新增文章</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
      <div className={styles.addArticle_container}>
          <div className={styles.addArticle_bar}>
            <div className={styles.user_box}>
              <div><img className="user_image" src="pic/test1.jpeg"/></div>
              <div className={styles.user_name}></div>
            </div>
          </div>  

        <div className={styles.grid}>
      <div>
        <div><textarea className={styles.addArticle_contectTitle} placeholder="請輸入文章標題..." name="title"></textarea> </div>
        <textarea name="Content" style={{width:"1000px",height:"400px"}} placeholder="請輸入文章內容..." ></textarea>
          <br></br>
            <input className={styles.enter} style={{position:"absolute", width:'15%'}} placeholder="請輸入筆記標籤..."/>
        </div>
      </div>

        <div className={styles.addArticle_function}></div>
          <div className={styles.upload_file}></div>
            <Button variant="contained" component="label">
                        上傳檔案
                  <input hidden accept="image/*" multiple type="file" />
            </Button>
            <div className={styles.addArticle_function_btn}></div>
              <button className="btn" type="submit">發布</button>
              <button className="btn" type="submit">取消</button>
              
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

export default Home
