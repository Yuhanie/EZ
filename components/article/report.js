import React, { useEffect, useState } from "react";
import styles from "/styles/Home.module.css";
import {
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
} from "firebase/firestore";
import Typography from "@mui/material/Typography";
import {
  Paper,
  Box,
} from "@mui/material";
import { getApp, getApps, initializeApp } from "firebase/app";

const auth = getAuth();


const Report = (props) => {
  const [user, setUser] = useState();
  const [liked, setLiked] = useState(false);
  const [deleted, setDeleted] = useState(0);
  const [edited, setEdited] = useState(0);
  const [reportMessage, setReportMessage] = useState("");
  




  useEffect(() => {
    // async function fetchData() {
    //   console.log("report:", props.report);
    // }
    // fetchData();


    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      // setHeart(user);
      console.log("user", user);
    });

    return () => {
      unsub();
    };

    // eslint-disable-next-line
  }, [edited, liked, deleted]);

  const renderReport = (report, i) => {
    return (
      <div key={report.report} >
        <Paper>
          <Box display="flex" flexDirection="column" sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" >
            </Box>
            <Box>
              <Typography variant="body2" sx={{m:2, textAlign: "left" }}>{report.message}</Typography>
            </Box>
          </Box>
        </Paper>
      </div >
    );
  };

  return (
    <div className={styles.container}>
 
      {renderReport(props.report)}

    </div>
  );

};

export default Report;
