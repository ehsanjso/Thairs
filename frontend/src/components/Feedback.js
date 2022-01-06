import React from "react";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import { useGroup } from "../contexts/GroupProvider";
import "../styles/components/feedback.scss";
import { Button } from "antd";

export default function Feedback() {
  const { updateMovieFeedback, hasStar } = useGroup();

  return (
    <div className="feedback">
      <div className="feedback-star">
        Do you like the recommendation?
        <div className="star-btn" onClick={() => updateMovieFeedback()}>
          {hasStar ? <StarFilled className="star" /> : <StarOutlined />}
        </div>
      </div>

      <Button
        type="link"
        href="https://qfreeaccountssjc1.az1.qualtrics.com/jfe/form/SV_9vHkUTG9UfhjqDA"
      >
        Take the survey
      </Button>
    </div>
  );
}
