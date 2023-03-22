import PrevChevronBtn from "@/components/PrevChevronBtn";
import { Container, Progress, Title, Text } from "@mantine/core";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useRouter } from "next/router";

function SetupProfile() {
  const [stage, setStage] = useState(1);
  const { loading, currentUser, verifyEmail } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      console.log("useEffect: email verification");
      verifyEmail();
    }
  }, [loading, verifyEmail]);

  return (
    <>
      <Head>
        <title>Setup Profile</title>
      </Head>
      <main className="flex justify-center items-center h-screen bg-secondary">
        <Container sx={{ maxWidth: 375, width: "95%", padding: 0 }}>
          <section>
            <Progress value={stage * 33.3} animate color="red.6" />
          </section>
          <section className="text-white text-center mt-4">
            <Title order={1}>Setup your profile</Title>
          </section>
          {!loading ? (
            <section id="content" className="text-white text-center">
              <Text fz="lg" fw={700} mt="xl">
                Verify Email
              </Text>
              <Text fw={500} mt="md">
                An email verification link has been emailed to you at:{" "}
                <Text fw={700}>{currentUser.email}</Text>
              </Text>
              <Text mt="sm" fw={500}>
                Please verify your email to continue further
              </Text>
              <section className="w-full mt-5 flex justify-between">
                <PrevChevronBtn onClick={() => router.push("/login")} />
              </section>
            </section>
          ) : (
            <div className="text-white text-center">Loading...</div>
          )}
        </Container>
      </main>
    </>
  );
}

export default SetupProfile;
