import axios from '@/app/lib/axios'
import { AxiosRequestConfig } from 'axios'

type UserType = {
  id: string
  email: string
  fullName: string
  about: string
  coverPicture: string
  profilePicture: string
  verified: boolean
  createdAt: string
  followerCount: number
  followingCount: number
}

type CurrentUserResponseType = {
  message: string
  data: UserType
}

type LogoutCurrentUserResponseType = {
  message: string
  data: null
}

export const getCurrectUser = (options?: AxiosRequestConfig) => {
  return axios.get<CurrentUserResponseType>('/auth/me', {
    ...options,
  })
}

export const logoutCurrectUser = (options?: AxiosRequestConfig) => {
  return axios.get<LogoutCurrentUserResponseType>('/auth/logout', {
    ...options,
  })
}
