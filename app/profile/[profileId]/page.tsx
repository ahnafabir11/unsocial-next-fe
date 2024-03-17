import Profile from "@/components/Profile";
import Container from "@/components/ui/container";
import { Metadata } from "next";

// @TODO - GENERATE DYNAMIC METADATA
// #EXAMPLE { PROFILE_FULL_NAME } PROFILE
export const metadata: Metadata = {
  title: "Profile",
};

interface ProfilePageProps {
  params: { profileId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return (
    <main>
      <Container>
        <Profile profileId={params.profileId} />
      </Container>
    </main>
  );
}
