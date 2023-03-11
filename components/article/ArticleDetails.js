import { Article } from "../../interfaces/entities";
import Image from "next/image";
// import React from "react";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { useRouter } from "next/router";
import warning from "../../public/pic/warning.jpg";
import styles from "/styles/Home.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  addDoc,
  Doc,
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
import { firebaseConfig } from "../../settings/firebaseConfig";
import VI from "@mui/icons-material/Visibility";
import OutlinedInput from "@mui/material/OutlinedInput";
import SendIcon from "@mui/icons-material/Send";
import Heart from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
import Comment from "./Comment";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Avatar,
  Grid,
  Paper,
} from "@mui/material";
import { getApp, getApps, initializeApp } from "firebase/app";
// const docRef = doc(db, "English", "1");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }
const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

// function Model(){
//   const [icoStatus, setIcoStatus] = useState(true)
//   const iconSouCangData = (event, props) => {
//     setIcoStatus(!icoStatus)
//   }
//     return(
//      <>
//                <span className={iconSouCang ? "opts-icon icon-soucang2 soucang-color" : "icon-hide"} onClick={(e) => iconSouCangData(e,props)}></span>
//               <span className={iconSouCang ? "icon-hide" : "opts-icon icon-soucang"} onClick={(e) => iconSouCangData(e,props)}></span>
//      </>
//     )}

const ArticleDetails = (props) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [user, setUser] = useState();
  const [liked, setLiked] = useState(false);
  const [deleted, setDeleted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [edited, setEdited] = useState(0);
  useEffect(() => {
    async function fetchData() {
      console.log("docId:",props.article);
      const querySnapshot = collection(
        db,
        "text",
        props.article.docId,
        "comment"
      );
      const queryText = query(querySnapshot, orderBy("timestamp", "asc"));
      const querySnapshotArticle = await getDocs(queryText);

      // const querySnapshot2 = await getDocs(query(collection(db, "text",  props.article.docId, "comment")));
      // querySnapshot2.forEach(async (doc2) => {
      //   console.log(doc2.id);
      //   console.log(doc2.data());
      //   temp2.push({ name: doc2.data().name, pic: doc2.data().pic });

      // });

      // const temp1= [user];
      // const temp2= [content];
      const temp = [];

      querySnapshotArticle.forEach((doc) => {
        let data = { ...doc.data(), id: doc.id };
        temp.push(data);
        console.log("data:", data)
      });

      // setComments(() => [temp1, temp2]);
      setComments(() => [...temp]);
    }
    fetchData();
    console.log("user:", user);
    console.log("article:", props.article);

    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      console.log("user", user);
    });

    return () => {
      unsub();
    };

    // eslint-disable-next-line
  }, [edited, liked, deleted]);

  const handleClose = () => {
    props.setOpen(false);
  };

  async function onSubmit() {
    if (typeof window !== "undefined") {
      if (!user) {
        alert("要登入才能新增留言ㄛ!");
        //window.alert("要登入才能新增筆記ㄛ!");

        // <Alert action={
        //   <Button >
        //     UNDO
        //   </Button>
        // }>要登入才能新增筆記ㄛ! </Alert>

        router.push("/login");
      } else {
        await addDoc(collection(db, "text", props.article.docId, "comment"), {
          content,
          userid: user.uid,
          timestamp: serverTimestamp(),
          heart:[],
          user: user.displayName,

          //user,

          // createAt:Timestamp.now(),
          // author:{
          //     displayName: auth.currentUser.displayName || "",
          //     photoURL: auth.currentUser.photoURL || "",
          //     uid: auth.currentUser.uid,
          //     email: auth.currentUser.email
          // },
        });
        setContent("");
        setEdited(edited + 1);

        //router.push('/');
      }
    }

    // console.log(tagName);
    // alert(user.uid)
    // alert(user.email)
    // await addDoc(collection(db, "text",
    // props.article.docId,"comment"))
  }

  // const heart = async function () {
  //   if (typeof window !== "undefined") {
  //     if (user) {
  //       const ref = doc(
  //         (db, "text", props.article.docId, "comment",id)
  //       );
  //       const docSnap = await getDoc(ref);
  //       if (docSnap.exists()) {
  //         if (docSnap.data().heart.includes(user.uid)) {
  //           alert("remove");
  //           updateDoc(ref, {
  //             heart: arrayRemove(user.uid),
  //           });
  //           setLiked(false);
  //           setCount(count - 1);
  //         } else {
  //           alert("added");
  //           updateDoc(ref, {
  //             heart: arrayUnion(user.uid),
  //           });
  //           setLiked(true);
  //           setCount(count + 1);
  //         }
  //       }
  //     }
  //   } else {
  //     alert("要登入才能按讚ㄛ!");
  //     //window.alert("要登入才能新增筆記ㄛ!");

  //     // <Alert action={
  //     //   <Button >
  //     //     UNDO
  //     //   </Button>
  //     // }>要登入才能新增筆記ㄛ! </Alert>

  //     router.push("/login");
  //   }
  // };

  const deleteData = async function () {
    if (typeof window !== "undefined") {
      if (user) {
        const ref = doc(db, "text", props.article.docId);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          if (docSnap.data().userid == user.uid) {
            try {
              setIsLoading(true);

              await deleteDoc(doc(db, "text", props.article.docId));

              //console.log("deleted");

              setDeleted(deleted + 1);

              setIsLoading(false);
              alert("刪除成功");
              props.update();
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("不是你的文章ㄚ");
          }
        }
      }
    } else {
      alert("請登入");
    }
  };

  const Update = () => {
    return (
      <div>
        <Button color="secondary" variant="contained" onClick={handleClose}>
          修改
        </Button>
        <Button color="secondary" variant="contained" onClick={deleteData}>
          刪除
        </Button>
      </div>
    );
  };

  const Report = () => {
    return (
      <div>
        <Button color="secondary" variant="contained" onClick={handleClose}>
          檢舉
        </Button>
      </div>
    );
  };

  const renderComment = (comment, i) => {
    return (
      <div key={comment.content}>
      {comment &&
      <div  style={{ padding: 14 }} className="App">
        
        <Comment edited={edited} setEdited={setEdited} article={props.article} comment={comment}/>
  
      </div>
  }
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>
          <a href={props.article.link}>{props.article.title}</a>

          <Stack spacing={1} className={styles.view}>
            <VI />
            <div className={styles.views}>{props.article.count}</div>
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Stack spacing={1}>
            {/* {props.article.content} */}
            <div className={styles.card3}>
              <a href={props.article.link}>
                {props.article.content.substring(0, 165)}
                {props.article.content.length > 165 ? "..." : ""}
              </a>
            </div>
          </Stack>

          <div style={{ padding: 14 }} className="App">
            {props.article.content.length > 180 && (
              <h2>
                <Image alt="版本疑慮" src={warning} />
                版本疑慮
              </h2>
            )}

            <div className={styles.yu}>
              {props.article.content.length > 180
                ? "這篇文章已經不符合現在的版本或者無法使用"
                : ""}
            </div>
            {comments.map((comment)=>renderComment(comment))}
            {/* <Comment article={props.article} /> */}
          </div>
          {user && user.displayName}
          <OutlinedInput
          value={content}
            onChange={(e) => setContent(e.target.value)}
            sx={{ padding: 1, margin: 5 , left: -20 , top: -1 , borderRadius: 12 , width: 340 , height: 35}}
            placeholder='我要留言...'
            // onClick={onSubmit}
          />
          <Button
            size="small"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={onSubmit}
            sx={{ padding: 0, margin: 1 ,right: -425 ,  top: -84 , borderRadius: 5 , width: 2 , height: 35}}
          ></Button>
        </DialogContent>

        <DialogActions>
          {user && user.uid === props.article.userid && Update()}
          {/* {user.uid}/{props.article.userid} */}
          {/* {props.article.userid} */}
          {user && Report()}
          {/* <Button color="primary" variant="contained" onClick={handleClose}>
            關閉
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ArticleDetails;
