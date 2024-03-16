import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getAvatarFallback } from "@/lib/helper";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface UserCardProps {
  id: string;
  fullName: string;
  coverPicture: null | string;
  followerCount: number;
  profilePicture: null | string;
  followingCount: number;
  followed: boolean;
  disableFollowBtn?: boolean;
  handleFollowUser: (id: string, followed: boolean) => void;
}

export default function UserCard({
  id,
  followed,
  fullName,
  coverPicture,
  followerCount,
  profilePicture,
  followingCount,
  handleFollowUser,
  disableFollowBtn = false,
}: UserCardProps) {
  return (
    <Card className="overflow-hidden">
      {coverPicture ? (
        <Image
          width={320}
          height={96}
          src={coverPicture}
          className="w-full h-24"
          alt={`cover picture of ${fullName}`}
        />
      ) : (
        <div className="w-full h-24 bg-gray-300" />
      )}
      <Avatar className="h-20 w-20 mx-auto -mt-12 mb-8">
        <AvatarImage
          src={profilePicture ?? undefined}
          alt={`profile picture of ${fullName}`}
        />
        <AvatarFallback className="text-2xl font-bold">
          {getAvatarFallback(fullName)}
        </AvatarFallback>
      </Avatar>

      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight text-center mb-2">
        <Link href={`/profile/${id}`}>{fullName}</Link>
      </h4>

      <div className="flex h-5 items-center justify-center space-x-2 mb-4">
        <Link href={`/profile/${id}/followers`}>{followerCount} Followers</Link>
        <Separator orientation="vertical" />
        <Link href={`/profile/${id}/followings`}>
          {followingCount} Followings
        </Link>
      </div>

      <Button
        disabled={disableFollowBtn}
        className="block mb-4 mx-auto"
        onClick={() => handleFollowUser(id, followed)}
      >
        {followed ? "Unfollow" : "Follow"}
      </Button>
    </Card>
  );
}