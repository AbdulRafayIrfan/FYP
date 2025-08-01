import React, { useEffect, useMemo, useState } from "react";
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
  Loader,
} from "@mantine/core";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import {
  HandThumbUpIcon as HandThumbUpOutlineIcon,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextOutlineIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  getDiscussionDetails,
  deleteDiscussion,
} from "@/misc/firestoreQueries";
import {
  ChevronLeftIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
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

  // State variable to set focus on comment input
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    // Method to fetch data asynchronously
    // When discussion id is set
    async function fetchData(id) {
      console.log("Fetching data...");
      const discussionData = await getDiscussionDetails(id);

      if (discussionData) {
        setData(discussionData);
      } else {
        console.log("Failed to fetch document details");
      }
    }

    if (discussionId) {
      fetchData(discussionId);
    }
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

  async function fetchComments() {
    const discussionData = await getDiscussionDetails(discussionId);
    if (discussionData) {
      setData(discussionData);
    } else {
      console.log("Failed to fetch document details");
    }
  }

  function updateLikeButton() {
    if (toggleLike) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setToggleLike((prev) => !prev);
  }

  function handleLike(e) {
    e.stopPropagation();
    let prevState = toggleLike;
    updateLikeButton();

    // Check what previous state was and accordingly make changes in firestore
    toggleLikePost(prevState, discussionId, currentUser.uid).catch((error) => {
      console.error(error);
      updateLikeButton();
    });
  }

  async function handleDelete(e) {
    e.stopPropagation();
    try {
      await deleteDiscussion(discussionId);
    } catch (error) {
      notifications.show({
        title: `${error}`,
        color: "red",
        icon: <ExclamationCircleIcon />,
        autoClose: 3000,
        styles: {
          title: {
            color: "red",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontWeight: "1rem",
          },
          icon: {
            width: "1.25rem",
            height: "1.25rem",
          },
        },
      });
      return;
    }
    router.push("/discussions?deletedPost");
  }

  return (
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
            <div className="text-center mt-2">
              <Loader color="red" size="lg" />
            </div>
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
              <Card withBorder radius="sm" mb="md" className={cx(classes.card)}>
                <Group position="apart">
                  <Text fw={500} component="a">
                    {data.title}
                  </Text>
                  <ActionIcon
                    className={classes.action}
                    onClick={(e) => handleDelete(e)}
                  >
                    <TrashIcon className="h-4 w-4 text-secondary mr-1" />
                  </ActionIcon>
                </Group>

                <Text fz="sm" color="dimmed" lineClamp={4}>
                  {data.content}
                </Text>

                <Group position="apart" className={classes.footer}>
                  <Center>
                    <Avatar src={data.photoURL} size={24} radius="xl" mr="xs" />
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
                      className={classes.action}
                    >
                      {toggleLike ? (
                        <HandThumbUpIcon className="h-4 w-4 text-secondary mr-1" />
                      ) : (
                        <HandThumbUpOutlineIcon className="h-4 w-4 text-secondary mr-1" />
                      )}
                      <Text fz="xs">{likes}</Text>
                    </ActionIcon>
                    <ActionIcon
                      className={classes.action}
                      onClick={() => setFocus((prev) => !prev)}
                    >
                      <ChatBubbleBottomCenterTextOutlineIcon className="h-4 w-4 text-secondary mr-1" />
                      <Text fz="xs">{data.comments.length}</Text>
                    </ActionIcon>
                  </Group>
                </Group>
              </Card>
              {/* Comment Section here with input and list of comments*/}
              <CommentInput focus={focus} updateCommentList={fetchComments} />
              <CommentList
                commentsArray={data.comments}
                updateCommentList={fetchComments}
              />
            </>
          )}
        </section>
      </Container>
    </Layout>
  );
}

export default DiscussionDetail;
