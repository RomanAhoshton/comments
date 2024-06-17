export type FormData = {
  name: string;
  email: string;
  password: string;
};

export interface User {
  name?: string | null;
  photo?: string | null;
  email?: string | null;
  id?: string;
}

export type Comment = {
  text?: string;
  image?: string;
  author: string;
  avatar: string;
  timestamp: string;
  id: string;
  responses: responses[];
};

export interface responses {
  text?: string;
  author: string;
  avatar: string;
  timestamp: string;
  id: string;
  image?: string;
}
