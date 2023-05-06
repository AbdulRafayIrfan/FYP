import React, { useState } from "react";
import { createStyles, Text, Avatar, Group, ActionIcon } from "@mantine/core";
import { timeSince } from "@/misc/misc";
import {
  ChatBubbleBottomCenterTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HandThumbUpIcon,
} from "@heroicons/react/20/solid";
import RepliesList from "../replies/repliesList";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const discussionId = router.query.discussionId;

  const { comment, displayName, likes, photoURL, postedAt, replies } =
    commentData;
  const { classes } = useStyles();
  const [repliesOpen, setRepliesOpen] = useState(false);

  function toggleReplies() {
    setRepliesOpen((prevState) => !prevState);
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
          <ActionIcon className={classes.action}>
            <HandThumbUpIcon className="h-4 w-4 text-secondary mr-1" />
            <Text fz="xs">{likes}</Text>
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-secondary" />
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
            <RepliesList repliesArray={replies} />
          </div>
        )}
      </div>
    </>
  );
}

export default Comment;
