import React, { useState } from "react";
import { Drawer, Progress } from "antd";
import {
  RadarChartOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import PosterQuestion from "./PosterQuestion";
import TaglineQuestion from "./TaglineQuestion";
import TrailerQuestion from "./TrailerQuestion";
import WordCloudQuestions from "./WordCloudQuestions";
import Question from "./Question";
import Logo from "./Logo";
import XAI from "./XAI";
import Gauge from "./Gauge";
import { useQuestion } from "../contexts/QuestionProvider";
import "../styles/components/dashboard.scss";
import MovieCard from "./MovieCard";

export default function RecommenderDashboard() {
  const [visible, setVisible] = useState(false);
  const { question, getQuestion, movie, qNum, tree, answers } = useQuestion();

  const toggleDrawer = () => {
    setVisible((prevState) => !prevState);
  };
  const onClose = () => {
    setVisible(false);
  };

  const confidence = question
    ? question.probability
      ? question.probability
      : 0
    : 0;

  return (
    <div className="dashboard">
      <Logo />
      <Progress
        percent={movie ? 100 : qNum * 5}
        showInfo={false}
        strokeLinecap="square"
        strokeColor="#ff2e63"
      />
      {question && !movie && (
        <Question data={question} getQuestion={getQuestion} />
      )}
      {movie && <MovieCard data={movie} />}
      {/* <PosterQuestion /> */}
      {/* <TrailerQuestion /> */}
      {/* <TaglineQuestion /> */}
      {/* <WordCloudQuestions /> */}
      <Gauge data={confidence} />
      <div
        className={`note-btn ${visible ? "active" : ""}`}
        onClick={toggleDrawer}
      >
        {visible ? <CaretLeftOutlined /> : <CaretRightOutlined />}
        <RadarChartOutlined />
      </div>
      <Drawer
        title=""
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        mask={false}
        width={600}
      >
        <XAI treeArray={tree} answers={answers} />
      </Drawer>
    </div>
  );
}
