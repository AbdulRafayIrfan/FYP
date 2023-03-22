import { useAuth } from "@/Contexts/AuthContext";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const { loading, currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect unauthenticated user to login page
    if (!loading && !currentUser) {
      router.push("/login");
      return;
    }

    // Redirect unverified user to setup-profile page
    if (!loading && !currentUser.emailVerified) {
      router.push("/setup-profile");
      return;
    }

    // Redirect verified user to home page
    if (!loading && currentUser.emailVerified) {
      router.push("/home");
      return;
    }
  }, [loading, currentUser, router]);

  return (
    <>
      <Head>
        <title>BUB Student Hub</title>
      </Head>
      {/* Loading animation here... */}
      {loading && <div>Loading...</div>}
    </>
  );
}
