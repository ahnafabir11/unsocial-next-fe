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

type FollowStatus = "PENDING" | "APPROVED";

type FollowType = {
  createdAt: string;
  status: FollowStatus;
  followerId: string;
  followingId: string;
  myself: true;
  followed: false;
  user: UserType;
};

type ProfileResponseType = {
  message: string;
  data: UserType;
};

type ProfileFollowersResponseType = {
  message: string;
  data: {
    totalFollowers: number;
    followers: FollowType[];
  };
};

type ProfileFollowingsResponseType = {
  message: string;
  data: {
    totalFollowings: number;
    followings: FollowType[];
  };
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

export const getProfileFollowers = (
  profileId: string,
  page?: number,
  limit?: number,
  options?: AxiosRequestConfig
) => {
  return axios.get<ProfileFollowersResponseType>(
    `/profile/${profileId}/followers`,
    { params: { page, limit }, ...options }
  );
};

export const getProfileFollowings = (
  profileId: string,
  page?: number,
  limit?: number,
  options?: AxiosRequestConfig
) => {
  return axios.get<ProfileFollowingsResponseType>(
    `/profile/${profileId}/followings`,
    { params: { page, limit }, ...options }
  );
};
