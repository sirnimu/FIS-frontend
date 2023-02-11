import axios from "./axios";

export type User = {
  id: number;
  userName: string;
  password: string;
};

export const getUsers = async (): Promise<User[]> => {
  return axios.get("/user").then((res) => res.data);
};

export const createUser = async (newUser: User): Promise<User> => {
  return axios.post("/user", newUser);
};
