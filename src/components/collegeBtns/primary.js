import { Button } from "@mantine/core";
import React from "react";

function Primary({ content, onClick }) {
  return (
    <Button
      onClick={onClick}
      styles={{ label: { whiteSpace: "normal", lineHeight: "1.5rem" } }}
      sx={{
        width: "140px",
        height: "100px",
        textAlign: "center",
      }}
      variant="outline"
      color="gray.0"
      radius="xs"
      uppercase
    >
      {content}
    </Button>
  );
}

export default Primary;
