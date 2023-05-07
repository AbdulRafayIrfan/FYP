import { Button } from "@mantine/core";
import React from "react";
import { ClockIcon, StarIcon } from "@heroicons/react/20/solid";
import DiscussionGroupDropdown from "./discussionGroupDropdown";

function QueryDiscussion() {
  return (
    <section className="border-[1px] bg-white border-solid box-border w-full min-w-[320px] border-[#E9ECEF] rounded-sm mb-2 p-1 flex justify-between">
      <div>
        <Button
          compact
          color="red"
          leftIcon={<ClockIcon className="h-4 w-4" />}
        >
          New
        </Button>
        <Button
          compact
          ml="0.5rem"
          color="red"
          leftIcon={<StarIcon className="h-4 w-4" />}
        >
          Top Liked
        </Button>
      </div>
      <DiscussionGroupDropdown />
    </section>
  );
}

export default QueryDiscussion;
