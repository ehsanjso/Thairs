import React from "react";
import "../styles/components/group-answer.scss";

export default function GroupAnswer({ group, isLeaf, userToken }) {
  return (
    <div className="group-answer">
      {group.map((user, i) => {
        const qs = [...Array(user.question + 1).keys()];
        const isYou = user.token === userToken;
        return (
          <div className="user">
            <div className="q-answer">
              {qs.map((q) => {
                const currQ = q === user.question;
                return (
                  <span
                    className={`q-answer-bubble ${currQ ? "active" : ""} ${
                      isYou && currQ && isLeaf ? "leaf" : ""
                    }`}
                  ></span>
                );
              })}
            </div>
            <p className={`${isYou ? "you" : ""}`}>
              {isYou ? "You" : `user ${i + 1}`}
            </p>
          </div>
        );
      })}
    </div>
  );
}
