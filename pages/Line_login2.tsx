import React, {useState} from 'react';
import { Button, TextField } from '@mui/material';
import styles from '../styles/Home.module.css';




export const Line_login_button = () => {
    
    return (
      <>
      <div className ="Line_login_btn">
      <Button className="btn-icon mt-2" type="button">
        <span className="btn-inner--icon">
          <i className="line"></i>
        </span>
      </Button>
      </div> 
      </>
    )
  }