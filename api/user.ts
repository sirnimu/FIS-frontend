import axios from "./axios";
import useMessage from "../utils/useMessage";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export type User = {
  id: number;
  userName: string;
  password: string;
};

export const getUsers = async (): Promise<User[]> => {
  return axios.get("/user").then((res) => res.data);
};

export const loginUser = async (user: Omit<User, "id">): Promise<User> => {
  return axios.post("/user/login", user);
};

export const signup = async (newUser: Omit<User, "id">): Promise<User> => {
  return axios.post("/user", newUser);
};

export const useCreateUser = () => {
  const { showError, showMessage } = useMessage();
  const navigate = useNavigate();

  const { mutate: createNewUser } = useMutation({
    mutationFn: signup,
    onError: () => {
      showError("Failed to sign up");
    },
    onSuccess: () => {
      navigate("/login");
      showMessage("You succesfuly signed up");
    },
  });

  return { createNewUser };
};

export const useLogin = () => {
  const { showError } = useMessage();
  const navigate = useNavigate();

  const { mutate: login } = useMutation({
    mutationFn: loginUser,
    onError: () => {
      showError("Failed to authenticate");
    },
    onSuccess: () => {
      navigate("/");
    },
  });

  return { login };
};
