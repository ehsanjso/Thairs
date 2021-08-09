import React from "react";

export default function TaglineQuestion({ data, getQuestion }) {
  const question = `Do you like '${data.feature}' movies?`;
  return (
    <div className="dashboard-inner">
      <h1>{question}</h1>
      <div className="answers">
        <h1 className="answer yes" onClick={() => getQuestion(data, "Right")}>
          Yes!
        </h1>
        <h1 className="answer no" onClick={() => getQuestion(data, "Left")}>
          No!
        </h1>
      </div>
    </div>
  );
}
