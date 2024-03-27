export const errors = [
  {
    code: "INTERNAL_SERVER_ERROR",
    title: "Internal Server Error",
    message: "Whoops, we messed up! You can contact us at ahnafabir@gmail.com.",
  },
  {
    code: "USER_NOT_FOUND",
    title: "Profile not found",
    message: "Profile you are trying to reach does not exist.",
  },
  {
    code: "NOT_VERIFIED",
    title: "User is not verified",
    message: "Please check your email and click on the verification link.",
  },
  {
    code: "INVALID_QUERIES",
    title: "Invalid query format",
    message:
      "Queries for users list are page (number), limit (number) and search (text).",
  },
  {
    code: "FOLLOWING_MYSELF",
    title: "Unable to follow yourself",
    message: "You're only allowed to follow other profiles.",
  },
  {
    code: "ALREADY_FOLLOWING",
    title: "Already following this profile",
    message:
      "The profile you are trying to follow is already been followed by you.",
  },
  {
    code: "UNFOLLOWING_MYSELF",
    title: "Unable to unfollow yourself",
    message: "You're only allowed to unfollow other profiles.",
  },
  {
    code: "NOT_FOLLOWING",
    title: "Unable to unfollow this profile",
    message: "The profile you are trying to unfollow is not followed by you.",
  },
  {
    code: "INVALID_TOKEN",
    title: "Unable to perform action",
    message: "The token you have provided is not valid.",
  },
];

export const SERVER_ERROR = [
  {
    code: 400,
    statusText: "SOMETHING_WENT_WRONG",
    title: "Something went wrong",
    description: "We cannot not process the request due to a client error.",
  },
  {
    code: 401,
    statusText: "UNAUTHORIZED",
    title: "You are not logged in",
    description: "After login navigate this page again.",
  },
  {
    code: 403,
    statusText: "NOT_VERIFIED",
    title: "Your profile is not verified",
    description: "Please check your mail to verify your account.",
  },
  {
    code: 404,
    statusText: "NOT_FOUND",
    title: "Cannot found the requested data",
    description:
      "Resource couldn't be found but may be available in the future.",
  },
  {
    code: 500,
    statusText: "INTERNAL_SERVER_ERROR",
    title: "Internal server error",
    description: "Oops! We messed up. Please mail us at support@unsocial.com",
  },
];
