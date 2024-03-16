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

type ProfileResponseType = {
  message: string;
  data: UserType;
};

export const followProfile = (
  profileId: string,
  options?: AxiosRequestConfig
) => {
  return axios.put<ProfileResponseType>(
    `/profile/${profileId}/follow`,
    null,
    options
  );
};

export const unfollowProfile = (
  profileId: string,
  options?: AxiosRequestConfig
) => {
  return axios.put<ProfileResponseType>(
    `/profile/${profileId}/unfollow`,
    null,
    options
  );
};
