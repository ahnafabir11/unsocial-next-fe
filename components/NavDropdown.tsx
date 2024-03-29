import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getMyProfile } from "@/lib/data";
import { getAvatarFallback } from "@/lib/helper";
import Image from "next/image";
import Link from "next/link";
import LogoutDropdownMenuItem from "./LogoutDropdownMenuItem";

export default async function NavDropdown() {
  const profile = await getMyProfile();
  const { id, email, fullName, profilePicture } = profile;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-12 w-12">
          <AvatarImage src={profilePicture ?? undefined} asChild>
            {profilePicture && (
              <Image
                width={100}
                height={100}
                alt={`profile picture of ${fullName}`}
                src={`${profilePicture}?date=${new Date()}`}
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
            <AvatarImage
              src={
                profilePicture
                  ? `${profilePicture}?date=${new Date()}`
                  : undefined
              }
              asChild
            >
              {profilePicture && (
                <Image
                  width={100}
                  height={100}
                  alt={`profile picture of ${fullName}`}
                  src={`${profilePicture}?date=${new Date()}`}
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
        <LogoutDropdownMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
