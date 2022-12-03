export interface LoginBody {
  username: string;
}
export interface LoginResponse {
  username: string;
  firstName: string;
}
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
