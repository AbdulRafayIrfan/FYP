import { Group, Text, ActionIcon, Avatar, createStyles } from "@mantine/core";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import {
  HandThumbUpIcon as HandThumbUpOutlineIcon,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextOutlineIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { checkLiked, timeSince } from "@/misc/misc";
import { useAuth } from "@/Contexts/AuthContext";
import { toggleLikeReply } from "@/misc/firestoreQueries";
import { useRouter } from "next/router";
import ReplyInput from "./replyInput";

const useStyles = createStyles((theme) => ({
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
}));

function Reply({ replyData, commentIndex, replyIndex }) {
  // Get discussion id from url
  const router = useRouter();
  const discussionId = router.query.discussionId;

  const { currentUser } = useAuth();

  const { photoURL, displayName, postedAt, reply } = replyData;
  const { classes } = useStyles();

  // Linking functionality
  const [toggleLike, setToggleLike] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likeBtnChanging, setLikeBtnChanging] = useState(false);

  useEffect(() => {
    setLikes(replyData.likes.length);

    if (currentUser && checkLiked(replyData.likes, currentUser.uid)) {
      setToggleLike(true);
    }
  }, [replyData, currentUser]);

  // Toggle visibility of reply input
  function toggleReplyInput() {
    setShowReplyInput((prevState) => !prevState);
  }

  function handleLike() {
    setLikeBtnChanging(true);

    toggleLikeReply(
      toggleLike,
      discussionId,
      currentUser.uid,
      commentIndex,
      replyIndex
    )
      .then((val) => {
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
    <>
      <Group mt="sm">
        <Avatar src={photoURL} alt={displayName} radius={"xl"}></Avatar>
        <Text size={"sm"}>{displayName}</Text>
        <Text size={"xs"} color="dimmed">
          {timeSince(postedAt)}
        </Text>
      </Group>
      <Text mt={"xs"} size={"sm"}>
        {reply}
      </Text>
      <Group mt="xs">
        <ActionIcon
          disabled={likeBtnChanging}
          onClick={() => handleLike()}
          className={classes.action}
        >
          {toggleLike ? (
            <HandThumbUpIcon className="h-4 w-4 text-secondary mr-1" />
          ) : (
            <HandThumbUpOutlineIcon className="h-4 w-4 text-secondary mr-1" />
          )}
          <Text fz="xs">{likes}</Text>
        </ActionIcon>
        <ActionIcon onClick={toggleReplyInput} className={classes.action}>
          <ChatBubbleBottomCenterTextOutlineIcon className="h-4 w-4 text-secondary" />
        </ActionIcon>
      </Group>
      {showReplyInput && (
        <ReplyInput commentIndex={commentIndex} replyingTo={displayName} />
      )}
    </>
  );
}

export default Reply;
