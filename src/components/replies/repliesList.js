import React from "react";
import Reply from "./reply";

function RepliesList({ repliesArray }) {
  return repliesArray.map((reply, idx) => {
    return <Reply key={idx} replyData={reply} />;
  });
}

export default RepliesList;
