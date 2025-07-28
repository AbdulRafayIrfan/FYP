import React, { useEffect, useState } from "react";
import Comment from "./comment";
import { Transition } from "@mantine/core";

function CommentList({ commentsArray }) {
  const [prevLength, setPrevLength] = useState(commentsArray.length);
  const [newComment, setNewComment] = useState(null);

  useEffect(() => {
    if (commentsArray.length > prevLength) {
      const latestComment = commentsArray[commentsArray.length - 1];
      setNewComment(latestComment);
    }
  }, [commentsArray])

  return commentsArray.length > 0 ? (
    commentsArray.reverse().map((comment, idx) => {
      return (
        <Transition
        key={idx}
        mounted={true}
        transition={'slide-right'}
        duration={400}
        timingFunction="ease"
        >
          {(styles) => <div style={styles}><Comment key={idx} commentData={comment} commentIndex={idx} /></div>}
        </Transition>
      )
    })
  ) : (
    <div>There are currently no comments</div>
  );
}

export default CommentList;
