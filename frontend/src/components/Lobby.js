import React from "react";
import { Button } from "antd";
import { UserOutlined, TeamOutlined } from "@ant-design/icons";
import { history } from "../routers/AppRouter";
import Logo from "./Logo";
import { useGroup } from "../contexts/GroupProvider";
import "../styles/components/lobby.scss";

export default function Lobby() {
  const { setIsGroupCreator, setIsJoining } = useGroup();
  const groupTokenL = JSON.parse(localStorage.getItem("grecom-group"));
  return (
    <div className="lobby">
      <Logo />
      <div>
        {groupTokenL ? (
          <Button
            type="primary"
            icon={<TeamOutlined />}
            className="lobby-btn"
            shape="round"
            size="large"
            onClick={() => {
              setIsJoining(true);
              history.push(`/group`);
            }}
          >
            Join Group
          </Button>
        ) : (
          <>
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
                setIsGroupCreator(true);
                history.push(`/group`);
              }}
            >
              Create Group
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
