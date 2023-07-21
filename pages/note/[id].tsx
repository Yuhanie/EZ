import { useRouter } from 'next/router'
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { getApp, getApps, initializeApp } from 'firebase/app';

import { firebaseConfig } from '../../settings/firebaseConfig';


const Article = () => {
  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const db = getFirestore(firebaseApp);
  const router = useRouter();
  const { id } = router.query;
  const [text, setText] = useState({ title: "查無此文件" });

  useEffect(() => {
    async function readData() {
      if (typeof (id) === "string") {
        const collectionRef = collection(db, "text");
        const docRef = doc(collectionRef, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setText({ title: docSnap.data().title });
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }

      }



    }

    readData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, id])



  return (
    <div>{text.title}</div>
  )
}
export default Article