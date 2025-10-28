import React from "react";
import AnalyzeForm from "./AnalyzeForm";
import AnalyzeDescription from "./AnalyzeDescription";

const Analyze = () => {
  return (
    <div className="flex flex-col gap-6 w-full mx-auto items-center justify-center max-w-6xl">
      <AnalyzeForm />
      <AnalyzeDescription />
    </div>
  );
};

export default Analyze;
