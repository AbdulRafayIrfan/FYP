import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Button, Menu } from "@mantine/core";

function DiscussionGroupDropdown({ activeSort, updateSort }) {
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      withinPortal
    >
      <Menu.Target>
        <Button
          compact
          variant="default"
          rightIcon={<ChevronDownIcon className="w-4 h-4" />}
          pr={12}
          h={"auto"}
          styles={(theme) => ({
            root: {
              backgroundColor: "#efefef",
              "&:not([data-disabled])": theme.fn.hover({
                backgroundColor: theme.fn.darken("#efefef", 0.05),
              }),
            },
          })}
        >
          {activeSort != "" ? activeSort : "Sort"}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>Sort by</Menu.Label>
        <Menu.Item onClick={() => updateSort("Top")}>Top</Menu.Item>
        <Menu.Item onClick={() => updateSort("New")}>New</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default DiscussionGroupDropdown;
