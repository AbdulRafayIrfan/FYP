import React, { useState } from "react";
import { Grid, Text } from "@mantine/core";
import Primary from "../collegeBtns/primary";
import Course from "./course";
import PrevChevronBtn from "../chevronBtns/prevChevronBtn";
import NextChevronBtn from "../chevronBtns/nextChevronBtn";

function StageTwo({ changeState }) {
  const [collegeSelected, setCollegeSelected] = useState([]);
  const [courseSelected, setCourseSelected] = useState();

  let collegeData = require("../../misc/colleges.json");

  function renderLogic() {
    // College not selected
    if (collegeSelected.length === 0) {
      return (
        <Grid>
          <Grid.Col span={6}>
            <Primary
              onClick={() => setCollegeSelected(collegeData[0].courses)}
              content={collegeData[0].name}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Primary
              onClick={() => setCollegeSelected(collegeData[1].courses)}
              content={collegeData[1].name}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Primary
              onClick={() => setCollegeSelected(collegeData[2].courses)}
              content={collegeData[2].name}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Primary
              onClick={() => setCollegeSelected(collegeData[3].courses)}
              content={collegeData[3].name}
            />
          </Grid.Col>
        </Grid>
      );
    }

    // If a college is selected
    if (collegeSelected.length > 0) {
      return (
        <>
          <Grid>
            {collegeSelected.map((value, idx) => (
              <Grid.Col span={6} key={idx}>
                <Course
                  onClick={() => setCourseSelected(value)}
                  content={value}
                  currentlySelected={courseSelected}
                />
              </Grid.Col>
            ))}
          </Grid>
          <div className="flex justify-between mx-[1.1rem] mt-6">
            <PrevChevronBtn
              onClick={() => {
                setCollegeSelected([]);
                setCourseSelected();
              }}
            />
            {courseSelected && (
              <NextChevronBtn
                onClick={() => changeState({ name: "Add Details", num: 3 })}
              />
            )}
          </div>
        </>
      );
    }
  }

  return (
    <>
      <Text fz="lg" fw={700} mt="xl" mb="xl">
        {collegeSelected.length > 0
          ? "Select your course"
          : "Select the college you are studying in"}
      </Text>
      {renderLogic()}
    </>
  );
}

export default StageTwo;
