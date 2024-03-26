"use client";

import useFollowProfile from "@/hooks/mutations/useFollowProfile";
import useUnfollowProfile from "@/hooks/mutations/useUnfollowProfile";
import { showToastError } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { useRouter } from "next/navigation";

interface ProfileCardFollowButtonProps extends ButtonProps {
  id: string;
  myself: boolean;
  followed: boolean;
}

export default function ProfileCardFollowButton({
  id,
  myself,
  followed,
  className,
  ...props
}: ProfileCardFollowButtonProps) {
  const router = useRouter();
  const { isFollowProfilePending, mutateFollowProfileAsync } =
    useFollowProfile();
  const { isUnfollowProfilePending, mutateUnfollowProfileAsync } =
    useUnfollowProfile();

  const disabled = isFollowProfilePending || isUnfollowProfilePending;

  const handleFollowProfile = async () => {
    try {
      if (followed) {
        await mutateUnfollowProfileAsync(id);
      } else {
        await mutateFollowProfileAsync(id);
      }
      router.refresh();
    } catch (e) {
      showToastError(e);
    }
  };

  return (
    <Button
      disabled={disabled}
      onClick={handleFollowProfile}
      className={cn(myself && "invisible", className)}
      {...props}
    >
      {followed ? "Unfollow" : "Follow"}
    </Button>
  );
}
