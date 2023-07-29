import { useRouter } from 'next/router'
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { Timestamp } from "firebase/firestore";

import { firebaseConfig } from '@/settings/firebaseConfig';
import { Article } from 'interfaces/entities';
import ArticleListItem from '@/components/article/ArticleListItem';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import ArticleDetails from '@/components/article/ArticleDetails';


const Article = () => {
  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(firebaseApp);
  const router = useRouter();
  const { id } = router.query;
  const [currentUser, setCurrentUser] = useState<User>();
  const [article, setArticle] = useState<Article>({
    docId: "無此文件",
    content: "",
    title: "",
    user: "",
    link: "",
    userid: "",
    count: 0,
    heart: [],
    timestamp: new Timestamp(0, 0),
    bookmark: [],
    outdateCount: [],
    outdate: "",
    majortag: [],
    minitag: [],
    tag: "",
    email: ""
  }
  );
  function updateUpdated() {

  }
  function setOpen() {

  }

  useEffect(() => {
    async function readData() {

      if (!id) {
        return false;
      }
      console.log(id);
      if (typeof (id) === "string") {
        const collectionRef = collection(db, "text");
        const docRef = doc(collectionRef, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArticle({
            docId: docSnap.id,
            content: docSnap.data().content,
            title: docSnap.data().title,
            user: docSnap.data().user,
            link: docSnap.data().link,
            userid: docSnap.data().userid,
            count: docSnap.data().count,
            heart: docSnap.data().heart,
            timestamp: docSnap.data().timestamp,
            bookmark: docSnap.data().bookmark,
            outdateCount: docSnap.data().outdateCount,
            outdate: docSnap.data().outdate,
            majortag: docSnap.data().majortag,
            minitag: docSnap.data().minitag,
            tag: docSnap.data().tag,
            email: docSnap.data().email
          });
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      }

      // const auth = getAuth();
      // const unsub = onAuthStateChanged(auth, (user) => {
      //   if (user) {
      //     setCurrentUser(user);
      //   }
      //   // else{
      //   // setCurrentUser()}
      //   console.log(user);
      // });

    }

    readData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, id])

  // test

  return (
    <div>
      <ArticleDetails article={article} open={true} setOpen={setOpen} update={updateUpdated} ></ArticleDetails>

      {/* <ArticleListItem key={article.docId} article={article} update={updateUpdated}></ArticleListItem> */}
    </div>

  )
}
export default Article