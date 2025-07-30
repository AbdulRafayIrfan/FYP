import React, { useEffect, useState } from "react";
import Comment from "./comment";
import { Transition } from "@mantine/core";

function CommentList({ commentsArray }) {
  console.log("Comment list re-render!");

  const [prevLength, setPrevLength] = useState(commentsArray.length);
  const [newComment, setNewComment] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (commentsArray.length > prevLength) {
      const latestComment = commentsArray[commentsArray.length - 1];
      setNewComment(latestComment);
      setMounted(false);
      const timeout = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(timeout);
    }
  }, [commentsArray, prevLength]);

  if (commentsArray.length == 0) {
    return <div>There are currently no comments</div>;
  }

  return [...commentsArray].reverse().map((comment, idx) => {
    const isNew = newComment
      ? newComment.postedAt.isEqual(comment.postedAt)
      : false;

    return isNew ? (
      <Transition
        key={idx}
        mounted={mounted}
        transition={"slide-right"}
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <Comment key={idx} commentData={comment} commentIndex={idx} />
          </div>
        )}
      </Transition>
    ) : (
      <Comment key={idx} commentData={comment} commentIndex={idx} />
    );
  });
}

export default CommentList;
