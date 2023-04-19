import React from "react";
import { Text } from "@mantine/core";

function StageTwo() {
  let data = require("../../misc/colleges.json");
  console.log(data);

  return (
    <>
      <Text fz="lg" fw={700} mt="xl">
        Select the college you are studying in...
      </Text>
    </>
  );
}

export default StageTwo;
