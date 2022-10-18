import React, {useState, useEffect} from 'react';
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { listAll } from "firebase/storage";
import {Box, Input} from '@mui/material';
import {ImageList, ImageListItem} from '@mui/material';
import { initializeApp, getApp, getApps } from "firebase/app";
import {firebaseConfig} from '../../settings/firebaseConfig';

export default function App() {

  const upload2 = ()=>{
  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const storage = getStorage();
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(0);


  const handleUpload = async function(e){
    console.log(e.target.files[0]);
    try{
      setMessage("");
      // Create a reference to the image
      const imageRef = ref(storage,e.target.files[0].name);
      await uploadBytes(imageRef, e.target.files[0]);
      console.log('Uploaded a blob or file!');
      const url = await getDownloadURL(imageRef);
      console.log(url);
      setLoaded((currentValue)=>currentValue+1)
    }
    catch(error){
      console.log(error.code);
      if (error.code === "storage/unauthorized"){
        setMessage("尚未登入");
      }
    }
  }

  useEffect(()=>{
    async function readImage() {
      try {
        setMessage("waiting...");
        const listRef = ref(storage, '/');
        const result = await listAll(listRef);
        setImages([]);
        result.items.forEach(async (image) => {         
          let url = await getDownloadURL(image);
          setImages((currentImages)=>[...currentImages,{img:url, title:image.name}]);
        });  
        setMessage("");
      }
      catch(error){
        setMessage(error);
        console.log(error);
      }
    }
    readImage();
  },[storage, loaded]);












  
  if(image == null)
    return;
    const maintainsRef = ref(storage, `/images/${image.name}`);
    uploadBytes(maintainsRef, image).then((snapshot) => {

      alert("success");
    
    });

  // storage.ref(`/images/${image.name}`).put(image)
  // .on("state_changed" , alert("success") , alert);
}
  
  return (
    <div>
      <center>
      <input type="file"  onChange={(e)=>{setImage(e.target.files[0])}}/>
      <button onClick={upload2}>Upload</button>
      </center>
    </div>
  );
}

