import React from "react";
import { Button } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import { history } from "../routers/AppRouter";
import Logo from "./Logo";
import "../styles/components/lobby.scss";

export default function Lobby() {
  return (
    <div className="lobby">
      <Logo />
      <div>
        <Button
          type="primary"
          icon={<UserOutlined />}
          className="lobby-btn"
          shape="round"
          size="large"
          onClick={() => {
            history.push(`/recommender`);
          }}
        >
          Individual
        </Button>
        <Button
          type="primary"
          icon={<TeamOutlined />}
          className="lobby-btn"
          shape="round"
          size="large"
          onClick={() => {
            history.push(`/group`);
          }}
        >
          Create Group
        </Button>
      </div>
    </div>
  );
}
