import React from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Button, Menu } from "@mantine/core";

function DiscussionGroupDropdown() {
  return (
    <Menu
      transitionProps={{ transition: "pop-top-right" }}
      position="top-end"
      width={220}
      withinPortal
    >
      <Menu.Target>
        <Button
          compact
          variant="default"
          rightIcon={<ChevronDownIcon className="w-4 h-4" />}
          pr={12}
        >
          Group
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item>Group 1</Menu.Item>
        <Menu.Item>Group 2</Menu.Item>
        <Menu.Item>Group 3</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default DiscussionGroupDropdown;
