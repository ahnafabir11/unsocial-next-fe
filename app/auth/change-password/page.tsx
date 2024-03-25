import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChangePasswordForm from "./ChangePasswordForm";

export const metadata: Metadata = {
  title: "Change Password",
};

interface ChangePasswordProps {
  params: {};
  searchParams: { token?: string };
}

export default function ChangePassword({
  params,
  searchParams,
}: ChangePasswordProps) {
  const { token } = searchParams;

  if (!token) notFound();

  return (
    <>
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">
        Change Password
      </h2>

      <p className="text-sm font-medium leading-none mb-8">
        Already have an account?{" "}
        <Link href="/auth/signin" className="underline">
          Sign In
        </Link>
      </p>

      <ChangePasswordForm token={token} />
    </>
  );
}
