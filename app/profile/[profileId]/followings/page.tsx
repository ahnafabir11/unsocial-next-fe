import FollowingsList from "@/components/FollowingsList";
import Container from "@/components/ui/container";
import { Metadata } from "next";

// @TODO - GENERATE DYNAMIC METADATA
// #EXAMPLE { PROFILE_FULL_NAME } FOLLOWINGS
export const metadata: Metadata = {
  title: "Followings",
};

interface FollowingsProps {
  params: { profileId: string };
}

export default function Followings({ params }: FollowingsProps) {
  return (
    <main>
      <Container>
        <FollowingsList profileId={params.profileId} />
      </Container>
    </main>
  );
}
