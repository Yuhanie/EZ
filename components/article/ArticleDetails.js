import { Article } from "../../interfaces/entities";
import Image from "next/image";
// import React from "react";
import React, { useEffect, useState, useMemo } from "react";
import router from "next/router";
import { useRouter } from "next/router";
import warning from "../../public/pic/warning.jpg";
import styles from "/styles/Home.module.css";
import emailjs from "@emailjs/browser";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import FormControl from "@mui/material/FormControl";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Chip from '@mui/material/Chip';
import CircleIcon from '@mui/icons-material/Circle';
import LinkIcon from '@mui/icons-material/Link';
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
  where
} from "firebase/firestore";
import { getCountFromServer } from 'firebase/firestore'
import { firebaseConfig } from "../../settings/firebaseConfig";
import VI from "@mui/icons-material/Visibility";
import OutlinedInput from "@mui/material/OutlinedInput";
import SendIcon from "@mui/icons-material/Send";
import Heart from "@mui/icons-material/Favorite";
import Comment from "./Comment";
import Report from "./report";
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
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import dynamic from "next/dynamic";
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.core.css';


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
  const [isLoading, setIsLoading] = useState(false);
  const [edited, setEdited] = useState(0);
  const [character, setCharacter] = useState("學習者");
  const [expertOutdate, setExpertOutdate] = useState(props.article.outdate);
  const [denounces, setDenounces] = useState([]);
  const [toolopen, setToolOpen] = React.useState(false);
  const [expertAction, setExpertAction] = useState("");
  const ReactQuillEditor = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);
  //const [outdate,setOutdate] =useState(props.article.outdate);
  // const [count, setCount] = useState(props.article.outdateCount ? props.article.outdateCount.length : 0);

  const handleToolClickOpen = () => {
    setToolOpen(true);
  };

  const handleToolClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setToolOpen(false);
    }
  };

  const SERVICE_ID = "service_5g4512y";
  const REPORT_TEMPLATE_ID = "template_bs9ya4t";
  const OUTDATE_TEMPLATE_ID = "template_lqwqzir";
  const PUBLIC_KEY = "ko4McNVVxA69Q3_6S";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const ref = doc(db, "profile", user.uid);
        const docSnap = await getDoc(ref);

        const refReport = collection(
          db,
          "text",
          props.article.docId,
          "denounce"
        );
        const snapshot = await getCountFromServer(refReport);

        if (
          docSnap.exists() &&
          docSnap.data().character &&
          docSnap.data().character === "專家"
        ) {
          setCharacter("專家");
        } else {
          setCharacter("學習者");
        }

        if (
          snapshot.data().count > 0 &&
          docSnap.exists() &&
          docSnap.data().character &&
          docSnap.data().character === "專家"
        ) {
          setExpertAction("true");
          //props.update();
        } else {
          setOutdated(false);
          setExpertAction("false");
          // console.log("article:", props.article);
          // console.log("outdateCount:", props.article.outdateCount);
        }
      }
      // console.log("user", user);
    });


    return () => {
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  useEffect(() => {
    async function fetchData() {

      const querySnapshotDenounce = collection(
        db,
        "text",
        props.article.docId,
        "denounce"
      );
      const queryReport = query(querySnapshotDenounce);
      const querySnapshotReport = await getDocs(queryReport);
      const tempReport = [];
      querySnapshotReport.forEach((doc) => {

        let reportMessage = "";

        switch (doc.data().reason) {
          case "empty":
            reportMessage = "內容空泛";
            break;
          case "curse":
            reportMessage = "中傷、挑釁、謾罵他人";
            break;
          case "spamming":
            reportMessage = "惡意洗版";
            break;
          // default:
          //   reportMessage = "分類錯誤";
        }

        // setMessage(() => [...]);
        let reportdata = { ...doc.data(), id: doc.id, message: reportMessage };
        // console.log("reportData", reportdata)
        tempReport.push(reportdata);


      });

      setDenounces(() => [...tempReport]);



      // setReportMessage(reportMessage);






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
        // console.log("data:", data);
      });

      // setComments(() => [temp1, temp2]);
      setComments(() => [...temp]);
    }
    fetchData();
    // console.log("user:", user);
    // console.log("article:", props.article);

    // eslint-disable-next-line
  }, [edited, outdated, deleted]);

  const handleClose = () => {
    props.setOpen(false);
  };

  const update = (id) => {
    router.push("/Newpost?articleId=" + id);
  };

  const outdate = async function (status) {
    // let status = e.target.value
    // console.log("outdateE", status)
    if (typeof window !== "undefined") {
      if (user) {
        const ref = doc(db, "text", props.article.docId);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          if (status === "solved") {
            try {
              setIsLoading(true);

              await updateDoc(doc(db, "text", props.article.docId), {
                outdate: status,
                report: false,
              });

              setEdited(edited + 1);
              setExpertOutdate(status)
              setIsLoading(false);
              props.update();
              // console.log("outdate:", status);
            } catch (error) {
              // console.log("outdateError:", error);
            }
          }

          //     if((docSnap.data().outdate)=="solved"){
          //       await deleteDoc(collection(db, "text", props.article.docId, "outdateCount"));
          //       setDeleted(deleted + 1);
          // }
          else {

            emailjs.send(SERVICE_ID, OUTDATE_TEMPLATE_ID, {
              from_name: "EZ Group",
              to_name: props.article.user,
              from_email: "ezgroup329@gmail.com",
              to_email: props.article.email,
              target_article: props.article.title,
              message: "您好，您的文章「" + props.article.title + "」內容已被專家評估為過時，如可修改文章，請至EducationZone平台更改，謝謝。",
            }, PUBLIC_KEY);

            try {
              setIsLoading(true);

              await updateDoc(doc(db, "text", props.article.docId), {
                outdate: status,
                report: false,
              });

              setEdited(edited + 1);
              setExpertOutdate(status)
              setIsLoading(false);
              props.update();
              // console.log("outdate:", status);
            } catch (error) {
              // console.log("outdateError:", error);
            }

          }

        }


      }
    }

    else {
      alert("請登入");
    }
  };

  const Denounce = async function (status) {
    // console.log("report", report);
    if (typeof window !== "undefined") {
      if (user) {
        const ref = doc(db, "text", props.article.docId);
        const docSnap = await getDoc(ref);

        const querySnapshot = await getDocs(query(collection(db, "profile"), where("character", "==", "專家"), where("majortag", "array-contains-any", props.article.majortag)));
        querySnapshot.forEach((doc) => {
          console.log("expert:", doc.id)

          if (doc.data().email) {
            emailjs.send(SERVICE_ID, OUTDATE_TEMPLATE_ID, {
              from_name: "EZ Group",
              to_name: doc.data().user ? doc.data().user : "",
              from_email: "ezgroup329@gmail.com",
              to_email: doc.data().email,
              target_article: props.article.title,
              message: "您好，有使用者向您回報文章「" + props.article.title + "」內容已過時，請您對文章進行評估。如可修改文章，請至EducationZone平台更改，謝謝。",
            }, PUBLIC_KEY);
          }
        })


        if (docSnap.exists()) {
          if (status == "stale") {

            emailjs.send(SERVICE_ID, OUTDATE_TEMPLATE_ID, {
              from_name: "EZ Group",
              to_name: props.article.user,
              from_email: "ezgroup329@gmail.com",
              to_email: props.article.email,
              target_article: props.article.title,
              message: "您好，有使用者向專家回報您的文章「" + props.article.title + "」內容已過時，我們會請專家對您的文章進行評估。如可修改文章，請至EducationZone平台更改，謝謝。",
            }, PUBLIC_KEY);





            if (expertOutdate == "stale") {
              await updateDoc(doc(db, "text", props.article.docId), {
                outdate: status,

              });

              setEdited(edited + 1);
            } else {
              // alert("stale")
              try {
                setIsLoading(true);
                await updateDoc(doc(db, "text", props.article.docId), {
                  outdate: "pending",
                });
                setIsLoading(false);
                props.update();

                setEdited(edited + 1);
                setExpertOutdate("pending")

                // console.log("denounce:", status)
              } catch (error) {
                // console.log("denounceError:", error);
              }
            }
          } else {
            await setDoc(
              doc(db, "text", props.article.docId, "denounce", user.uid), {
              reason: status,
            }
            );
            await updateDoc(doc(db, "text", props.article.docId), {
              report: true,
            });
            alert("檢舉成功")
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
        router.push("/login");
      } else {
        await addDoc(collection(db, "text", props.article.docId, "comment"), {
          content,
          userid: user.uid,
          timestamp: serverTimestamp(),
          heart: [],
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
              //要先把集合裡的東刪掉才能刪集合才能刪整個文件ㄟ
              await deleteDoc(doc(db, "text", props.article.docId));
              //console.log("deleted");
              // setDeleted(deleted + 1);
              setIsLoading(false);
              alert("刪除成功");
              // props.update();
              router.reload("/note")
            } catch (error) {
              alert(error);
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

  const reportDelete = async function () {
    emailjs.send(SERVICE_ID, REPORT_TEMPLATE_ID, {
      from_name: "EZ Group",
      to_name: props.article.user,
      from_email: "ezgroup329@gmail.com",
      to_email: props.article.email,
      message: "您好，由於眾多使用者檢舉您的文章，故經由專家評估後被下架，如需申訴請聯絡我們。",
    }, PUBLIC_KEY);
    if (typeof window !== "undefined") {
      if (user) {
        const ref = doc(db, "text", props.article.docId);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
          if (character == "專家" && expertAction == "true") {
            try {
              setIsLoading(true);
              await deleteDoc(doc(db, "text", props.article.docId));
              //console.log("deleted");
              setDeleted(deleted + 1);
              setIsLoading(false);

              alert("下架成功");
              props.update();
            } catch (error) {
              alert(error);
            }
          } else {
            alert("你不是專家吧？");
          }
        }
      }
    } else {
      alert("請登入");
    }
  };

  const expertReport = () => {
    return (
      <>
        {/* 這是專家選擇要不要下架被檢舉的文章的按鈕ㄛ */}
        <Box sx={{ bgcolor: "#C7CAF2", p: 2, borderRadius: 2 }}>
          {/* <Typography variant="h6">專家權限</Typography> */}
          <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            sx={{
              p: 2,

              mt: 2,
              bgcolor: "#fafafa",
              borderRadius: 1,
            }}
          >

            <Typography variant="body1">
              這篇文章有疑慮需要下架嗎？（注意！下架即刪除）
            </Typography>
            <FormControl sx={{ width: 100 }} size="small">
              {/* <InputLabel id="demo-simple-select-label">過時與否</InputLabel> */}
              <Button
                color="error"
                variant="contained"
                onClick={reportDelete}
                size="small"
                sx={{ m: 1, height: 35 }}
              >
                需要下架
              </Button>
            </FormControl>
            <br />

          </Box>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>查看原因</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {character === "專家" &&
                denounces.map((report) => renderReport(report))}
            </AccordionDetails>
          </Accordion>
          <br />
        </Box>
      </>
    );
  };

  const expert = () => {
    return (
      <>
        <Box sx={{ bgcolor: "#C7CAF2", p: 2, borderRadius: 2, }}>

          <Typography variant="h6">專家權限</Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            sx={{
              p: 2,
              mt: 2,
              bgcolor: "#fafafa",
              borderRadius: 1,
            }}
          >
            <EmojiObjectsIcon />
            <Typography variant="body1" >
              文章審核
            </Typography>
            <FormControl sx={{ width: 140, ml: 2 }} size="small">
              {/* <InputLabel id="demo-simple-select-label">過時與否</InputLabel> */}
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={topicName}
                // label="topic"
                sx={{ height: 35 }}

              >
                <MenuItem onClick={(e) => {
                  outdate("solved")
                }}>
                  沒問題
                </MenuItem>
                <MenuItem
                  onClick={(e) => { outdate("stale") }}>
                  過時或無法使用
                </MenuItem>
              </Select>
            </FormControl>
            <br />
            {/* <Button
            color="primary"
            variant="contained"
            onClick={() => outdate(expertOutdate)}
            size="small"
            sx={{ height: 35, ml: 2 }}
            edited={edited}
            setEdited={setEdited}
          >
            送出
          </Button> */}
          </Box>
        </Box>
      </>
    );
  };

  const outdateIcon = () => {
    return (
      <Box display="flex" sx={{ alignItems: "center", mr: 1 }}>
        {(expertOutdate === "stale") && (
          <Tooltip title="版本疑慮">
            <WarningIcon sx={{ color: "Crimson" }} />
          </Tooltip>
        )}
        {((expertOutdate == "pending" || expertOutdate == "")) && (
          <Tooltip title="專家審核中">
            <NotificationImportantIcon sx={{ color: "Gold" }} />
          </Tooltip>
        )}
        {(expertOutdate === "solved") && (
          <Tooltip title="審核通過">
            <CheckCircleIcon sx={{ color: "Green" }} />
          </Tooltip>
        )}
      </Box>
    );
  };

  const Update = (id) => {
    return (
      <div>
        <IconButton color="secondary" onClick={() => update(id)}>
          <EditIcon />
        </IconButton>
        <IconButton color="secondary" onClick={deleteData}>
          <DeleteForeverIcon />
        </IconButton>
      </div>
    );
  };

  const reportMenu = (id) => {
    return (
      <div>
        <IconButton onClick={handleToolClickOpen}>
          <MoreHorizIcon />
        </IconButton>
        <Dialog open={toolopen} onClose={handleToolClose}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="body1" sx={{ m: 2 }}>
              遇到問題了嗎？
            </Typography>
            <IconButton onClick={handleToolClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <DialogContent>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl sx={{ width: 110 }}>
                <InputLabel id="demo-simple-select-label">選擇原因</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={topicName}
                  // label="topic"
                  onChange={(e) => {
                    Denounce(e.target.value);
                    // setReport(e.target.value);
                  }}
                >
                  <MenuItem value="stale">過時或無法使用</MenuItem>
                  <MenuItem value="empty">內容空泛</MenuItem>
                  <MenuItem value="curse">中傷、挑釁、謾罵他人</MenuItem>
                  <MenuItem value="spamming">惡意洗版</MenuItem>
                  {/* <MenuItem value="tagerror">文章分類錯誤</MenuItem> */}
                </Select>


              </FormControl>

              {/* <Button
                edited={edited}
                setEdited={setEdited}
                color="warning"
                variant="contained"
                sx={{ ml: 2 }}
                size="small"
                onClick={() => (user ? Denounce(report) : alert("請登入"))}
              >
                檢舉
              </Button> */}

            </Box>
          </DialogContent>
        </Dialog>
      </div>
    );
  };

  const renderComment = (comment, i) => {
    return (
      <div key={comment.content}>
        {comment && (
          <div style={{ padding: 14 }} className="App">
            <Comment
              edited={edited}
              setEdited={setEdited}
              article={props.article}
              comment={comment}
            />
          </div>
        )}
      </div>
    );
  };

  const renderReport = (report, i) => {
    return (
      <div key={report.reason}>
        {report && (
          <div style={{ padding: 14 }} className="App">
            <Report
              edited={edited}
              setEdited={setEdited}
              article={props.article}
              report={report}
            />
          </div>
        )}
      </div>
    );
  };

  // let formattedTags = "";
  // if (typeof props.article.majortag === "string") {
  //   formattedTags = props.article.majortag.split(",").join(" ");
  // }


  return (
    <div className={styles.container}>
      <Dialog open={props.open} onClose={handleClose} >
        <Card>
          <Box
            display="flex"
            justifyContent="space-between"

          >
            <Box>
              <CardHeader
                avatar={
                  <Avatar>
                    {/* {props.article.userid && profile && profile.photoURL &&
                  <img className={styles.googlephoto_profile} src={profile.photoURL} />} */}
                  </Avatar>
                }
                title={props.article.user}
                subheader={props.article.timestamp && props.article.timestamp.toDate().toLocaleDateString()}
                //item 
                sx={{ p: 1.2 }}
              /></Box>
            <Box display="flex" alignItems="center">
              <VI />
              <Typography variant="body2" sx={{ ml: 0.5, pr: 0.8 }}>
                {props.article.count}
              </Typography>
              <FormControl>
                {user &&
                  user.uid === props.article.userid &&
                  Update(props.article.docId)}
                {/* {user.uid}/{props.article.userid} */}
                {/* {props.article.userid} */}
              </FormControl>
              <Box>
                {user && user.uid !== props.article.userid && reportMenu()}

                {/* <Button color="primary" variant="contained" onClick={handleClose}>關閉</Button> */}
              </Box>
            </Box>

          </Box>

          <DialogTitle>
            <Box
              display="flex"
              justifyContent="space-between"

            >
              <Box display="flex" alignItems="center">
                {outdateIcon()}
                <a href={props.article.link}>{props.article.title}</a>
              </Box>

            </Box>
          </DialogTitle>

          <DialogContent>

            {/* <CircleIcon sx={{width:900}}/> */}
            <Stack spacing={1} sx={{ minHeight: 150, ml: 1 }}>
              {/* {props.article.content} */}
              {/* <div className={styles.card3}> */}

              <Stack direction="row" spacing={1}>
                <Chip label={props.article.tag} size="small" />
                {/* <Chip label={props.article.minitag} size="small" /> */}
                {props.article.minitag && props.article.minitag.map((value) => (
                  <Chip key={value} label={value} size="small" />))}

                {props.article.majortag && props.article.majortag.map((value) => (
                  <Chip key={value} label={value} size="small" />))}

                {/* <Chip label={formattedTags} size="small" variant="outlined" /> */}
              </Stack>


              <Box display="flex" sx={{ flexDirection: "row", alignContent: "left" }}>
                <LinkIcon sx={{ mr: 1 }} />
                <a href={props.article.link} className={styles.attention} >
                  查看詳細內容
                </a>
                {/* <Typography href={props.article.link} color= "#7A82E7">查看詳細內容</Typography> */}
              </Box>

              {/* <a href={props.article.link}> */}
              {/* <a>
              {props.article.content.substring(0, 245)}
              {props.article.content.length > 245 ? "..." : ""}
            </a> */}


              {(typeof window !== "undefined") &&
                <ReactQuillEditor
                  theme="bubble"
                  readOnly={true}
                  value={props.article.content.substring(0, 245)}
                />
              }


              {/* </div> */}




            </Stack>
            <Box sx={{ bgcolor: "#fafafa", m: 3, borderRadius: 1 }}>
              {props.article.outdate === "stale" && (
                <h3>
                  <Image alt="版本疑慮" src={warning} />
                  版本疑慮
                </h3>
              )}

              <div className={styles.yu}>
                {props.article.outdate === "stale"
                  ? "這篇文章已經不符合現在的版本或者無法使用"
                  : ""}
              </div>

            </Box>

            {/* <Box sx={{ bgcolor: "#C7CAF2", p: 2, borderRadius:2,}}> */}

            {character === "專家" && expert()}
            {expertAction === "true" && expertReport()}

            {/* </Box> */}

            <div style={{ padding: 10 }} >


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

              {comments.map((comment) => renderComment(comment))}

              {/* <Comment article={props.article} /> */}
            </div>
            <Box display="flex" position="relative" justifyContent="space-between">
              {user && user.displayName}
              <OutlinedInput
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{ ml: 2, borderRadius: 12, height: 35 }}
                //sx={{ padding: 1, margin: 5, left: -20, top: -1, borderRadius: 12, width: 340, height: 35 }}
                placeholder="我要留言..."
                // onClick={onSubmit}
                fullWidth
              />
              <Button
                size="small"
                variant="contained"
                endIcon={<SendIcon />}
                onClick={onSubmit}
                sx={{ ml: 2, pl: 0.5, width: 2, height: 35 }}
              // sx={{ padding: 0, margin: 1, right: -425, top: -84, borderRadius: 5, width: 2, height: 35 }}
              ></Button>
            </Box>
          </DialogContent>

        </Card>
      </Dialog>
    </div>
  );
};

export default ArticleDetails;
