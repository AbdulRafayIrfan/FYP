import React from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Button } from "@mantine/core";
import { btnHoverStyles } from "@/constants/stylingConstants";

function PrevChevronBtn({ loading, onClick }) {
  // Render loading button upon loading prop
  {
    return loading ? (
      <Button loading type="submit" bg="none" sx={btnHoverStyles}>
        <p className="text-sm text-primary text-center font-semibold pr-1.5 py-0.5 inline-block">
          <span className="align-middle">
            <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
          </span>
          Back
        </p>
      </Button>
    ) : (
      <Button onClick={onClick} type="submit" bg="none" sx={btnHoverStyles}>
        <p className="text-sm text-primary text-center font-semibold pr-1.5 py-0.5 inline-block">
          <span className="align-middle">
            <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
          </span>
          Back
        </p>
      </Button>
    );
  }
}

export default PrevChevronBtn;
