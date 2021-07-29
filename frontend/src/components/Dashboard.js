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
import "../styles/components/dashboard.scss";
import Logo from "./Logo";
import XAI from "./XAI";
import Gauge from "./Gauge";

export default function Dashboard() {
  const [visible, setVisible] = useState(false);
  const toggleDrawer = () => {
    setVisible((prevState) => !prevState);
  };
  const onClose = () => {
    setVisible(false);
  };
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
      <Gauge />
      <div
        className={`note-btn ${visible ? "active" : ""}`}
        onClick={toggleDrawer}
      >
        {visible ? <CaretLeftOutlined /> : <CaretRightOutlined />}
        <RadarChartOutlined />
      </div>
      <Drawer
        title="XAI"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        mask={false}
        width={500}
      >
        <XAI />
      </Drawer>
    </div>
  );
}
