import React, { useContext, useState, useEffect, useCallback } from "react";
import * as R from "ramda";
import axios from "axios";
import { host } from "../actions/consts/host";
import { changeFetchInProg } from "../actions/fetchInProgress";

const QuestionContext = React.createContext();

export function useQuestion() {
  return useContext(QuestionContext);
}

export function QuestionProvider({ children, user }) {
  const [question, setQuestion] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  //   const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    async function getData() {
      //   dispatch(changeFetchInProg(true));
      const res = await axios.get(`${host}/requestRoot`);
      setQuestion(res.data);
      //   dispatch(changeFetchInProg(false));
      //   setInitiated(true);
    }
    getData();
  }, []);

  const getQuestion = (data, direction) => {
    async function getData() {
      const res = await axios.get(`${host}/request${direction}/${data.node}`);
      if (res.data.isLeaf) {
        const result = await axios.get(
          `${host}/requestMovie/${res.data.cluster}`
        );
        const movie = await axios.get(
          `//imdb-api.com/en/API/Title/k_6pfirb1l/tt${String(
            result.data.imdbId
          ).padStart(7, 0)}`
        );
        setMovie(movie.data);
      } else {
        setQuestion(res.data);
      }
    }
    getData();
  };

  return (
    <QuestionContext.Provider value={{ question, getQuestion, movie }}>
      {children}
    </QuestionContext.Provider>
  );
}
