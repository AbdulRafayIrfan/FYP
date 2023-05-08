import { Button } from "@mantine/core";
import React from "react";
import { ClockIcon } from "@heroicons/react/24/solid";

function TechniqueSelector({ data, onClick }) {
  return (
    <Button
      onClick={() => onClick(data.name)}
      sx={{
        height: "7rem",
        width: "100%",
      }}
      styles={{
        label: {
          whiteSpace: "normal",
          wordBreak: "break-all",
        },
      }}
      variant="default"
      color="red"
    >
      {data.name}
    </Button>
  );
}

export default TechniqueSelector;
