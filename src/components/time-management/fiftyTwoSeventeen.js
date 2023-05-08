import { timerDisplay } from "@/misc/misc";
import { Button, Grid, Text } from "@mantine/core";
import React, { useEffect, useState, useMemo } from "react";

function FiftyTwoSeventeen() {
  const [mode, setMode] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Set at 0.25 minutes for demonstration purposes
  const workMinutes = 0.25;
  const restMinutes = 0.25;

  const minutesMemo = useMemo(() => {
    return {
      work: workMinutes,
      rest: restMinutes,
    };
  }, [workMinutes, restMinutes]);

  function initTimer() {
    setMode("Work");
    setSecondsLeft(workMinutes * 60);
  }

  function stopTimer() {
    setMode("");
    setSecondsLeft(0);
  }

  useEffect(() => {
    function playNoise() {
      new Audio("/assets/bell-noise.mp3").play();
    }

    function toggleMode() {
      playNoise();
      const nextMode = mode === "Work" ? "Rest" : "Work";
      setMode(nextMode);
      setSecondsLeft(
        nextMode === "Work" ? minutesMemo.work * 60 : minutesMemo.rest * 60
      );
    }

    function tick() {
      setSecondsLeft(secondsLeft - 1);
    }

    if (secondsLeft === 0 && mode !== "") {
      return toggleMode();
    }

    if (secondsLeft > 0) {
      const interval = setInterval(() => {
        tick();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [secondsLeft, mode, minutesMemo]);

  return (
    <div className="text-center">
      <Grid mt={"xs"}>
        <Grid.Col span={6}>
          <Text tt={"uppercase"} color="red" fw={700} fz="xl">
            Work Timer
          </Text>
          <Text fz={"xl"} mt={"sm"} fw={"500"} c="dimmed">
            {mode === "Work" && secondsLeft > 0
              ? timerDisplay(secondsLeft)
              : "00:15"}
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Text tt={"uppercase"} color="green" fw={700} fz="xl">
            Rest Timer
          </Text>
          <Text fz={"xl"} mt={"sm"} fw={"500"} c="dimmed">
            {mode === "Rest" && secondsLeft > 0
              ? timerDisplay(secondsLeft)
              : "00:15"}
          </Text>
        </Grid.Col>
      </Grid>
      <div className="mt-12 flex justify-around">
        <Button
          disabled={mode !== "" && secondsLeft > 0}
          onClick={initTimer}
          color="red"
          size="lg"
        >
          Start
        </Button>
        <Button onClick={stopTimer} color="blue" size="lg">
          Stop
        </Button>
      </div>
    </div>
  );
}

export default FiftyTwoSeventeen;
