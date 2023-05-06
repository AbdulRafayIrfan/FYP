import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/components/layout";
import {
  Container,
  Card,
  Text,
  Group,
  Center,
  Avatar,
  ActionIcon,
  rem,
  createStyles,
  Button,
} from "@mantine/core";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import {
  HandThumbUpIcon as HandThumbUpOutlineIcon,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextOutlineIcon,
} from "@heroicons/react/24/outline";
import { getDiscussionDetails } from "@/misc/firestoreQueries";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { timeSince, checkLiked } from "@/misc/misc";
import CommentInput from "@/components/comments/commentInput";
import CommentList from "@/components/comments/commentList";
import { useAuth } from "@/Contexts/AuthContext";
import { toggleLikePost } from "@/misc/firestoreQueries";

// Custom styles for Card component
const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    cursor: "pointer",
    ":hover": { border: "1px solid #E83D3C" },
  },

  rating: {
    position: "absolute",
    top: theme.spacing.xs,
    right: rem(12),
    pointerEvents: "none",
  },

  title: {
    display: "block",
    marginTop: theme.spacing.md,
    marginBottom: rem(5),
  },

  action: {
    width: "3rem",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    }),
  },

  footer: {
    marginTop: theme.spacing.md,
  },
}));

function DiscussionDetail() {
  const { classes, cx } = useStyles();

  const [data, setData] = useState();
  const router = useRouter();
  // Get discussion details from its Id
  const discussionId = router.query.discussionId;

  const { currentUser } = useAuth();
  const [toggleLike, setToggleLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likeBtnChanging, setLikeBtnChanging] = useState(false);

  useEffect(() => {
    // Method to fetch data asynchronously
    async function fetchData(id) {
      const discussionData = await getDiscussionDetails(id);

      if (discussionData) {
        setData(discussionData);
      } else {
        console.log("Failed to fetch document details");
      }
    }

    fetchData(discussionId);
  }, [discussionId]);

  // useEffect for liking system similar to other files
  useEffect(() => {
    // When data variable has been set
    if (data) {
      // Set like state variable to original in db
      setLikes(data.likes.length);

      // Check if post has been liked before or not by user
      if (currentUser && checkLiked(data.likes, currentUser.uid)) {
        setToggleLike(true);
      }
    }
  }, [currentUser, data]);

  function handleLike(e) {
    setLikeBtnChanging(true);
    e.stopPropagation();

    // Check what previous state was and accordingly make changes in firestore
    toggleLikePost(toggleLike, discussionId, currentUser.uid)
      .then((val) => {
        // After firestore has been updated
        // Update like state variable to newly returned one
        setLikes(val, () => {
          setToggleLike((prevState) => !prevState);
        });

        // Update thumbs up icon
        setToggleLike((prevState) => !prevState);

        // Enable button again
        setLikeBtnChanging(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <Head>
        <title>{/* Can add title of post here */}</title>
      </Head>
      <Layout>
        <Container
          size="md"
          sx={{
            display: "grid",
            gridTemplateColumns: "minmax(320px, 576px)",
            justifyItems: "center",
            justifyContent: "center",
            padding: 0,
          }}
        >
          <section className="inline-block w-full">
            {!data ? (
              <div>Loading...</div>
            ) : (
              <>
                <Button
                  mt="sm"
                  mb={"lg"}
                  leftIcon={<ChevronLeftIcon className="h-4 w-4" />}
                  variant=""
                  color="gray.0"
                  onClick={() => {
                    router.push("/discussions");
                  }}
                >
                  Back
                </Button>
                <Card
                  withBorder
                  radius="sm"
                  mb="md"
                  className={cx(classes.card)}
                >
                  <Text className={classes.title} fw={500} component="a">
                    {data.title}
                  </Text>

                  <Text fz="sm" color="dimmed" lineClamp={4}>
                    {data.content}
                  </Text>

                  <Group position="apart" className={classes.footer}>
                    <Center>
                      <Avatar
                        src={data.photoURL}
                        size={24}
                        radius="xl"
                        mr="xs"
                      />
                      <Text fz="sm" inline>
                        {data.displayName}
                      </Text>
                      <Text
                        ml="xs"
                        tt="uppercase"
                        color="dimmed"
                        sx={{ fontSize: "0.65rem", marginTop: "0.3rem" }}
                      >
                        Posted {timeSince(data.postedAt)}
                      </Text>
                    </Center>

                    <Group spacing={8} mr={0}>
                      <ActionIcon
                        onClick={(e) => handleLike(e)}
                        disabled={likeBtnChanging}
                        className={classes.action}
                      >
                        {toggleLike ? (
                          <HandThumbUpIcon className="h-4 w-4 text-secondary mr-1" />
                        ) : (
                          <HandThumbUpOutlineIcon className="h-4 w-4 text-secondary mr-1" />
                        )}
                        <Text fz="xs">{likes}</Text>
                      </ActionIcon>
                      <ActionIcon className={classes.action}>
                        <ChatBubbleBottomCenterTextOutlineIcon className="h-4 w-4 text-secondary mr-1" />
                        <Text fz="xs">{data.comments.length}</Text>
                      </ActionIcon>
                    </Group>
                  </Group>
                </Card>
                {/* Comment Section here with input and list of comments*/}
                <CommentInput />
                <CommentList commentsArray={data.comments} />
              </>
            )}
          </section>
        </Container>
      </Layout>
    </>
  );
}

export default DiscussionDetail;
