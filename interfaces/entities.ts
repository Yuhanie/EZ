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
  majortag:string[];
  minitag:string[];
  tag:string;
  email:string;
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
  count: number;
  heart: string[];
  bookmark: string[];
  timestamp: Timestamp;
  link: string;
  userid: string;
  outdate?:string;
  outdateCount?:string[];
};

export type Comment = {
  user: string;
  content: string;
  id:string;
  // heart:string[];
};

export type Report = {
  reason: string;
};

export type Denounce = {
  reason: string;
  // heart:string[];
};



export type Tag = {
  name: string;
  pic: string;
  order: string;
};

export type MajorTag = {
  name: string;
};

export type miniTag = {
  name: string;
};

export type Profile = {
  character?: string;
  majortag?: string[];
  email?: string;
  photoURL?: string;
  user?: string;
};

export type BookMark = {
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

export type Wish = {
  userid: string;
  user: string;
  docId: string;
  content: string;
  timestamp: Timestamp;
  heart: string[];
  tag: string;
};