import React from "react";
import { Button } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import { history } from "../routers/AppRouter";
import Logo from "./Logo";
import "../styles/components/group.scss";

export default function Group() {
  return (
    <div className="lobby">
      <Logo />
      <div>
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
          Start!
        </Button>
      </div>
    </div>
  );
}
