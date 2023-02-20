export type Article = {
  title: string;
  content: string;
  user:string;
  docId: string;
  link: string;
  count: number;
};

export type Question = {
  title: string;
  content: string;
  user:string;
  docId: string;
  count: number;
};

export type Comment = {
  user: string;
  content: string;
};


export type Tag = {
  name: any;
  pic: any;
};

// export type tags = {
//   name: string;
// };

export type miniTag = {
  name: string;
};