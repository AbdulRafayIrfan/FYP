import React from "react";
import { protectedPage } from "../../components/hoc/protectedPage";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { Container } from "@mantine/core";
import Head from "next/head";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import Link from "next/link";

const events = [
  {
    id: 1,
    title: "30 Days of Reciting Quran",
    img: "/quran_100.png",
    link: "https://www.instagram.com/p/CqFrk6KMtlb/",
  },
  {
    id: 2,
    title: "BUB's Ramadan Ghabga",
    img: "/bub_ghabga.png",
    link: "https://www.instagram.com/p/Cqpr6YQsPuR/",
  },
  {
    id: 3,
    title: "Bonfire Night",
    img: "/bonfire.png",
    link: "https://www.instagram.com/p/CpxNlJFs3NG/",
  },
  {
    id: 4,
    title: "BUB Sports Day",
    img: "/bub_sports_day.png",
    link: "https://www.instagram.com/p/CoFMzYfMSsU/",
  },
  {
    id: 5,
    title: "BUB F1 Booth",
    img: "/bub_f1.png",
    link: "https://www.instagram.com/p/CpdHbMFM-2L/",
  },
];

function Home() {
  const router = useRouter();

  function handleClick(link) {
    router.replace(link);
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <Container size="md">
          <Carousel
            slideSize="30%"
            height={300}
            slideGap="md"
            loop
            withIndicators
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            {events.map((event) => (
              <Carousel.Slide key={event.id}>
                <Link target="_blank" href={event.link}>
                  <Image
                    onClick={handleClick}
                    priority
                    width={300}
                    height={300}
                    src={event.img}
                    alt={event.title}
                  />
                </Link>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Container>
      </Layout>
    </>
  );
}

export default protectedPage(Home);
