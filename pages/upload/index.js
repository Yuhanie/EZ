import React, {useState, useEffect} from 'react';

import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { listAll } from "firebase/storage";

import {Box, Input} from '@mui/material';

import {ImageList, ImageListItem} from '@mui/material';
import { initializeApp, getApp, getApps } from "firebase/app";
import {firebaseConfig} from '../../settings/firebaseConfig';


import {useState} from 'react';

function App() {
const [image , setImage] = useState('');
const upload = ()=>{
  const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

  const storage = getStorage();

  
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
      <button onClick={upload}>Upload</button>
      </center>
    </div>
  );
}
export default App;
