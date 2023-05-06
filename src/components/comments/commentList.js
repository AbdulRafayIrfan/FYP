import React from "react";
import Comment from "./comment";

function CommentList({ commentsArray }) {
  return commentsArray.length > 0 ? (
    commentsArray.map((comment, idx) => {
      return <Comment key={idx} commentData={comment} commentIndex={idx} />;
    })
  ) : (
    <div>There are currently no comments</div>
  );
}

export default CommentList;
