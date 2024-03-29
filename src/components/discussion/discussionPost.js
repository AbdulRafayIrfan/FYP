import React, { useEffect, useState } from "react";
import {
  Card,
  Text,
  ActionIcon,
  Group,
  Center,
  Avatar,
  createStyles,
  rem,
} from "@mantine/core";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import {
  HandThumbUpIcon as HandThumbUpOutlineIcon,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextOutlineIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { timeSince, checkLiked } from "@/misc/misc";
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

function DiscussionPost({ data, discussionId }) {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const postedAt = timeSince(data.postedAt);
  const [toggleLike, setToggleLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likeBtnChanging, setLikeBtnChanging] = useState(false);
  const { currentUser } = useAuth();

  // Liking system
  useEffect(() => {
    // Set like state variable to original in db
    setLikes(data.likes.length);

    // Check if post has been liked before or not by user
    if (currentUser && checkLiked(data.likes, currentUser.uid)) {
      setToggleLike(true);
    }
  }, [currentUser, data]);

  function handleLike(e) {
    // Disable button as the button would be changing after update from db
    setLikeBtnChanging(true);
    e.stopPropagation();

    // Check what previous state was and accordingly make changes in firestore
    toggleLikePost(toggleLike, discussionId, currentUser.uid)
      .then((val) => {
        // After firestore has been updated
        // Update like state variable to newly returned one
        setLikes(val);

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
    <Card
      onClick={() => {
        router.push(`/discussions/${discussionId}`);
      }}
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
            Posted {postedAt}
          </Text>
        </Center>

        <Group spacing={8} mr={0}>
          <ActionIcon
            disabled={likeBtnChanging}
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
          <ActionIcon className={classes.action}>
            <ChatBubbleBottomCenterTextOutlineIcon className="h-4 w-4 text-secondary mr-1" />
            <Text fz="xs">{data.comments.length}</Text>
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}

export default DiscussionPost;
