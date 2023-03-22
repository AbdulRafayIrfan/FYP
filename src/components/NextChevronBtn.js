import React from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@mantine/core";

function NextChevronBtn({ loading, onClick }) {
  // Render loading button upon loading prop
  {
    return loading ? (
      <Button
        loading
        type="submit"
        bg="none"
        sx={{
          ":hover": {
            backgroundColor: "rgb(255,255,255,0.2)",
            cursor: "pointer",
          },
          ":active": { backgroundColor: "rgb(255,255,255,0.1)" },
        }}
      >
        <p className="text-sm text-primary text-center font-semibold pl-1.5 py-0.5 inline-block">
          Next
          <span className="align-middle">
            <ChevronRightIcon className="h-6 w-6"></ChevronRightIcon>
          </span>
        </p>
      </Button>
    ) : (
      <Button
        onClick={onClick}
        type="submit"
        bg="none"
        sx={{
          ":hover": {
            backgroundColor: "rgb(255,255,255,0.2)",
            cursor: "pointer",
          },
          ":active": { backgroundColor: "rgb(255,255,255,0.1)" },
        }}
      >
        <p className="text-sm text-primary text-center font-semibold pl-1.5 py-0.5 inline-block">
          Next
          <span className="align-middle">
            <ChevronRightIcon className="h-6 w-6"></ChevronRightIcon>
          </span>
        </p>
      </Button>
    );
  }
}

export default NextChevronBtn;
