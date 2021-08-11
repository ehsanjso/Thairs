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
  const [answerPosters, setAnswerPosters] = useState([]);
  const [movie, setMovie] = useState(undefined);
  const [qNum, setQNum] = useState(0);
  const [tree, setTree] = useState([]);
  const [movieNum, setMovieNum] = useState(undefined);
  //   const [initiated, setInitiated] = useState(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const res = await axios.get(`${host}/requestRoot`);
    setQuestion(res.data);
    setQNum((prevState) => prevState + 1);

    getMoviePosters(res.data.feature);

    const result = await axios.get(`${host}/requestTree`);
    setTree(result.data.tree);
  };

  const getMoviePosters = async (genre) => {
    const moviesGenre = await axios.get(
      `${host}/requestMovieByGenre/${genre}/2`
    );

    const moviesNotGenre = await axios.get(
      `${host}/requestMovieByNotGenre/${genre}/2`
    );
    const fetchData = async (id) => {
      const data = await axios.get(
        `//api.themoviedb.org/3/movie/${id}?api_key=b810a93cc9b9a1cb3b2a0011362ee850`
      );
      setAnswerPosters((previousState) => [
        ...previousState,
        data.data.poster_path,
      ]);
    };

    R.values(moviesGenre.data).forEach((id) => fetchData(id));
    R.values(moviesNotGenre.data).forEach((id) => fetchData(id));
  };

  const getQuestion = (data, direction) => {
    async function getData() {
      const res = await axios.get(`${host}/request${direction}/${data.node}`);
      setQuestion(res.data);
      setQNum((prevState) => prevState + 1);
      getMoviePosters(res.data.feature);
      if (res.data.isLeaf) {
        getMovie(undefined, true);
      }
      if (res.data.node) {
        let newArr = [...answers];
        newArr.push(res.data.node);
        setAnswers(newArr);
      }
    }
    getData();
  };

  const getMovie = (direction = "next", firstCall = false) => {
    if (firstCall) {
      setMovieNum(0);
    } else {
      const newVal = direction === "next" ? movieNum + 1 : movieNum - 1;
      const val = newVal < 0 ? 0 : newVal;
      setMovieNum(val);
    }
  };

  useEffect(() => {
    if (question) {
      async function getData() {
        const result = await axios.get(
          `${host}/requestMovie/${question.cluster}/${movieNum}`
        );
        const movie = await axios.get(
          `//api.themoviedb.org/3/movie/${result.data.tmdbId}?api_key=b810a93cc9b9a1cb3b2a0011362ee850`
        );
        setMovie(movie.data);
      }
      getData();
    }
  }, [movieNum]);

  const clear = () => {
    setAnswerPosters([]);
    setQuestion(undefined);
    setAnswers([]);
    setMovie(undefined);
    setQNum(0);
    setTree([]);
    setMovieNum(undefined);
    init();
  };

  return (
    <QuestionContext.Provider
      value={{
        question,
        getQuestion,
        movie,
        qNum,
        tree,
        answers,
        getMovie,
        movieNum,
        clear,
        answerPosters,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
}
