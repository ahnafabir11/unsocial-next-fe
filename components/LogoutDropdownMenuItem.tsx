"use client";

import { showToastError } from "@/lib/helper";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import useLogoutMutation from "@/hooks/mutations/useLogoutMutation";
import { useRouter } from "next/navigation";

export default function LogoutDropdownMenuItem() {
  const router = useRouter();
  const { isLogoutPending, logoutMutateAsync } = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutateAsync();
      router.push("/signin");
    } catch (e) {
      showToastError(e);
    }
  };

  return (
    <DropdownMenuItem disabled={isLogoutPending} onClick={handleLogout}>
      Logout
    </DropdownMenuItem>
  );
}
