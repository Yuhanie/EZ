import { Timestamp } from "firebase/firestore";

export type Article = {
  title: string;
  content: string;
  user:string;
  docId: string;
  link: string;
  count: number;
  heart: string[];
  bookmark:string[];
  timestamp: Timestamp;
  userid: string;
  outdateCount: string[];
  outdate: string;
};

export type Newtext = {
  title: string;
  content: string;
  user:string;
  docId: string;
  link: string;
  count: number;
  heart: string[];
  bookmark:string[];
  timestamp: Timestamp;
  userid: string;
};


export type Question = {
  title: string;
  content: string;
  user:string;
  docId: string;
  link: string;
  count: number;
  heart: string[];
  bookmark: string[];
  userid: string;
  outdateCount: string[];
  outdate: string;
  timestamp: Timestamp
};

export type QA = {
  title: string;
  content: string;
  user:string;
  docId: string;
  link: string;
  count: number;
  heart: string[];
  bookmark: string[];
  userid: string;
  outdateCount: string[];
  outdate: string;
  timestamp: Timestamp
};

export type Comment = {
  user: string;
  content: string;
  id:string;
  // heart:string[];
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

export type Profile = {
  character: string;
};