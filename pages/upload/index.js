import React, {useState, useEffect} from 'react';
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { listAll } from "firebase/storage";
import {Box, Input} from '@mui/material';
import {ImageList, ImageListItem} from '@mui/material';
import { initializeApp, getApp, getApps } from "firebase/app";
import {firebaseConfig} from '../../settings/firebaseConfig';



export default function App() {

  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(''); 
  const [images , setImages] = useState([]);
  const [loaded, setLoaded] = useState(0);  
  const storage = getStorage();
  const upload = ()=>{

  if(images == null)
    return;
    const maintainsRef = ref(storage, `/thumbnail/${image.name}`);
    uploadBytes(maintainsRef, image).then((snapshot) => {

      alert("success");
    
    });

  // storage.ref(`/images/${image.name}`).put(image)
  // .on("state_changed" , alert("success") , alert);
}

useEffect(()=>{

  async function readImage() {

    try {

      setMessage("waiting...");

      const listRef = ref(storage, '/thumbnail');

      const result = await listAll(listRef);

      let temp=[];
      // setImages(()=>[]);
      result.items.forEach(async (image) => {         
        let url = await getDownloadURL(image);
        console.log("url:",url);
        // setImages((currentImages)=>[...currentImages,{img:url, title:image.name}]);
        temp.push({img:url, title:image.name})
        setImages(()=>[...temp]);
        // console.log("temp:",temp);
      });
      
      // setImages(()=>[...temp]);
      setMessage("");
    }
    catch(error){
      setMessage(error);
      console.log(error);
    }
  }
  readImage();

},[storage, loaded]);
  return (
    <div>
      <center>
      <Input type="file"  onChange={(e)=>{setImage(e.target.files[0])}}/>
      <button onClick={upload}>Upload</button>
    </center>
      <Box>

<br/>{message}
<ImageList sx={{ width: '100%', height: '100%' }} cols={2} >
  {images.map((item) => (
  <ImageListItem key={item.title}>
    <img
      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
      alt={item.title}
      loading="lazy"
    />
  </ImageListItem>
  ))}
</ImageList>
</Box>
    </div>
  );
}

//rowHeight={164}
