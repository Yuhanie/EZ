import { Article } from "../../interfaces/entities";
import Image from "next/image";
// import React from "react";
import React, { useEffect, useState } from "react";
import router from "next/router";
import { useRouter } from "next/router";
import Report from "./report";
import warning from "../../public/pic/warning.jpg";
import styles from "/styles/Home.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import FormControl from '@mui/material/FormControl';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
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
import { firebaseConfig } from "../../settings/firebaseConfig";
import VI from "@mui/icons-material/Visibility";
import OutlinedInput from "@mui/material/OutlinedInput";
import SendIcon from "@mui/icons-material/Send";
import Heart from "@mui/icons-material/Favorite";
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
  TextField,
  Paper,
} from "@mui/material";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

const ArticleDetails = (props) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [user, setUser] = useState();
  const [outdated, setOutdated] = useState(false);
  const [deleted, setDeleted] = useState(0);
  const [count, setCount] = useState(props.article.outdateCount?props.article.outdateCount.length:0);
  const [isLoading, setIsLoading] = useState(false);
  const [edited, setEdited] = useState(0);
  const [character, setCharacter]=useState("");
  const [expertOutdate, setExpertOutdate]=useState("");
  const [open, setOpen] = useState(false);
  const [report, setReport]=useState("");
  const [denounce, setDenounce]=useState("");
  const [reportCount, setReportCount]=useState("");


  
  useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (user) => {
    setUser(user);
    if(user) {
      const ref = doc(db, "profile", user.uid);
      const docSnap = await getDoc(ref);

      // const refReport = collection(db,"text",props.article.docId,"denounce");
      // const docSnapReport = await getDoc(refReport);
      if ((docSnap.exists()&&docSnap.data().character==="專家")) {
      setCharacter("專家")
      }
      // if (docSnapReport.exists()) {
      //   setOutdated(true)
      //   console.log(props.article.title+'outdated');
      // }
      else {
        setOutdated(false)
        console.log('article:',props.article);
        console.log('outdateCount:',props.article.outdateCount);
      }      
    }
    console.log("user", user);
  });
  return () => {
    unsub();
  };
}
,[props.article]);

  useEffect(() => {
    async function fetchData() {


      // const querySnapshotDenounce = collection(
      //   db,
      //   "text",
      //   props.article.docId,
      //   "denounce"
      // );
      // const queryReport = query(querySnapshotDenounce);
      // const querySnapshotReport = await getDocs(queryReport);
      // const tempReport = [];
      // querySnapshotReport.forEach((doc) => {
      //   let count = value => reason.filter(reason => status == value).length;
      //   tempReport.push(count);
      //   console.log("data:", data)
      // });
      // setDenounce(() => [...tempReport]);


      
      console.log("docId:",props.article);
      const querySnapshot = collection(
        db,
        "text",
        props.article.docId,
        "comment"
      );
      const queryText = query(querySnapshot, orderBy("timestamp", "asc"));
      const querySnapshotArticle = await getDocs(queryText);
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



    // eslint-disable-next-line
  }, [edited, outdated, deleted]);

  const handleClose = () => {
    props.setOpen(false);
  };


const update = (id) => {
  router.push('/Newpost?articleId='+id);
}




const reportHandleOpen = () => {
  setOpen(true);
};

const reportHandleClose = () => {
  setOpen(false);
};





const outdate = async function(){
  if (typeof window !== "undefined") {
    if (user) {
      const ref = doc(db, "text", props.article.docId);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
          try {
            setIsLoading(true);
            
                 await updateDoc(doc(db,"text",props.article.docId),{
                outdate:expertOutdate
                
          });
            setIsLoading(false);
            props.update();
          }
          catch (error) {
            // console.log(error);
          }
      }
      
  //     if((docSnap.data().outdate)=="solved"){
  //       await deleteDoc(collection(db, "text", props.article.docId, "outdateCount"));
  //       setDeleted(deleted + 1);
  // }
    }
  } else {
    alert("請登入");
  }
};



const Denounce = async function(report){
  console.log("report",report)
  if (typeof window !== "undefined") {
    if (user) {
      const ref = doc(db, "text", props.article.docId);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        if(report=="stale"){
          if((docSnap.data().outdate)=="stale"){
            await updateDoc(doc(db,"text",props.article.docId),{
              outdate:"stale"
              
        });
          }
          else{
          // alert("stale")
          try {
            setIsLoading(true);
                await updateDoc(doc(db,"text",props.article.docId),{
                outdate:"pending"
                
          });
            setIsLoading(false);
            props.update();
          }
          catch (error) {
            // console.log(error);
          }
        }
      }
      else{
        await setDoc(doc(db, "text", props.article.docId, "denounce", user.uid), {
          reason:report
        });
      }
      }
      
  //     if((docSnap.data().outdate)=="solved"){
  //       await deleteDoc(collection(db, "text", props.article.docId, "outdateCount"));
  //       setDeleted(deleted + 1);
  // }
    }
  } else {
    alert("請登入");
  }
};







  // const outdateCount = async function () {
  //   if (typeof window !== "undefined") {
  //     if (user) {
  //       const ref = doc(db, "text", props.article.docId);
  //       const docSnap = await getDoc(ref);
  //       if ((docSnap.exists())) {
  //         // console.log(docSnap.data())
  //         if (docSnap.data().outdateCount.includes(user.uid)) {
  //           // alert('remove')
  //           if ((docSnap.data().outdate)=="pending" && docSnap.data().outdateCount.length === 1){
  //             updateDoc(ref, {
  //               outdate: "solved"
  //             });
  //           }
  //           updateDoc(ref, {
  //             outdateCount: arrayRemove(user.uid)
  //           });
  //           setOutdated(false)
  //           setCount(count - 1)
  //           // if((props.article.outdateCount.length)==0){
  //           //   updateDoc(ref, {
  //           //     outdate: "solved"
  //           //   });
  //           // }
  //         } else {
  //           // alert('added')
  //           updateDoc(ref, {
  //             outdateCount: arrayUnion(user.uid)

  //           });
  //           setOutdated(true)
  //           setCount(count + 1)
  //           if ((docSnap.data().outdate)=="stale"){
  //             updateDoc(ref, {
  //               outdate: "stale"
  //             });
  //           }
  //           else{
  //             updateDoc(ref, {
  //               outdate: "pending"
  //           });
  //           }
  //         }
  //         props.update();
  //       }
  //     }
  //   }
  //   else {
  //     alert("要登入才能按讚ㄛ!")
  //     router.push('/login');
  //   }
  // }









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
        });
        setContent("");
        setEdited(edited + 1);

        //router.push('/');
      }
    }


  }


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



  const expert = () => {
    return(
      <>
      <FormControl sx={{width:110}}>
       <InputLabel id="demo-simple-select-label">過時與否</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={topicName}
                // label="topic"
                onChange={(e) => {setExpertOutdate(e.target.value); 
               }} 
            >
                <MenuItem value="stale">過時或無法使用</MenuItem>
                <MenuItem value="solved">沒問題</MenuItem>
            </Select>
      </FormControl><br/>
            <Button color="secondary" variant="contained" onClick={()=>outdate(expertOutdate)}>
          送出
        </Button>
      </>
    );
  };

  const outdateIcon = () => {
    return (
      <div>
        {props.article.outdate==="stale"&&<WarningIcon sx={{color:"Crimson"}}/>}
        {props.article.outdate==="pending"&&<NotificationImportantIcon sx={{color:"Gold"}}/>}
        {props.article.outdate==="solved"&&
        <CheckCircleIcon sx={{color:"Green"}}/>}
      </div>
    );
  };

  const Update = (id) => {
    return (
      <div>
        <Button color="secondary" variant="contained" onClick={()=>update(id)}>
          修改
        </Button>
        <Button color="secondary" variant="contained" onClick={deleteData}>
          刪除
        </Button>
      </div>
    );
  };

  const Report = (id) => {
    return (
      <div>

        <FormControl sx={{width:110}}>
          <InputLabel id="demo-simple-select-label">選擇原因</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={topicName}
                // label="topic"
                onChange={(e) => {setReport(e.target.value); 
               }} 
            >
                <MenuItem value="stale">過時或無法使用</MenuItem>
                <MenuItem value="empty">內容空泛</MenuItem>
                <MenuItem value="curse">中傷、挑釁、謾罵他人</MenuItem>
                <MenuItem value="spamming">惡意洗版</MenuItem>
                <MenuItem value="tagerror">文章分類錯誤</MenuItem>
            </Select>
      </FormControl>

        <Button color="secondary" variant="contained" onClick={()=>Denounce(report)}>
          檢舉
        </Button>
{/*        
          <Button color="secondary" variant="contained" onClick={()=>report(id)}>
            檢舉
          </Button> */}
       
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
        {outdateIcon()}
          <a href={props.article.link}>{props.article.title}</a>

          <Stack>
              <VI/>
            {props.article.count}

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
          {character==="專家"&&expert()}

          <div style={{ padding: 14 }} className="App">
            {props.article.outdate ==='stale' && (
              <h2>
                <Image alt="版本疑慮" src={warning} />
                版本疑慮
              </h2>
            )}

            <div className={styles.yu}>
              {props.article.outdate ==='stale'
                ? "這篇文章已經不符合現在的版本或者無法使用"
                : ""}
            </div>
            
            {/* <IconButton
                style={{  }}
                aria-label="heart"
                size="medium"
                onClick={()=>outdateCount()}
                sx={{textAlign: "left", left: 300, bottom: 80,
                  color: outdated?"orange":"grey" 
                }}
              >
            <LiveHelpIcon/>
            </IconButton> */}

            {/* <Typography
                style={{ position: "relative", bottom: 110, left: 340 }}
                variant="body2"
                color="text.secondary"
              >
                {outdateCount ? count : 0}
              </Typography> */}

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
          {user && user.uid === props.article.userid && Update(props.article.docId)}
          {/* {user.uid}/{props.article.userid} */}
          {/* {props.article.userid} */}

          {user && Report()}
          {}
          {/* <Button color="primary" variant="contained" onClick={handleClose}>
            關閉
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ArticleDetails;
