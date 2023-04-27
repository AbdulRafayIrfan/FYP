import React from "react";

function Course({ content, onClick, currentlySelected }) {
  return (
    <div
      onClick={onClick}
      className={
        currentlySelected === content
          ? "transition bg-orange-500 break-words m-auto text-center font-semibold w-[140px] h-[100px] border border-solid border-white cursor-pointer"
          : "break-words m-auto text-center font-semibold w-[140px] h-[100px] border border-solid border-white cursor-pointer"
      }
    >
      {content}
    </div>
  );
}

export default Course;
