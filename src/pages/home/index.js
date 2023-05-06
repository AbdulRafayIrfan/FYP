import React from "react";
import { useAuth } from "../../Contexts/AuthContext";
import { protectedPage } from "../../components/hoc/protectedPage";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { Container } from "@mantine/core";
import Head from "next/head";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";

const events = [
  { id: 1, title: "30 Days of Reciting Quran", img: "/quran_100.png" },
  { id: 2, title: "BUB's Ramadan Ghabga", img: "/bub_ghabga.png" },
  { id: 3, title: "Bonfire Night", img: "/bonfire.png" },
  { id: 4, title: "Eid Mubarak Post" },
  { id: 5, title: "BUB F1 Booth" },
];

function Home() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  // async function handleLogout() {
  //   try {
  //     await logout();
  //     router.push("/login");
  //   } catch (err) {
  //     console.log("Error logging out");
  //   }
  // }

  console.log(currentUser);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <Container size="md">
          <Carousel
            slideSize="30%"
            height={200}
            slideGap="md"
            loop
            withIndicators
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            {events.map((event) => (
              <Carousel.Slide key={event.id}>
                <Image width={300} height={300} src={event.img} alt="img" />
              </Carousel.Slide>
            ))}
          </Carousel>
        </Container>
      </Layout>
    </>
  );
}

export default protectedPage(Home);
