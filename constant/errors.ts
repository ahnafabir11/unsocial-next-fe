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
];
