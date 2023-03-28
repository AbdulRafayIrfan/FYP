import React from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { protectedPage } from "../../components/hoc/protectedPage";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { Container } from "@mantine/core";

function Home() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  async function handleLogout() {
    try {
      await logout();
      router.push("/login");
    } catch (err) {
      console.log("Error logging out");
    }
  }

  return (
    <Layout>
      {/* <div>{JSON.stringify(currentUser)}</div>
      <button onClick={handleLogout}>Sign out</button> */}
      {/* <div>{currentUser && currentUser.email}</div> */}
      <Container size="md">{currentUser && currentUser.email}</Container>
    </Layout>
  );
}

export default Home;
