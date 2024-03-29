import { Article } from "../../interfaces/entities";
import Image from "next/image";
// import React from "react";
import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import router from "next/router";
import { useRouter } from "next/router";
import warning from "../../public/pic/warning.jpg";
import styles from "/styles/Home.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
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
import CardHeader from "@mui/material/CardHeader";
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
  Box,
} from "@mui/material";
import { getApp, getApps, initializeApp } from "firebase/app";

//quill
// import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import "quill/dist/quill.core.css";

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

const Comment = (props) => {
  // const [comment, setComment] = useState();
  // const [content, setContent] = useState("");
  const [user, setUser] = useState();
  // const [currentuser, setCurrentUser] =useState();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(0);
  //   const [count, setCount] = useState(props.article.heart ? props.article.heart.length : 0);
  const [deleted, setDeleted] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [edited, setEdited] = useState(0);
  const ReactQuillEditor = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  useEffect(() => {
    async function fetchData() {
      console.log("comment:", props.comment);

      // const querySnapshot2 = await getDocs(query(collection(db, "text",  props.article.docId, "comment")));
      // querySnapshot2.forEach(async (doc2) => {
      //   console.log(doc2.id);
      //   console.log(doc2.data());
      //   temp2.push({ name: doc2.data().name, pic: doc2.data().pic });

      // });

      // const temp1= [user];
      // const temp2= [content];
      // const temp = [];

      // querySnapshotArticle.forEach((doc) => {
      //   let data = { ...doc.data(), id: doc.id };
      //   temp.push(data);
      // });

      // setComments(() => [temp1, temp2]);
      //setComment(() => {{...props.comment}});
    }
    fetchData();

    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // setHeart(user);
      console.log("user", user);
    });

    return () => {
      unsub();
    };

    // eslint-disable-next-line
  }, [edited, liked, deleted]);

  //   const handleClose = () => {
  //     props.setOpen(false);
  //   };

  // async function onSubmit() {
  //   if (typeof window !== "undefined") {
  //     if (!user) {
  //       alert("要登入才能新增留言ㄛ!");
  //       //window.alert("要登入才能新增筆記ㄛ!");

  //       // <Alert action={
  //       //   <Button >
  //       //     UNDO
  //       //   </Button>
  //       // }>要登入才能新增筆記ㄛ! </Alert>

  //       router.push("/login");
  //     } else {
  //       await addDoc(collection(db, "text", props.article.docId, "comment"), {
  //         content,
  //         userid: user.uid,
  //         timestamp: serverTimestamp(),

  //         user: user.displayName,
  //         heart:[],
  //         //user,

  //         // createAt:Timestamp.now(),
  //         // author:{
  //         //     displayName: auth.currentUser.displayName || "",
  //         //     photoURL: auth.currentUser.photoURL || "",
  //         //     uid: auth.currentUser.uid,
  //         //     email: auth.currentUser.email
  //         // },
  //       });
  //       setContent("");
  //       setEdited(edited + 1);

  //       //router.push('/');
  //     }
  //   }

  //   // console.log(tagName);
  //   // alert(user.uid)
  //   // alert(user.email)
  //   // await addDoc(collection(db, "text",
  //   // props.article.docId,"comment"))
  // }
  // //const heart = function () {};

  // const setHeart = async (user,id) => {
  //   const ref = doc(db, "text", props.article.docId, "comment",id);
  //   const docSnap = await getDoc(ref);
  //   if (docSnap.exists()) {
  //     setCount(comment.heart ? comment.heart.length : 0)
  //     if (user) {
  //       if (comments.heart && docSnap.data().heart.includes(user.uid)) {
  //         setLiked(true)
  //         console.log(comment.id + 'liked')
  //       }
  //       else {

  //         setLiked(false)
  //         console.log(comment.id + 'unliked')

  //       }
  //     }

  //   }
  // }
  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log('currentUser', user)
  //       setCurrentUser(user);
  //       setHeart(user)
  //     }
  //     //console.log(user);
  //   });

  //   return () => {
  //     unsub();
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [liked]);

  const deleteComment = async function (id) {
    if (typeof window !== "undefined") {
      if (user) {
        const ref = doc(db, "text", props.article.docId, "comment", id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          if (docSnap.data().userid == user.uid) {
            try {
              setIsLoading(true);

              await deleteDoc(
                doc(db, "text", props.article.docId, "comment", id)
              );

              //console.log("deleted");

              setDeleted(deleted + 1);

              setIsLoading(false);
              alert("刪除成功");
              props.setEdited(props.edited + 1);
            } catch (error) {
              console.log(error);
            }
          } else {
            alert("不是你的留言ㄚ");
          }
        }
      }
    } else {
      alert("請登入");
    }
  };

  const heart = async function (id) {
    if (typeof window !== "undefined") {
      if (user) {
        const ref = doc(db, "text", props.article.docId, "comment", id);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          // console.log(docSnap.data())
          if (docSnap.data().heart.includes(user.uid)) {
            // alert('remove')
            updateDoc(ref, {
              heart: arrayRemove(user.uid),
            });
            setLiked(false);
            setCount(count - 1);
          } else {
            // alert('added')
            updateDoc(ref, {
              heart: arrayUnion(user.uid),
            });
            setLiked(true);
            setCount(count + 1);
          }
        }
      }
    } else {
      alert("要登入才能按讚ㄛ!");
      //window.alert("要登入才能新增筆記ㄛ!");

      // <Alert action={
      //   <Button >
      //     UNDO
      //   </Button>
      // }>要登入才能新增筆記ㄛ! </Alert>

      router.push("/login");
    }
  };

  const commentDelete = (comment) => {
    return (
      <>
        <IconButton
          //style={{ textAlign: "left", left: 300, bottom: 80 }}
          aria-label="heart"
          size="small"
          onClick={() => deleteComment(comment.id)}
        >
          <RestoreFromTrashIcon />
        </IconButton>
      </>
    );
  };
  const usual = () => {
    return <></>;
  };

  const renderComment = (comment, i) => {
    return (
      <div key={comment.content}>
        <Paper>
          <Box display="flex" flexDirection="column" sx={{ p: 2 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Avatar sx={{ height: 25, width: 25, mr: 1 }} />
                <Typography variant="body2"> {comment.user}</Typography>
              </Box>
              {/* <CardHeader
                  avatar={
                    
                  }
                  title={comment.user}
                  // subheader={comment.timestamp && comment.timestamp.toDate().toLocaleString()}
                  //item 
                /> */}

              <Box display="flex" alignItems="center">
                <IconButton
                  //style={{ textAlign: "left", left: 300, bottom: 80 }}
                  aria-label="heart"
                  size="small"
                  onClick={() => heart(comment.id)}
                  sx={
                    liked ? { color: "error.main" } : { color: "text.disabled" }
                  }
                >
                  <Heart />
                </IconButton>
                <Typography
                  //style={{ position: "relative", bottom: 110, left: 340 }}
                  variant="body2"
                  color="text.secondary"
                >
                  {comment.heart ? count : 0}
                </Typography>
                {user && user.uid === comment.userid
                  ? commentDelete(comment)
                  : usual()}
              </Box>
            </Box>
            <Box>
              {/* <Typography variant="body2" sx={{ m: 2, textAlign: "left" }}> */}
              {typeof window !== "undefined" && (
                <ReactQuillEditor
                  theme="bubble"
                  readOnly={true}
                  value={comment.content}
                />
              )}
              {/* </Typography> */}
              <Typography
                variant="caption"
                style={{ textAlign: "left", color: "grey" }}
              >
                {comment.timestamp &&
                  comment.timestamp.toDate().toLocaleString()}
              </Typography>
            </Box>
          </Box>
        </Paper>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      {/* <Dialog open={props.open} onClose={handleClose}> */}
      {/* <DialogTitle>
          <a href={props.article.link}>{props.article.title}</a>

          <Stack spacing={1} className={styles.view}>
            <VI />
            <div className={styles.views}>{props.article.count}</div>
          </Stack>
        </DialogTitle> */}

      {/* <DialogContent> */}
      {/* <Stack spacing={1}> */}
      {/* {props.article.content} */}
      {/* <div className={styles.card3}>
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
            </div> */}
      {renderComment(props.comment)}

      {/* </div> */}
      {/* {user && user.displayName} */}
      {/* <OutlinedInput
        value={content}
        onChange={(e) => setContent(e.target.value)}
        sx={{
          padding: 1,
          margin: 5,
          left: -20,
          top: -1,
          borderRadius: 12,
          width: 340,
          height: 35,
        }}
        placeholder="我要留言..."
        // onClick={onSubmit}
      />
      <Button
        size="small"
        variant="contained"
        endIcon={<SendIcon />}
        onClick={onSubmit}
        sx={{
          padding: 0,
          margin: 1,
          right: -425,
          top: -84,
          borderRadius: 5,
          width: 2,
          height: 35,
        }}
      ></Button> */}
      {/* </DialogContent> */}

      {/* <DialogActions> */}

      {/* {user && user.uid === props.article.userid && Update()}  */}
      {/* {user.uid}/{props.article.userid} */}
      {/* {props.article.userid} */}
      {/* {user && Report()} */}
      {/* <Button color="primary" variant="contained" onClick={handleClose}>
            關閉
          </Button> */}
      {/* </DialogActions> */}
      {/* </Dialog> */}
    </div>
  );

  // return (

  //   <div className={styles.container}>
  //       <Dialog open={props.open} onClose={handleClose}>
  //         <DialogTitle>{props.article.title}</DialogTitle>

  //         <DialogContent>
  //           <Stack spacing={2}>
  //           {props.article.content}
  //           </Stack>

  //           <div style={{ padding: 14 }} className="App">

  //     <h2><Image src={warning}/>版本疑慮</h2>

  //     <div className={styles.yu}>這篇文章已經不符合現在的版本或者無法使用</div><br/>
  //     <Paper style={{ padding: "40px 20px" }}>
  //       <Grid container wrap="nowrap" spacing={2}>
  //         <Grid item>
  //           <Avatar alt="Remy Sharp" />
  //         </Grid>
  //         <Grid justifyContent="left" item xs zeroMinWidth>
  //           <h4 style={{ margin: 0, textAlign: "left" }}>aaa</h4>
  //           <p style={{ textAlign: "left" }}>

  //           </p>
  //           <p style={{ textAlign: "left", color: "gray" }}>
  //             posted 1 minute ago
  //           </p>
  //         </Grid>
  //       </Grid>
  //       <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
  //       </Paper>
  //       </div>

  //         </DialogContent>
  //         <DialogActions>
  //           <Button color="secondary" variant="contained" onClick={handleClose}>
  //             愛心
  //           </Button>
  //           <Button color="secondary" variant="contained" onClick={handleClose}>
  //             儲存
  //           </Button>
  //           <Button color="secondary" variant="contained" onClick={handleClose}>
  //             分享
  //           </Button>

  //           <Button color="primary" variant="contained" onClick={handleClose}>
  //             關閉
  //           </Button>

  //         </DialogActions>
  //       </Dialog>
  //   </div>
  // );
};

export default Comment;
