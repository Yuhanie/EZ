import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';
import { getApps, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import {firebaseConfig} from '../../settings/firebaseConfig';


export default function SignUp() {
  if (getApps().length===0) {
    initializeApp(firebaseConfig);
  }
  const [account, setAccount] = useState({email:"",password:"", displayName:""});
  const [message, setMessage] = useState("");
  const handleChange = function(e: { target: { name: any; value: any; }; }){
    setAccount({...account,[e.target.name]:e.target.value})
  }
  const handleSubmit = async function(){
    try {
      const auth = getAuth();
      const res = await createUserWithEmailAndPassword(auth, account.email, account.password);
      if (res) {
        await updateProfile(res.user,{displayName: account.displayName});
      }
      setMessage("");

    }
    catch(error){
      setMessage(""+error);
    }
  }
  
  return(
    
    <form>
      <TextField type = "text" name = "displayName" value={account.displayName} color="secondary" focused 
        placeholder="姓名" label="姓名:" onChange={handleChange} /><br/>
      <TextField type = "email" name = "email" value={account.email} 
        placeholder="電子郵件信箱" label="電子郵件信箱:" onChange={handleChange} autoComplete="email"/><br/>
      <TextField type = "password" name = "password" value={account.password}
        placeholder="密碼" label="密碼:" onChange={handleChange} autoComplete="current-password"/><br/>
      {message}<br/>
      <Button variant="contained" color="primary" onClick={handleSubmit}>註冊</Button>
      <Button variant="contained" color="secondary">已經註冊，我要登入</Button>
    </form>
        
  )
}