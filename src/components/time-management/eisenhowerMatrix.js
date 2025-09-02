import { Grid, Text, TextInput } from "@mantine/core";
import React, { useEffect, useRef, useState } from "react";
import { ArrowTurnDownLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { XCircleIcon, BackspaceIcon } from "@heroicons/react/24/solid";

function EisenhowerMatrix() {
  const [matrixList1, setMatrixList1] = useState([]);
  const [matrixList2, setMatrixList2] = useState([]);
  const [matrixList3, setMatrixList3] = useState([]);
  const [matrixList4, setMatrixList4] = useState([]);

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  useEffect(() => {
    // Initialize if there's existing values...
    if (localStorage.getItem("matrixLists")) {
      console.log(JSON.parse(localStorage.getItem("matrixLists")));
      const matrixLists = JSON.parse(localStorage.getItem("matrixLists"));
      setMatrixList1(matrixLists.listOne);
      setMatrixList2(matrixLists.listTwo);
      setMatrixList3(matrixLists.listThree);
      setMatrixList4(matrixLists.listFour);
    }
  }, []);

  function updateLocalStorage(listNum, arrayVals) {
    if (!localStorage.getItem("matrixLists")) {
      localStorage.setItem("matrixLists", JSON.stringify({}));
    }
    const currentValue = JSON.parse(localStorage.getItem("matrixLists"));
    const finalValue = { ...currentValue, [listNum]: arrayVals };
    localStorage.setItem("matrixLists", JSON.stringify(finalValue));
  }

  function handleOne(e) {
    e.preventDefault();
    setMatrixList1([...matrixList1, ref1.current.value]);
    updateLocalStorage("listOne", [...matrixList1, ref1.current.value]);
    ref1.current.value = "";
  }

  function handleTwo(e) {
    e.preventDefault();
    setMatrixList2([...matrixList2, ref2.current.value]);
    updateLocalStorage("listTwo", [...matrixList2, ref2.current.value]);
    ref2.current.value = "";
  }

  function handleThree(e) {
    e.preventDefault();
    setMatrixList3([...matrixList3, ref3.current.value]);
    updateLocalStorage("listThree", [...matrixList3, ref3.current.value]);
    ref3.current.value = "";
  }

  function handleFour(e) {
    e.preventDefault();
    setMatrixList4([...matrixList4, ref4.current.value]);
    updateLocalStorage("listFour", [...matrixList4, ref4.current.value]);
    ref4.current.value = "";
  }

  function handleDelete(task, listNum) {
    let list = [];

    switch (listNum) {
      case 1:
        list = [...matrixList1];
        list = list.filter((val) => {
          return val !== task;
        });
        setMatrixList1(list);
        updateLocalStorage("listOne", list);
        break;
      case 2:
        list = [...matrixList2];
        list = list.filter((val) => {
          return val !== task;
        });
        setMatrixList2(list);
        updateLocalStorage("listTwo", list);
        break;
      case 3:
        list = [...matrixList3];
        list = list.filter((val) => {
          return val !== task;
        });
        setMatrixList3(list);
        updateLocalStorage("listThree", list);
        break;
      case 4:
        list = [...matrixList4];
        list = list.filter((val) => {
          return val !== task;
        });
        setMatrixList4(list);
        updateLocalStorage("listFour", list);
        break;
      default:
        break;
    }
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
            <TextInput
              placeholder="Type task here.."
              required
              ref={ref1}
              ml="0.5rem"
              my={"xs"}
              w={"90%"}
              rightSection={
                <ArrowTurnDownLeftIcon className="h-4 w-4 text-gray-400" />
              }
            />
          </form>
          <ul className="my-0 px-7 pb-2">
            {matrixList1.map((val, idx) => (
              <li key={idx}>
                {val}{" "}
                <BackspaceIcon
                  onClick={() => handleDelete(val, 1)}
                  className="h-4 w-4 text-gray-400 align-middle cursor-pointer"
                />
              </li>
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
            <TextInput
              placeholder="Type task here.."
              required
              ref={ref2}
              ml="0.5rem"
              my={"xs"}
              w={"90%"}
              rightSection={
                <ArrowTurnDownLeftIcon className="h-4 w-4 text-gray-400" />
              }
            />
          </form>
          <ul className="my-0 px-7 pb-2">
            {matrixList2.map((val, idx) => (
              <li key={idx}>
                {val}
                <BackspaceIcon
                  onClick={() => handleDelete(val, 2)}
                  className="h-4 w-4 text-gray-400 align-middle cursor-pointer"
                />
              </li>
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
            <TextInput
              placeholder="Type task here.."
              required
              ref={ref3}
              ml="0.5rem"
              my={"xs"}
              w={"90%"}
              rightSection={
                <ArrowTurnDownLeftIcon className="h-4 w-4 text-gray-400" />
              }
            />
          </form>
          <ul className="my-0 px-7 pb-2">
            {matrixList3.map((val, idx) => (
              <li key={idx}>
                {val}
                <BackspaceIcon
                  onClick={() => handleDelete(val, 3)}
                  className="h-4 w-4 text-gray-400 align-middle cursor-pointer"
                />
              </li>
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
            <TextInput
              placeholder="Type task here.."
              required
              ref={ref4}
              ml="0.5rem"
              my={"xs"}
              w={"90%"}
              rightSection={
                <ArrowTurnDownLeftIcon className="h-4 w-4 text-gray-400" />
              }
            />
          </form>
          <ul className="my-0 px-7 pb-2">
            {matrixList4.map((val, idx) => (
              <li key={idx}>
                {val}
                <BackspaceIcon
                  onClick={() => handleDelete(val, 4)}
                  className="h-4 w-4 text-gray-400 align-middle cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>
      </Grid.Col>
    </Grid>
  );
}

export default EisenhowerMatrix;
