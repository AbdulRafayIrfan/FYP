import { Group, Text, ActionIcon, Avatar, createStyles } from "@mantine/core";
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import { timeSince } from "@/misc/misc";

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

function Reply({ replyData }) {
  const { photoURL, displayName, postedAt, reply, likes } = replyData;
  const { classes } = useStyles();

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
        <ActionIcon className={classes.action}>
          <HandThumbUpIcon className="h-4 w-4 text-secondary mr-1" />
          <Text fz="xs">{likes}</Text>
        </ActionIcon>
        <ActionIcon className={classes.action}>
          <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-secondary" />
        </ActionIcon>
      </Group>
    </>
  );
}

export default Reply;
