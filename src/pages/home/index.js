import React from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { protectedPage } from "@/components/hoc/ProtectedPage";
import { useRouter } from "next/router";

function Home() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  async function handleLogout() {
    try {
      await logout();
      router.push('/login')
    } catch (err) {
      console.log("Error logging out");
    }
  }

  return (
    <>
      <div>{JSON.stringify(currentUser)}</div>
      <button onClick={handleLogout}>Sign out</button>
    </>
  );
}

export default protectedPage(Home);
