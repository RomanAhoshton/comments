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
