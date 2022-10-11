import React,{useState} from 'react'
import { Event } from '../../interfaces/entities';

function Model(){
  const [icoStatus, setIcoStatus] = useState(true)
      //点击收藏按钮
  const iconSouCangData = (event, props) => {
    setIcoStatus(!icoStatus)
  }
    return(
     <>
                <span className={icoStatus? " icon-soucang2 soucang-color" : "icon-soucang2"} onClick={(e) => icoStatusData(e,props)}></span>
 
     </>
    )}