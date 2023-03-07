import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Check first if user logged in
    const isLoggedIn = false;

    // If user is not logged in, redirect to login page
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      // Else redirect to home page
      router.push("/home");
    }
  });

  return (
    <>
      <Head>
        <title>FYP App</title>
      </Head>
    </>
  );
}
