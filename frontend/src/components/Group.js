import React from "react";
import { Button, message } from "antd";
import { UserOutlined, CaretRightOutlined } from "@ant-design/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
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
        <CopyToClipboard
          text={`http://165.227.39.61/invitation?group=${groupToken}`}
          onCopy={() => {
            message.info("Copied!");
          }}
        >
          <Button type="link" className="copy">
            Copy Group invitation link!
          </Button>
        </CopyToClipboard>
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
