import { BASE_URL } from "@/constant/api";
import { cookies } from "next/headers";
import { handleFetchError, objectToQueryString } from "./helper";

interface ProfilesQueryParams {
  page: number;
  limit: number;
  search: string;
}

type ProfileType = {
  id: string;
  email: string;
  fullName: string;
  about: null | string;
  coverPicture: null | string;
  profilePicture: null | string;
  verified: boolean;
  createdAt: string;
  followerCount: number;
  followingCount: number;
  myself: boolean;
  followed: boolean;
};

type FollowStatus = "PENDING" | "APPROVED";

type FollowType = {
  createdAt: string;
  status: FollowStatus;
  followerId: string;
  followingId: string;
  myself: true;
  followed: false;
  user: ProfileType;
};

type UsersResponseType = {
  message: string;
  data: { usersCount: number; users: ProfileType[] };
};

type ProfileResponseType = {
  message: string;
  data: ProfileType;
};

type MyProfileResponseType = {
  message: string;
  data: ProfileType;
};

type FollowersResponseType = {
  message: string;
  data: {
    totalFollowers: number;
    followers: FollowType[];
  };
};

type FollowingsResponseType = {
  message: string;
  data: {
    totalFollowings: number;
    followings: FollowType[];
  };
};

export async function getMyProfile() {
  const token = cookies().get("token");

  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Cookie: `token=${token?.value}` },
  });

  handleFetchError(res.status);

  const { data }: MyProfileResponseType = await res.json();

  return data;
}

export async function getAllProfiles(searchParams: ProfilesQueryParams) {
  const token = cookies().get("token");
  const queryParams = objectToQueryString(searchParams);

  const res = await fetch(`${BASE_URL}/users${queryParams}`, {
    headers: { Cookie: `token=${token?.value}` },
  });

  handleFetchError(res.status);

  const { data }: UsersResponseType = await res.json();

  return data;
}

export async function getProfile(profileId: string) {
  const token = cookies().get("token");

  const res = await fetch(`${BASE_URL}/profile/${profileId}`, {
    headers: { Cookie: `token=${token?.value}` },
  });

  handleFetchError(res.status);

  const { data }: ProfileResponseType = await res.json();

  return data;
}

export async function getProfileFollowers(
  profileId: string,
  searchParams: ProfilesQueryParams
) {
  const token = cookies().get("token");
  const queryParams = objectToQueryString(searchParams);

  const res = await fetch(
    `${BASE_URL}/profile/${profileId}/followers${queryParams}`,
    { headers: { Cookie: `token=${token?.value}` } }
  );

  handleFetchError(res.status);

  const { data }: FollowersResponseType = await res.json();

  return data;
}

export async function getProfileFollowings(
  profileId: string,
  searchParams: ProfilesQueryParams
) {
  const token = cookies().get("token");
  const queryParams = objectToQueryString(searchParams);

  const res = await fetch(
    `${BASE_URL}/profile/${profileId}/followings${queryParams}`,
    { headers: { Cookie: `token=${token?.value}` } }
  );

  handleFetchError(res.status);

  const { data }: FollowingsResponseType = await res.json();

  return data;
}
