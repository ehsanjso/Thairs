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
  const [answers, setAnswers] = useState([]);
  const [movie, setMovie] = useState(undefined);
  const [qNum, setQNum] = useState(0);
  const [tree, setTree] = useState([]);
  //   const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    async function getData() {
      const res = await axios.get(`${host}/requestRoot`);
      setQuestion(res.data);
      setQNum(qNum + 1);

      const result = await axios.get(`${host}/requestTree`);
      setTree(result.data.tree);
    }
    getData();
  }, []);

  const getQuestion = (data, direction) => {
    async function getData() {
      const res = await axios.get(`${host}/request${direction}/${data.node}`);
      if (res.data.isLeaf) {
        getMovie(res.data.cluster);
      }
      if (res.data.node) {
        let newArr = [...answers];
        newArr.push(res.data.node);
        setAnswers(newArr);
      }
      setQuestion(res.data);
      setQNum(qNum + 1);
    }
    getData();
  };

  const getMovie = async (cluster) => {
    const result = await axios.get(`${host}/requestMovie/${cluster}`);
    const movie = await axios.get(
      `//api.themoviedb.org/3/movie/${result.data.tmdbId}?api_key=b810a93cc9b9a1cb3b2a0011362ee850`
    );
    setMovie(movie.data);
  };

  return (
    <QuestionContext.Provider
      value={{ question, getQuestion, movie, qNum, tree, answers, getMovie }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
