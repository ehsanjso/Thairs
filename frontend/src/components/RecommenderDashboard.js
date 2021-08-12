import React, { useState } from "react";
import * as R from "ramda";
import { Drawer, Button } from "antd";
import {
  RadarChartOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
  CoffeeOutlined,
  RedoOutlined,
} from "@ant-design/icons";
import Question from "./Question";
import Logo from "./Logo";
import XAI from "./XAI";
import GaugeFlat from "./GaugeFlat";
import { useQuestion } from "../contexts/QuestionProvider";
import { useGroup } from "../contexts/GroupProvider";
import "../styles/components/dashboard.scss";
import MovieCard from "./MovieCard";
import GroupAnswer from "./GroupAnswer";
import Wait from "./Wait";

export default function RecommenderDashboard() {
  const [visible, setVisible] = useState(false);
  const {
    question,
    getQuestion,
    movie,
    tree,
    answers,
    getMovie,
    movieNum,
    clear,
    answerPosters,
    qNum,
    isLeaf,
  } = useQuestion();
  const { isGroupMode, group, userToken } = useGroup();

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

  const hasMovie = !!movie;

  return (
    <div className="dashboard">
      <Logo />
      {question && !movie && !isLeaf && (
        <Question
          data={question}
          getQuestion={getQuestion}
          answerPosters={answerPosters}
          qNum={qNum}
        />
      )}
      {isGroupMode && isLeaf && !movie && <Wait />}
      {movie && (
        <MovieCard data={movie} getMovie={getMovie} movieNum={movieNum} />
      )}
      <GaugeFlat
        data={confidence}
        getMovie={getMovie}
        cluster={question ? question.cluster : undefined}
        hasMovie={!!movie}
      />
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

      <div className="menu">
        <Button
          icon={<RedoOutlined />}
          className="recommend-btn"
          onClick={clear}
          shape="round"
        >
          Redo
        </Button>
        {!hasMovie && !isGroupMode && (
          <Button
            type="primary"
            icon={<CoffeeOutlined />}
            className="recommend-btn"
            onClick={() => getMovie(undefined, true)}
            shape="round"
          >
            Recommend Now!
          </Button>
        )}
      </div>
      {isGroupMode && (
        <GroupAnswer group={group} isLeaf={isLeaf} userToken={userToken} />
      )}
    </div>
  );
}
