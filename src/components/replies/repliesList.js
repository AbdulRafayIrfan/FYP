import React from "react";
import Reply from "./reply";

function RepliesList({ repliesArray, commentIndex }) {
  return repliesArray.map((reply, idx) => {
    // Provide each reply with the comment index & reply index
    // in firestore db
    return (
      <Reply
        key={idx}
        replyData={reply}
        commentIndex={commentIndex}
        replyIndex={idx}
      />
    );
  });
}

export default RepliesList;
