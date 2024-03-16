import axios from "@/lib/axios";
import { AxiosRequestConfig } from "axios";

type UserType = {
  id: string;
  fullName: string;
  coverPicture: null | string;
  followerCount: number;
  profilePicture: null | string;
  followingCount: number;
  followed: boolean;
};

type UsersResponseType = {
  message: string;
  data: {
    usersCount: number;
    users: UserType[];
  };
};

export const getUsers = (
  page?: number,
  limit?: number,
  search?: string,
  options?: AxiosRequestConfig
) => {
  return axios.get<UsersResponseType>("/users", {
    params: { page, limit, search },
    ...options,
  });
};
