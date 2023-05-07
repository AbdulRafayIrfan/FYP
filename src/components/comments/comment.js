import React, { useEffect, useState } from "react";
import { createStyles, Text, Avatar, Group, ActionIcon } from "@mantine/core";
import { timeSince } from "@/misc/misc";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import {
  HandThumbUpIcon as HandThumbUpOutlineIcon,
  ChatBubbleBottomCenterTextIcon as ChatBubbleBottomCenterTextOutlineIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import RepliesList from "../replies/repliesList";
import { useRouter } from "next/router";
import { useAuth } from "@/Contexts/AuthContext";
import { checkLiked } from "@/misc/misc";
import { toggleLikeComment } from "@/misc/firestoreQueries";

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

  repliesAction: {
    width: "5rem",
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

function Comment({ commentData, commentIndex }) {
  // Get discussion id from url
  const router = useRouter();
  const discussionId = router.query.discussionId;

  // Current user details
  const { currentUser } = useAuth();

  const { comment, displayName, photoURL, postedAt, replies } = commentData;
  const { classes } = useStyles();
  const [repliesOpen, setRepliesOpen] = useState(false);

  // Linking Functionality
  const [toggleLike, setToggleLike] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likeBtnChanging, setLikeBtnChanging] = useState(false);

  useEffect(() => {
    setLikes(commentData.likes.length);

    if (currentUser && checkLiked(commentData.likes, currentUser.uid)) {
      setToggleLike(true);
    }
  }, [commentData, currentUser]);

  function toggleReplies() {
    setRepliesOpen((prevState) => !prevState);
  }

  function handleLike() {
    setLikeBtnChanging(true);

    // Check what previous state was and accordingly make changes in firestore
    toggleLikeComment(toggleLike, discussionId, currentUser.uid, commentIndex)
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
      <div className="bg-white rounded my-4 p-3 border border-[#E9ECEF]">
        <Group>
          <Avatar src={photoURL} alt={displayName} radius={"xl"}></Avatar>
          <Text size={"sm"}>{displayName}</Text>
          <Text size={"xs"} color="dimmed">
            {timeSince(postedAt)}
          </Text>
        </Group>
        <Text mt={"xs"} size={"sm"}>
          {comment}
        </Text>
        <Group mt="xs">
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
            <ChatBubbleBottomCenterTextOutlineIcon className="h-4 w-4 text-secondary" />
          </ActionIcon>
        </Group>
        {/* Replies section */}
        {replies.length > 0 && (
          <ActionIcon
            onClick={toggleReplies}
            mt="xs"
            className={classes.repliesAction}
          >
            {repliesOpen ? (
              <ChevronUpIcon className="h-4 w-4" />
            ) : (
              <ChevronDownIcon className="h-4 w-4" />
            )}
            <Text fz="xs">
              {replies.length} {replies.length > 1 ? "replies" : "reply"}
            </Text>
          </ActionIcon>
        )}
        {repliesOpen && (
          <div id="replies-list" className="ml-12">
            <RepliesList repliesArray={replies} commentIndex={commentIndex} />
          </div>
        )}
      </div>
    </>
  );
}

export default Comment;
