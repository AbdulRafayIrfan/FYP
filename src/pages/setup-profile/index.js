import PrevChevronBtn from "../../components/chevronBtns/prevChevronBtn";
import { Container, Progress, Title, Text, Loader } from "@mantine/core";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { useRouter } from "next/router";
import StageTwo from "@/components/setup_stages/stageTwo";
import StageThree from "@/components/setup_stages/stageThree";

function SetupProfile() {
  const [stage, setStage] = useState({ name: "Verify Email", num: 1 });
  const [emailVerified, setEmailVerified] = useState(false);
  const { loading, currentUser, verifyEmail, logout } = useAuth();
  const router = useRouter();

  const handleBack = () => {
    router.push("/login").then((val) => val && logout());
  }

  useEffect(() => {
    let timeoutId;

    // Send email verification after loading is done for unverified user
    if (!loading && !currentUser.emailVerified) {
      verifyEmail();
    }

    // Check for when email is verified
    const isEmailVerified = () => {
      currentUser.reload().then(() => {
        setEmailVerified(currentUser.emailVerified);
        timeoutId = setTimeout(isEmailVerified, 5000);
      });
    };

    if (currentUser && !emailVerified) {
      isEmailVerified();
    }

    if (currentUser && emailVerified) {
      setStage({ name: "Pick College", num: 2 });
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loading, verifyEmail, currentUser, emailVerified]);

  function renderStage() {
    // Render logic here...
    if (loading)
      return <div className="text-white text-center">Loading...</div>;

    switch (stage.num) {
      case 1:
        return (
          <>
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
            <Loader mt="lg" color="gray.0" size="lg" />
            <section className="w-full mt-5 flex justify-between">
              <PrevChevronBtn onClick={handleBack} />
            </section>
          </>
        );
      case 2:
        return <StageTwo changeState={setStage} />;
      case 3:
        return <StageThree />;
    }
  }

  return (
    <>
      <Head>
        <title>Setup Profile</title>
      </Head>
      <main className="flex justify-center items-center h-screen bg-secondary">
        <Container sx={{ maxWidth: 375, width: "95%", padding: 0 }}>
          <section>
            <Text
              sx={{ opacity: "0.9" }}
              mb="xs"
              fz="sm"
              tt="uppercase"
              c="gray.6"
              fw={600}
              ta={"center"}
            >
              {stage.num + "/3: " + stage.name}
            </Text>
            <Progress value={stage.num * 33.3} animate color="red.6" />
          </section>
          <section className="text-white text-center mt-4">
            <Title order={1}>Setup your profile</Title>
          </section>
          <section id="content" className="text-white text-center">
            {renderStage()}
          </section>
        </Container>
      </main>
    </>
  );
}

export default SetupProfile;
