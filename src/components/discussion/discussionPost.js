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
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { timeSince, checkLiked, openDeleteModal } from "@/misc/misc";
import { useAuth } from "@/Contexts/AuthContext";
import { toggleLikePost, deleteDiscussion } from "@/misc/firestoreQueries";
import { modals } from "@mantine/modals";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/20/solid";
import { notifications } from "@mantine/notifications";

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

function DiscussionPost({ data, discussionId, fetchDiscussions }) {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const postedAt = timeSince(data.postedAt);
  const [toggleLike, setToggleLike] = useState(false);
  const [likes, setLikes] = useState(0);
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

    // Eager / Optimistic UI Changes
    updateLikeButton();

    // Check what previous state was and accordingly make changes in firestore
    toggleLikePost(prevState, discussionId, currentUser.uid).catch((error) => {
      console.error(error);
      updateLikeButton();
    });
  }

  async function deletePost() {
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

    fetchDiscussions();
    notifications.show({
      title: "Successfully deleted the post!",
      color: "green",
      autoClose: 2000,
      icon: <CheckCircleIcon />,
      styles: {
        title: {
          color: "green",
          textTransform: "uppercase",
          fontWeight: "bold",
          fontSize: "1rem",
        },
      },
    });
  }

  function handleDelete(e) {
    e.stopPropagation();
    modals.openConfirmModal({
      title: "Delete post",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this post? You won&apos;t be able to
          revert this!
        </Text>
      ),
      labels: { confirm: "Delete post", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onConfirm: deletePost,
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
      <Group position="apart">
        <Text fw={500} component="a">
          {data.title}
        </Text>

        {currentUser.displayName == data.displayName && (
          <ActionIcon
            className={classes.action}
            onClick={(e) => handleDelete(e)}
          >
            <TrashIcon className="h-4 w-4 text-secondary mr-1" />
          </ActionIcon>
        )}
      </Group>

      <Text fz="sm" color="dimmed" lineClamp={4}>
        {data.content}
      </Text>

      <Group position="apart" className={classes.footer}>
        <Center>
          <Avatar src={data.photoURL} size={24} radius="xl" mr="xs" />
          <Text fz="sm" inline>
            {data.displayName ?? "Guest"}
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
          <ActionIcon onClick={(e) => handleLike(e)} className={classes.action}>
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
