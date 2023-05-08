import React from "react";
import PomodoroTechnique from "./pomodoroTechnique";
import FiftyTwoSeventeen from "./fiftyTwoSeventeen";
import EisenhowerMatrix from "./eisenhowerMatrix";

function TechniqueContent({ technique }) {
  function renderContent() {
    switch (technique) {
      case "Pomodoro":
        return <PomodoroTechnique />;
      case "52/17":
        return <FiftyTwoSeventeen />;
      case "Eisenhower Matrix":
        return <EisenhowerMatrix />;
    }
  }

  return <>{renderContent()}</>;
}

export default TechniqueContent;
