import { Timestamp } from "firebase/firestore";

export type Article = {
  title: string;
  content: string;
  user:string;
  docId: string;
  link: string;
  count: number;
  heart: string[];
  timestamp: Timestamp;
  userid: string;
};

export type Question = {
  title: string;
  content: string;
  user:string;
  docId: string;
  count: number;
  heart: string[];
  //timestamp: Timestamp
};

export type Comment = {
  user: string;
  content: string;
  id:string;
};


export type Tag = {
  name: string;
  pic: string;
};

// export type tags = {
//   name: string;
// };

export type miniTag = {
  name: string;
};