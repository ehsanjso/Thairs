import React from "react";

export default function TaglineQuestion({ data, getQuestion }) {
  const question = `Do you like '${data.feature}' movies?`;
  return (
    <div className="dashboard-inner">
      <h1>{question}</h1>
      <div className="answers">
        <h1 className="answer" onClick={() => getQuestion(data, "Left")}>
          Yes!
        </h1>
        <h1 className="answer" onClick={() => getQuestion(data, "Right")}>
          No!
        </h1>
      </div>
    </div>
  );
}
