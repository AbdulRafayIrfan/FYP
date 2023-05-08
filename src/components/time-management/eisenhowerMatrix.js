import { Grid, Text, TextInput } from "@mantine/core";
import React, { useRef, useState } from "react";

function EisenhowerMatrix() {
  const [matrixList1, setMatrixList1] = useState([]);
  const [matrixList2, setMatrixList2] = useState([]);
  const [matrixList3, setMatrixList3] = useState([]);
  const [matrixList4, setMatrixList4] = useState([]);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  function handleOne(e) {
    e.preventDefault();
    setMatrixList1([...matrixList1, ref1.current.value]);
    ref1.current.value = "";
  }
  function handleTwo(e) {
    e.preventDefault();
    setMatrixList2([...matrixList2, ref2.current.value]);
    ref2.current.value = "";
  }
  function handleThree(e) {
    e.preventDefault();
    setMatrixList3([...matrixList3, ref3.current.value]);
    ref3.current.value = "";
  }
  function handleFour(e) {
    e.preventDefault();
    setMatrixList4([...matrixList4, ref4.current.value]);
    ref4.current.value = "";
  }

  return (
    <Grid>
      <Grid.Col span={6}>
        <Text mb="xs" c="dimmed" fw={700} fz={"xs"}>
          Important | Urgent
        </Text>
        <div className="bg-[#00677f] text-white">
          <Text ml="0.5rem" fs={"italic"} fz={"xl"} fw={700}>
            DO
          </Text>
          <form onSubmit={(e) => handleOne(e)}>
            <TextInput required ref={ref1} ml="0.5rem" my={"xs"} w={"90%"} />
          </form>
          <ul className="my-0 px-7 pb-2">
            {matrixList1.map((val, idx) => (
              <li key={idx}>{val}</li>
            ))}
          </ul>
        </div>
      </Grid.Col>
      <Grid.Col span={6}>
        <Text mb="xs" c="dimmed" fw={700} fz={"xs"}>
          Important | Not Urgent
        </Text>
        <div className="bg-[#18333a] text-white">
          <Text ml="0.5rem" fs={"italic"} fz={"xl"} fw={700}>
            Decide
          </Text>
          <form onSubmit={(e) => handleTwo(e)}>
            <TextInput required ref={ref2} ml="0.5rem" my={"xs"} w={"90%"} />
          </form>
          <ul className="my-0 px-7 pb-2">
            {matrixList2.map((val, idx) => (
              <li key={idx}>{val}</li>
            ))}
          </ul>
        </div>
      </Grid.Col>
      <Grid.Col mt={"xs"} span={6}>
        <Text mb="xs" c="dimmed" fw={700} fz={"xs"}>
          Not Important | Urgent
        </Text>
        <div className="bg-[#18333a] text-white">
          <Text ml="0.5rem" fs={"italic"} fz={"xl"} fw={700}>
            Delegate
          </Text>
          <form onSubmit={(e) => handleThree(e)}>
            <TextInput required ref={ref3} ml="0.5rem" my={"xs"} w={"90%"} />
          </form>
          <ul className="my-0 px-7 pb-2">
            {matrixList3.map((val, idx) => (
              <li key={idx}>{val}</li>
            ))}
          </ul>
        </div>
      </Grid.Col>

      <Grid.Col mt={"xs"} span={6}>
        <Text mb="xs" c="dimmed" fw={700} fz={"xs"}>
          Not Important | Not Urgent
        </Text>
        <div className="bg-[#de5623] text-white">
          <Text ml="0.5rem" fs={"italic"} fz={"xl"} fw={700}>
            Delete
          </Text>
          <form onSubmit={(e) => handleFour(e)}>
            <TextInput required ref={ref4} ml="0.5rem" my={"xs"} w={"90%"} />
          </form>
          <ul className="my-0 px-7 pb-2">
            {matrixList4.map((val, idx) => (
              <li key={idx}>{val}</li>
            ))}
          </ul>
        </div>
      </Grid.Col>
    </Grid>
  );
}

export default EisenhowerMatrix;
