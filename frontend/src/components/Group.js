import React from "react";
import { Button, message } from "antd";
import { UserOutlined, CaretRightOutlined } from "@ant-design/icons";
import { history } from "../routers/AppRouter";
import Logo from "./Logo";
import { useGroup } from "../contexts/GroupProvider";
import "../styles/components/group.scss";

export default function Group() {
  const { group, groupToken, userToken, isGroupCreator, start } = useGroup();

  return (
    <div className="group">
      <Logo />
      <p>
        <Button
          type="link"
          onClick={() => {
            navigator.clipboard.writeText(
              `localhost:3000/invitation?group=${groupToken}`
            );
            message.info("Copied!");
          }}
          className="copy"
        >
          Copy Group invitation link!
        </Button>
      </p>
      <div className="group-view">
        {group.map((el) => {
          return (
            <div
              key={el.token}
              className={`${el.token === userToken ? "me" : ""}`}
            >
              <UserOutlined />
            </div>
          );
        })}
      </div>
      {isGroupCreator && (
        <Button
          type="primary"
          icon={<CaretRightOutlined />}
          className="group-btn"
          shape="round"
          size="large"
          onClick={start}
        >
          Start!
        </Button>
      )}
    </div>
  );
}
