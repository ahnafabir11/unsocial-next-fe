import { ResetPasswordBodyType } from "@/app/auth/change-password/ChangePasswordForm";
import { ResetPasswordRequestBodyType } from "@/app/auth/reset-password/ResetPasswordRequestForm";
import { LoginBodyType } from "@/components/SignInForm";
import { SignUpBodyType } from "@/components/SignUpForm";
import axios from "@/lib/axios";
import { AxiosRequestConfig } from "axios";

type CommonResponseType<T = null> = {
  message: string;
  data: T;
};

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

type CurrentUserResponseType = CommonResponseType<UserType>;

export const signupUser = (
  body: SignUpBodyType,
  options?: AxiosRequestConfig
) => {
  return axios.post<CommonResponseType>("/auth/signup", body, options);
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
  return axios.put<CommonResponseType>("/auth/logout", options);
};

export const resetPasswordRequest = (
  body: ResetPasswordRequestBodyType,
  options?: AxiosRequestConfig
) => {
  return axios.post<CommonResponseType>("/auth/reset-password", body, options);
};

export const resetPassword = (
  token: string,
  body: ResetPasswordBodyType,
  options?: AxiosRequestConfig
) => {
  return axios.put<CommonResponseType>("/auth/reset-password", body, {
    params: { token },
    ...options,
  });
};

export const verifyUser = (token: string, options?: AxiosRequestConfig) => {
  return axios.put<CurrentUserResponseType>("/auth/verify", null, {
    params: { token },
    ...options,
  });
};
