import { Article } from "../../interfaces/entities";
import Image from "next/image";
// import React from "react";
import React, { useEffect, useMemo, useState } from "react";
import router from "next/router";
import { useRouter } from "next/router";
import warning from "../../public/pic/warning.jpg";
import styles from "/styles/Home.module.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import {
    collection,
    addDoc,
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
import { Wish, Profile, Comment } from '../../interfaces/entities';
import { firebaseConfig } from "../../settings/firebaseConfig";
import VI from "@mui/icons-material/Visibility";
import OutlinedInput from "@mui/material/OutlinedInput";
import SendIcon from "@mui/icons-material/Send";
import Heart from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";
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
import dynamic from "next/dynamic";

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

type Props = {
    wish: Wish;
    comment: Comment;
    update: Function;
    edited: number;
    // open: boolean;
    // setOpen: (open: boolean) => void;
    //currentUser: string;
};

const WishComment:
    React.FC<Props> = (props) => {
        // const [comment, setComment] = useState();
        // const [content, setContent] = useState("");
        const [user, setUser] = useState<User>();
        // const [currentuser, setCurrentUser] =useState();
        const [liked, setLiked] = useState<boolean>(false);
        const [count, setCount] = useState<number>(0);
        //   const [count, setCount] = useState(props.article.heart ? props.article.heart.length : 0);
        const [deleted, setDeleted] = useState<number>(0);
        const [isLoading, setIsLoading] = useState<boolean>(false);
        const [edited, setEdited] = useState<number>(0);
        const ReactQuillEditor = useMemo(() => dynamic(() => import('react-quill'), { ssr: false }), []);




        useEffect(() => {
            // async function fetchData() {
            //     console.log("comment:", props.comment);

            // }
            // fetchData();


            const unsub = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser(user);
                    // setHeart(user);
                    console.log("user", user);
                }

                
            });



            return () => {
                unsub();
            };

            // eslint-disable-next-line
        }, [edited, liked, deleted]);

        //可能有問題
        const deleteComment = async function (id: string) {
            if (typeof window !== "undefined") {
                console.log("id121", id);
                if (user) {
                    const ref = doc(db, "wish", props.wish.docId, "comment", id);;
                    const docSnap = await getDoc(ref);
                    if (docSnap.exists()) {
                        if (docSnap.data().userid == user.uid) {
                            try {
                                setIsLoading(true);

                                await deleteDoc(doc(db, "wish", props.wish.docId, "comment", id));

                                //console.log("deleted");

                                setDeleted(deleted + 1);

                                setIsLoading(false);
                                alert("刪除成功");
                                //!!!!!!!!!!!!!!!!!!!要問
                                props.update(props.edited + 1);


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





        const heart = async function (id: string) {
            if (typeof window !== "undefined") {
                if (user) {

                    const ref = doc(db, "wish", props.wish.docId, "comment", id);
                    const docSnap = await getDoc(ref);
                    if ((docSnap.exists())) {
                        // console.log(docSnap.data())
                        if (docSnap.data().heart.includes(user.uid)) {
                            // alert('remove')
                            updateDoc(ref, {
                                heart: arrayRemove(user.uid)
                            });
                            setLiked(false)
                            setCount(count - 1)
                        } else {
                            // alert('added')
                            updateDoc(ref, {
                                heart: arrayUnion(user.uid)

                            });
                            setLiked(true)
                            setCount(count + 1)

                        }
                    }
                }
            }
            else {
                alert("要登入才能按讚ㄛ!")
                //window.alert("要登入才能新增筆記ㄛ!");

                // <Alert action={
                //   <Button >
                //     UNDO
                //   </Button>
                // }>要登入才能新增筆記ㄛ! </Alert>

                router.push('/login');
            }
        }


        const commentDelete = (comment: Comment) => {
            return (
                <>
                    <IconButton
                        //style={{ textAlign: "left", left: 300, bottom: 80 }}
                        aria-label="heart"
                        size="small"
                        onClick={() => deleteComment(comment.docId)}//可能與119有問題
                    >
                        <RestoreFromTrashIcon />
                    </IconButton>
                </>
            )

        };
        const usual = () => {
            return (
                <>
                </>
            )
        };

        const renderComment = (comment: Comment) => {
            return (
                <div key={comment.content} >
                    <Paper>
                        <Box display="flex" flexDirection="column" sx={{ p: 2 }}>
                            <Box display="flex" justifyContent="space-between" alignItems="center" >
                                <Box display="flex" flexDirection="row" alignItems="center">
                                    <Avatar sx={{ mr: 2 }} alt="Remy Sharp" />
                                    <Typography style={{ margin: 0, textAlign: "left" }}>{comment.user}</Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <IconButton
                                        //style={{ textAlign: "left", left: 300, bottom: 80 }}
                                        aria-label="heart"
                                        size="small"
                                        onClick={() => heart(comment.docId)}//可能與159有關
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
                                    {user && user.uid === comment.userid ? commentDelete(comment) : usual()}
                                </Box>
                            </Box>
                            <Box>



                                {(typeof window !== "undefined") &&
                                    <ReactQuillEditor
                                        theme="bubble"
                                        style={{ height: 80, overflow: 'hidden' }}
                                        readOnly={true}
                                        value={comment.content}
                                    />
                                }
                                {/* <Typography variant="body2" sx={{ m: 2, textAlign: "left" }}>{comment.content}</Typography> */}
                                <Typography variant="caption" style={{ textAlign: "left", color: "grey" }}>
                                    {comment.timestamp &&
                                        comment.timestamp.toDate().toLocaleString()}
                                </Typography>
                            </Box>

                        </Box>
                    </Paper>
                </div >
            );
        };

        return (
            <div className={styles.container}>
                {/* {comment.map(renderComment)} */}
                {renderComment(props.comment)}

            </div>
        );


    };

export default WishComment;
