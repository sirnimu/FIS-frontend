import axios from "./axios";

export type User = {
  username: string;
  password: string;
};

export const getUsers = async (): Promise<string[]> => {
  return axios.get("/user").then((res) => res.data);
};

export const createUser = async (newUser: User): Promise<User> => {
  return axios.post("/user", newUser);
};
