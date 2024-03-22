import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BASE_URL } from "@/constant/api";
import { getAvatarFallback } from "@/lib/helper";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

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

export default async function NavDropdown() {
  const token = cookies().get("token");
  if (!token) redirect("/signin");

  // FETCHING DATA
  await (function () {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
  })();
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: { Cookie: `token=${token.value}` },
  });
  const data: CurrentUserResponseType = await res.json();
  const { id, email, fullName, profilePicture } = data.data;

  const handleLogout = () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-12 w-12">
          <AvatarImage src={profilePicture ?? undefined} asChild>
            {profilePicture && (
              <Image
                width={100}
                height={100}
                src={profilePicture}
                alt={`profile picture of ${fullName}`}
              />
            )}
          </AvatarImage>
          <AvatarFallback className="text-lg font-bold">
            {getAvatarFallback(fullName)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={profilePicture ?? undefined} asChild>
              {profilePicture && (
                <Image
                  width={100}
                  height={100}
                  src={profilePicture}
                  alt={`profile picture of ${fullName}`}
                />
              )}
            </AvatarImage>
            <AvatarFallback className="text-lg font-bold">
              {getAvatarFallback(fullName)}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-medium">{fullName}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={`/profile/${id}`}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/">Users</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
