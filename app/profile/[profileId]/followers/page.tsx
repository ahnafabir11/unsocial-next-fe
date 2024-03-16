import FollowersList from "@/components/FollowersList";
import Container from "@/components/ui/container";
import { Metadata } from "next";

// @TODO - GENERATE DYNAMIC METADATA
// #EXAMPLE { PROFILE_FULL_NAME } FOLLOWERS
export const metadata: Metadata = {
  title: "Followers",
};

interface FollowersProps {
  params: { profileId: string };
}

export default function Followers({ params }: FollowersProps) {
  return (
    <main>
      <Container>
        <FollowersList profileId={params.profileId} />
      </Container>
    </main>
  );
}
