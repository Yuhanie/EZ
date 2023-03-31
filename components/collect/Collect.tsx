import * as React from 'react';
//firebase
import { getApp, getApps, initializeApp } from "firebase/app";
import { onAuthStateChanged, User, getAuth } from 'firebase/auth';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseConfig } from '../../settings/firebaseConfig';
import { Profile, BookMark, Article } from '../../interfaces/entities';
//mui
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

type Props = {
    article: Article;
    update: Function;
  };

const Collect: 
React.FC<Props> = (props) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [profile, setProfile] = useState<Profile>();


  useEffect(() => {
    async function readData() {
      //var temp: Profile;
      if (currentUser) {
        const querySnapshot = await getDoc(doc(db, "profile", currentUser.uid));
        if (querySnapshot.exists()) {
          //console.log(doc.id, doc.data());
          setProfile({ character: querySnapshot.data().character });
        };
      }
      const unsub = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('currentUser', user)
          setCurrentUser(user);
        }
      });

      return () => {
        unsub();
      }
    }
    readData();
  });

  return (
<>
                <Grid >
                    <Card sx={{ m: 2, width: 300 }}>
                      <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          {props.article.title}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          {props.article.content}
                        </Typography>
                        {/* <Stack direction="row" spacing={1}>
                          <Chip label="tag 1" component="a" href="#chip" />
                          <Chip label="tag 2" component="a" href="#chip" />
                          <Chip label="tag 3" component="a" href="#chip" />
                        </Stack> */}
                      </CardContent>
                    </Card>
                </Grid>
    </>
  );
}

export default Collect;