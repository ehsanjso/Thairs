import React, { useState } from "react";
import { QuestionProvider } from "../contexts/QuestionProvider";
import RecommenderDashboard from "./RecommenderDashboard";

export default function Dashboard() {
  return (
    <QuestionProvider>
      <RecommenderDashboard />
    </QuestionProvider>
  );
}
