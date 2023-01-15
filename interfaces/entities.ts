export type Article = {
  title: string;
  content: string;
  user:string;
  docId: string;
  link: string;

};

export type Comment = {
  user: string;
  content: string;
};


export type Tag = {
  name: string;
};

// export type tags = {
//   name: string;
// };

export type miniTag = {
  name: string;
};