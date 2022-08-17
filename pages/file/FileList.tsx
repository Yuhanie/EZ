import styles from "/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import { Fab, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs} from "firebase/firestore";
//import AddIcon from "@mui/icons-material/Add";

// import { Task } from "../../interfaces/entities";
// import TaskListItem from "../../components/task/TaskListItem";
// import Menu from "../../components/Menu";
import {firebaseConfig} from '../../settings/firebaseConfig';

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();

const FileList = () => {
  const [files, setFiles] = useState<any[]>([]);
  // const [open, setOpen] = useState(false);

  useEffect(()=>{
    async function readData() {
      const querySnapshot = await getDocs(collection(db, "file"));
      const temp:any[] = [];
      
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        temp.push({name:doc.data().name, type:doc.data().type});
      });

      console.log(temp);

      setFiles([...temp]);

    }

    readData();

  },[]);

  // const renderTask = (task: Task, index: number) => {
  //   return (
  //     <TaskListItem
  //       key={task.name}
  //       index={index}
  //       name={task.name}
  //       location={task.location}
  //     />
  //   );
  // };
  const renderFile = (file: any, i: number) => {
    return (
      <TableRow>
        <TableCell align="left">{i+1}</TableCell>
        <TableCell align="left">{file.name}</TableCell>
        <TableCell align="right">{file.type}</TableCell>
        <TableCell align="right">
      </TableCell>
    </TableRow>    );
  };


  return (
    <div className={styles.container}>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableBody>{files.map(renderFile)}</TableBody>
        </Table>
      </TableContainer>

    </div>
  );
};

export default FileList;
