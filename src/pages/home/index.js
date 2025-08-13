import React, { useEffect } from "react";
import { protectedPage } from "../../components/hoc/protectedPage";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { Container } from "@mantine/core";
import Head from "next/head";
import { Carousel } from "@mantine/carousel";
import Image from "next/image";
import Link from "next/link";
import { getPosts } from "@/misc/instagram";

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24 * 7, // 7 days revalidation period
  };
}

function Home({ posts }) {
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
            height={448}
            slideGap="md"
            loop
            withIndicators
            style={{ marginTop: 50, marginBottom: 50 }}
          >
            {posts.map((post) => (
              <Carousel.Slide key={post.code}>
                <Link
                  target="_blank"
                  href={`https://www.instagram.com/p/${post.code}`}
                >
                  <Image
                    onClick={handleClick}
                    width={360}
                    height={448}
                    priority
                    src={post.imageURL}
                    alt={post.type}
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
