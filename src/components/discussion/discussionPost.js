import React from "react";
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
import {
  HandThumbUpIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/20/solid";

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

function DiscussionPost({ data }) {
  const { classes, cx } = useStyles();

  return (
    <Card withBorder radius="sm" mb="md" className={cx(classes.card)}>
      <Text className={classes.title} fw={500} component="a">
        {data.title}
      </Text>

      <Text fz="sm" color="dimmed" lineClamp={4}>
        {data.content}
      </Text>

      <Group position="apart" className={classes.footer}>
        <Center>
          <Avatar src={null} size={24} radius="xl" mr="xs" />
          <Text fz="sm" inline>
            random author
          </Text>
        </Center>

        <Group spacing={8} mr={0}>
          <ActionIcon className={classes.action}>
            <HandThumbUpIcon className="h-4 w-4 text-secondary mr-1" />
            <Text fz="xs">{data.likes}</Text>
          </ActionIcon>
          <ActionIcon className={classes.action}>
            <ChatBubbleBottomCenterTextIcon className="h-4 w-4 text-secondary mr-1" />
            <Text fz="xs">{data.comments.length}</Text>
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}

export default DiscussionPost;
