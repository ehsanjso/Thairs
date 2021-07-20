import React from "react";
import { Progress } from "antd";
import PosterQuestion from "./PosterQuestion";
import TaglineQuestion from "./TaglineQuestion";
import TrailerQuestion from "./TrailerQuestion";
import WordCloudQuestions from "./WordCloudQuestions";
import "../styles/components/dashboard.scss";
import Logo from "./Logo";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <Logo />
      <Progress
        percent={50}
        showInfo={false}
        strokeLinecap="square"
        strokeColor="#ff2e63"
      />
      <PosterQuestion />
      {/* <TrailerQuestion /> */}
      {/* <TaglineQuestion /> */}
      {/* <WordCloudQuestions /> */}
    </div>
  );
}
