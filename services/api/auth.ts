import { LoginBodyType } from "@/components/SignInForm";
import { SignUpBodyType } from "@/components/SignUpForm";
import axios from "@/lib/axios";
import { AxiosRequestConfig } from "axios";

type UserType = {
  id: string;
  email: string;
  fullName: string;
  about: string;
  coverPicture: string;
  profilePicture: string;
  verified: boolean;
  createdAt: string;
  followerCount: number;
  followingCount: number;
};

type CurrentUserResponseType = {
  message: string;
  data: UserType;
};

type LogoutCurrentUserResponseType = {
  message: string;
  data: UserType;
};

export const signupUser = (
  body: SignUpBodyType,
  options?: AxiosRequestConfig
) => {
  return axios.post<CurrentUserResponseType>("/auth/signup", body, options);
};

export const loginUser = (
  body: LoginBodyType,
  options?: AxiosRequestConfig
) => {
  return axios.post<CurrentUserResponseType>("/auth/login", body, options);
};

export const getCurrentUser = (options?: AxiosRequestConfig) => {
  return axios.get<CurrentUserResponseType>("/auth/me", options);
};

export const logoutCurrentUser = (options?: AxiosRequestConfig) => {
  return axios.put<LogoutCurrentUserResponseType>("/auth/logout", options);
};
