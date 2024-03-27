import { notFound } from "next/navigation";
import VerifyAccountCard from "./VerifyAccountCard";

interface VerifyAccountProps {
  params: {};
  searchParams: { token?: string };
}

export default function VerifyAccount({
  params,
  searchParams,
}: VerifyAccountProps) {
  const { token } = searchParams;
  if (!token) notFound();

  return (
    <>
      <VerifyAccountCard token={token} />
    </>
  );
}
