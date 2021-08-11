import React from "react";

export default function Question({ data, getQuestion, answerPosters, qNum }) {
  const question = `Do you like '${data.feature}' movies?`;
  return (
    <div className="dashboard-inner">
      <h1>{question}</h1>
      <div className="answers">
        <h1 className="answer yes" onClick={() => getQuestion(data, "Right")}>
          Yes!
          <div className="answer-img">
            {answerPosters
              .slice((qNum - 1) * 4, (qNum - 1) * 4 + 2)
              .map((el) => {
                return (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${el}`}
                    alt={el}
                    key={el}
                  />
                );
              })}
          </div>
        </h1>
        <h1 className="answer no" onClick={() => getQuestion(data, "Left")}>
          No!
          <div className="answer-img">
            {answerPosters
              .slice((qNum - 1) * 4 + 2, qNum * (4 + 1))
              .map((el) => {
                return (
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${el}`}
                    alt={el}
                    key={el}
                  />
                );
              })}
          </div>
        </h1>
      </div>
    </div>
  );
}
