import React, { useState } from "react";
import { Drawer, Progress } from "antd";
import {
  RadarChartOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import PosterQuestion from "./PosterQuestion";
import TaglineQuestion from "./TaglineQuestion";
import TrailerQuestion from "./TrailerQuestion";
import WordCloudQuestions from "./WordCloudQuestions";
import Question from "./Question";
import Logo from "./Logo";
import XAI from "./XAI";
import Gauge from "./Gauge";
import { useQuestion } from "../contexts/QuestionProvider";
import "../styles/components/dashboard.scss";
import MovieCard from "./MovieCard";

export default function RecommenderDashboard() {
  const [visible, setVisible] = useState(false);
  const { question, getQuestion, movie, qNum } = useQuestion();
  //   const movie = {
  //     id: "tt0110057",
  //     title: "Hoop Dreams",
  //     originalTitle: "",
  //     fullTitle: "Hoop Dreams (1994)",
  //     type: "Movie",
  //     year: "1994",
  //     image:
  //       "https://imdb-api.com/images/original/MV5BMWMxNDAxN2QtMjQxYS00NzI4LWJlMTctOGJkNTdkNmMyYmJiXkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_Ratio0.6904_AL_.jpg",
  //     releaseDate: "1994-10-13",
  //     runtimeMins: "170",
  //     runtimeStr: "2h 50min",
  //     plot: "This documentary follows two young African-Americans through their high school years as they perfect their skills in basketball in the hopes of getting a college scholarship and eventually play in the NBA. Arthur Agee and William Gates both show great potential and are are actively recruited as they look to enter high school. They start off at the same high school but unable to pay an unexpected bill for tuition fees, Arthur has to withdraw and go to the local public high school. The film follows them through their four years of high school and their trials and tribulations: injuries, slumps and the never ending battle to maintain their grades. Through it all, their hoop dreams continue.",
  //     plotLocal: "",
  //     plotLocalIsRtl: false,
  //     awards: "Nominated for 1 Oscar22 wins & 9 nominations total",
  //     directors: "Steve James",
  //     directorList: [
  //       {
  //         id: "nm0416945",
  //         name: "Steve James",
  //       },
  //     ],
  //     writers: "Steve James, Frederick Marx",
  //     writerList: [
  //       {
  //         id: "nm0416945",
  //         name: "Steve James",
  //       },
  //       {
  //         id: "nm0555610",
  //         name: "Frederick Marx",
  //       },
  //     ],
  //     stars: "William Gates, Arthur Agee, Emma Gates",
  //     starList: [
  //       {
  //         id: "nm0309637",
  //         name: "William Gates",
  //       },
  //       {
  //         id: "nm0012932",
  //         name: "Arthur Agee",
  //       },
  //       {
  //         id: "nm0309558",
  //         name: "Emma Gates",
  //       },
  //     ],
  //     actorList: [
  //       {
  //         id: "nm0309637",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMjAwMTI2MjU4MF5BMl5BanBnXkFtZTcwMzc4NTc0NA@@._V1_Ratio1.4545_AL_.jpg",
  //         name: "William Gates",
  //         asCharacter: "Self",
  //       },
  //       {
  //         id: "nm0012932",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTg5MzA3NTE2Nl5BMl5BanBnXkFtZTcwNjc4NTc0NA@@._V1_Ratio0.7273_AL_.jpg",
  //         name: "Arthur Agee",
  //         asCharacter: "Self",
  //       },
  //       {
  //         id: "nm0309558",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Emma Gates",
  //         asCharacter: "Self - William's Mother",
  //       },
  //       {
  //         id: "nm0309548",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Curtis Gates",
  //         asCharacter: "Self - William's Brother",
  //       },
  //       {
  //         id: "nm0012947",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTQ2MzU2NDY5OF5BMl5BanBnXkFtZTgwNDIyODEwMTE@._V1_Ratio0.7273_AL_.jpg",
  //         name: "Sheila Agee",
  //         asCharacter: "Self - Arthur's Mother",
  //       },
  //       {
  //         id: "nm0012933",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Arthur 'Bo' Agee",
  //         asCharacter: "Self - Arthur's Father",
  //       },
  //       {
  //         id: "nm0808066",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Earl Smith",
  //         asCharacter: "Self - Talent Scout",
  //       },
  //       {
  //         id: "nm0684161",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Gene Pingatore",
  //         asCharacter: "Self - High School Basketball Coach",
  //       },
  //       {
  //         id: "nm0858946",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMjE5NzQxNDY5Nl5BMl5BanBnXkFtZTgwNDUyMzU1MjE@._V1_Ratio1.3182_AL_.jpg",
  //         name: "Isiah Thomas",
  //         asCharacter: "Self - Professional Basketball Player",
  //       },
  //       {
  //         id: "nm0394070",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Marlyn Hopewell",
  //         asCharacter:
  //           "Self - High School Guidance Counselor (as Sister Marlyn Hopewell)",
  //       },
  //       {
  //         id: "nm0322287",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BOTZhMzIwMjItOTllNS00MGY3LWJiOGEtMzcyNDA4YzVmZGI1XkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_Ratio0.7273_AL_.jpg",
  //         name: "Bill Gleason",
  //         asCharacter: "Self - Television Reporter",
  //       },
  //       {
  //         id: "nm0918623",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Patricia Weir",
  //         asCharacter: "Self - President: Encyclopedia Brittanica",
  //       },
  //       {
  //         id: "nm0372460",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Marjorie Heard",
  //         asCharacter: "Self - High School Guidance Counselor",
  //       },
  //       {
  //         id: "nm0066042",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Luther Bedford",
  //         asCharacter: "Self - High School Basketball Coach",
  //       },
  //       {
  //         id: "nm0593136",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Aretha Mitchell",
  //         asCharacter: "Self - High School Guidance Counselor",
  //       },
  //       {
  //         id: "nm3565417",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Shannon Johnson",
  //         asCharacter: "Self - Arthur's Friend",
  //       },
  //       {
  //         id: "nm0012952",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Tomika Agee",
  //         asCharacter: "Self - Arthur's Sister",
  //       },
  //       {
  //         id: "nm0012941",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Joe 'Sweetie' Agee",
  //         asCharacter: "Self - Arthur's Brother",
  //       },
  //       {
  //         id: "nm0012939",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Jazz Agee",
  //         asCharacter: "Self - Tomika's Daughter and Arthur's Niece",
  //       },
  //       {
  //         id: "nm0591192",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Catherine Mines",
  //         asCharacter: "Self - William's Girlfriend",
  //       },
  //       {
  //         id: "nm0591190",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Alicia Mines",
  //         asCharacter: "Self - William's Daughter",
  //       },
  //       {
  //         id: "nm0080838",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Alvin Bibbs",
  //         asCharacter: "Self - William's Brother-in-Law",
  //       },
  //       {
  //         id: "nm0309639",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Willie Gates",
  //         asCharacter: "Self - William's Father",
  //       },
  //       {
  //         id: "nm0446447",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "James Kelly",
  //         asCharacter: "Self - High School Teacher and Registrar",
  //       },
  //       {
  //         id: "nm0639413",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Michael O'Brie",
  //         asCharacter: "Self - High School Finance Director",
  //       },
  //       {
  //         id: "nm0899866",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTkzMDc3NDIwNl5BMl5BanBnXkFtZTYwOTEwNDA2._V1_Ratio0.7273_AL_.jpg",
  //         name: "Dick Vitale",
  //         asCharacter: "Self - Television Sports Commentator",
  //       },
  //       {
  //         id: "nm0642224",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Kevin O'Neill",
  //         asCharacter: "Self - Marquette University Head Basketball Coach",
  //       },
  //       {
  //         id: "nm0460820",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTEyNTJjNGItYzhiMi00M2Y0LTkxZTEtZGNmYjIxMWFjZjVhXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_Ratio0.7273_AL_.jpg",
  //         name: "Bobby Knight",
  //         asCharacter: "Self - Indiana University Head Basketball Coach",
  //       },
  //       {
  //         id: "nm0583205",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Joey Meyer",
  //         asCharacter: "Self - DePaul University Head Basketball Coach",
  //       },
  //       {
  //         id: "nm0239411",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Frank DuBois",
  //         asCharacter: "Self - Camp Academic Director",
  //       },
  //       {
  //         id: "nm0000490",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTgyMTEyNDgxOF5BMl5BanBnXkFtZTcwNTkzMTA3Nw@@._V1_Ratio0.7273_AL_.jpg",
  //         name: "Spike Lee",
  //         asCharacter: "Self - Film Director",
  //       },
  //       {
  //         id: "nm0254726",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Bo Ellis",
  //         asCharacter: "Self - Marquette University Assistant Basketball Coach",
  //       },
  //       {
  //         id: "nm0316533",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Bob Gibbons",
  //         asCharacter: "Self - Basketball Scout",
  //       },
  //       {
  //         id: "nm0236342",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Dennis Doyle",
  //         asCharacter: "Self - High School Assistant Basketball Coach",
  //       },
  //       {
  //         id: "nm0916065",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Clarence Webb",
  //         asCharacter: "Self - High School Science Teacher",
  //       },
  //       {
  //         id: "nm0934160",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Stan Wilson",
  //         asCharacter: "Self - Basketball Scout",
  //       },
  //       {
  //         id: "nm0957027",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Derrick Zinneman",
  //         asCharacter: "Self - High School Basketball Player",
  //       },
  //       {
  //         id: "nm8604239",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Tim Gray",
  //         asCharacter: "Self - Junior College Basketball Coach",
  //       },
  //       {
  //         id: "nm0330475",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Myron Gordon",
  //         asCharacter: "Self - Junior College Basketball Player",
  //       },
  //       {
  //         id: "nm0416945",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BODMyMDIzNTM2NF5BMl5BanBnXkFtZTYwOTIwMjk1._V1_Ratio0.7273_AL_.jpg",
  //         name: "Steve James",
  //         asCharacter: "Narrator",
  //       },
  //       {
  //         id: "nm0258275",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Elijiah Ephraim",
  //         asCharacter: "Self",
  //       },
  //       {
  //         id: "nm0026679",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Eric Anderson",
  //         asCharacter: "Self (uncredited)",
  //       },
  //       {
  //         id: "nm0187357",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Bobby Cremins",
  //         asCharacter: "Self (uncredited)",
  //       },
  //       {
  //         id: "nm0397423",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Juwan Howard",
  //         asCharacter: "Self (uncredited)",
  //       },
  //       {
  //         id: "nm0473111",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTk5Nzc2NzgyNV5BMl5BanBnXkFtZTcwMjc2NDMxNw@@._V1_Ratio0.7273_AL_.jpg",
  //         name: "Mike Krzyzewski",
  //         asCharacter: "Self (uncredited)",
  //       },
  //       {
  //         id: "nm0685704",
  //         image: "https://imdb-api.com/images/original/nopicture.jpg",
  //         name: "Rick Pitino",
  //         asCharacter: "Self (uncredited)",
  //       },
  //       {
  //         id: "nm0741448",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTYxNTM2NjA2Nl5BMl5BanBnXkFtZTcwNTgyMzc4Mg@@._V1_Ratio0.7273_AL_.jpg",
  //         name: "Jalen Rose",
  //         asCharacter: "Self (uncredited)",
  //       },
  //       {
  //         id: "nm0860321",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BNzNiOTRjZjAtMGE0MS00OWU0LTk1NTgtNTYzYWVkM2Y0NGE0XkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_Ratio0.7727_AL_.jpg",
  //         name: "John Thompson",
  //         asCharacter: "Self (uncredited)",
  //       },
  //       {
  //         id: "nm0916357",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTQ5NDQzMTA1MF5BMl5BanBnXkFtZTgwOTg3NzcxNDE@._V1_Ratio0.7273_AL_.jpg",
  //         name: "Chris Webber",
  //         asCharacter: "Self (uncredited)",
  //       },
  //     ],
  //     fullCast: null,
  //     genres: "Documentary, Drama, Sport",
  //     genreList: [
  //       {
  //         key: "Documentary",
  //         value: "Documentary",
  //       },
  //       {
  //         key: "Drama",
  //         value: "Drama",
  //       },
  //       {
  //         key: "Sport",
  //         value: "Sport",
  //       },
  //     ],
  //     companies: "KTCA Minneapolis, Kartemquin Films",
  //     companyList: [
  //       {
  //         id: "co0106797",
  //         name: "KTCA Minneapolis",
  //       },
  //       {
  //         id: "co0076348",
  //         name: "Kartemquin Films",
  //       },
  //     ],
  //     countries: "USA",
  //     countryList: [
  //       {
  //         key: "USA",
  //         value: "USA",
  //       },
  //     ],
  //     languages: "English",
  //     languageList: [
  //       {
  //         key: "English",
  //         value: "English",
  //       },
  //     ],
  //     contentRating: "PG-13",
  //     imDbRating: "8.3",
  //     imDbRatingVotes: "24892",
  //     metacriticRating: "98",
  //     ratings: null,
  //     wikipedia: null,
  //     posters: {
  //       imDbId: "tt0110057",
  //       title: "Hoop Dreams",
  //       fullTitle: "Hoop Dreams (1994)",
  //       type: "Movie",
  //       year: "1994",
  //       posters: [
  //         {
  //           id: "7qHwh3mFJs7ldwzGSWsBLmgecfj.jpg",
  //           link: "https://imdb-api.com/posters/original/7qHwh3mFJs7ldwzGSWsBLmgecfj.jpg",
  //           aspectRatio: 0.6666666666666666,
  //           language: "en",
  //           width: 800,
  //           height: 1200,
  //         },
  //         {
  //           id: "1CulvqUUheF82WJX88d7UO7VETY.jpg",
  //           link: "https://imdb-api.com/posters/original/1CulvqUUheF82WJX88d7UO7VETY.jpg",
  //           aspectRatio: 0.6666666666666666,
  //           language: "en",
  //           width: 1000,
  //           height: 1500,
  //         },
  //         {
  //           id: "gLzHl2XBtVwycl8DxdOXRHPm8G3.jpg",
  //           link: "https://imdb-api.com/posters/original/gLzHl2XBtVwycl8DxdOXRHPm8G3.jpg",
  //           aspectRatio: 0.6666666666666666,
  //           language: "en",
  //           width: 1400,
  //           height: 2100,
  //         },
  //         {
  //           id: "uKspEZ5hdyabGHREYBqxIhyOH86.jpg",
  //           link: "https://imdb-api.com/posters/original/uKspEZ5hdyabGHREYBqxIhyOH86.jpg",
  //           aspectRatio: 0.6666666666666666,
  //           language: "en",
  //           width: 1000,
  //           height: 1500,
  //         },
  //         {
  //           id: "fggwrLEEWg9DEegIr8NQASGuW9.jpg",
  //           link: "https://imdb-api.com/posters/original/fggwrLEEWg9DEegIr8NQASGuW9.jpg",
  //           aspectRatio: 0.6912991656734208,
  //           language: "en",
  //           width: 580,
  //           height: 839,
  //         },
  //       ],
  //       backdrops: [
  //         {
  //           id: "dLZ6XJP5VpeifymHkobzT5s5s1L.jpg",
  //           link: "https://imdb-api.com/posters/original/dLZ6XJP5VpeifymHkobzT5s5s1L.jpg",
  //           aspectRatio: 1.7777777777777777,
  //           language: "en",
  //           width: 1280,
  //           height: 720,
  //         },
  //         {
  //           id: "I42Kbb4eaa5Y4FcvZJ0uXxCRC9.jpg",
  //           link: "https://imdb-api.com/posters/original/I42Kbb4eaa5Y4FcvZJ0uXxCRC9.jpg",
  //           aspectRatio: 1.7777777777777777,
  //           language: "en",
  //           width: 3840,
  //           height: 2160,
  //         },
  //       ],
  //       errorMessage: "",
  //     },
  //     images: null,
  //     trailer: null,
  //     boxOffice: {
  //       budget: "$700,000 (estimated)",
  //       openingWeekendUSA: "$18,396",
  //       grossUSA: "$7,830,611",
  //       cumulativeWorldwideGross: "$11,830,611",
  //     },
  //     tagline: "An Extraordinary True Story.",
  //     keywords: "basketball,athlete,national film registry,high school,college",
  //     keywordList: [
  //       "basketball",
  //       "athlete",
  //       "national film registry",
  //       "high school",
  //       "college",
  //     ],
  //     similars: [
  //       {
  //         id: "tt0118147",
  //         title: "When We Were Kings",
  //         fullTitle: "When We Were Kings",
  //         year: "",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTQ4NjU3MzI3NF5BMl5BanBnXkFtZTgwMjYyODU3MDI@._V1_Ratio0.6763_AL_.jpg",
  //         plot: "",
  //         directors: "",
  //         stars: "",
  //         genres: "",
  //         imDbRating: "8.0",
  //       },
  //       {
  //         id: "tt0109508",
  //         title: "Crumb",
  //         fullTitle: "Crumb",
  //         year: "",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BYTViMDM5YjktMDhjNy00MjZjLTg2ODctOGI3MzkzYWNiODA0XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_Ratio0.6763_AL_.jpg",
  //         plot: "",
  //         directors: "",
  //         stars: "",
  //         genres: "",
  //         imDbRating: "8.0",
  //       },
  //       {
  //         id: "tt0096257",
  //         title: "The Thin Blue Line",
  //         fullTitle: "The Thin Blue Line",
  //         year: "",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTE3MTViMDUtNjkxYy00NWY2LTg5MzEtYjFiNzRkMTgwYTJmXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6763_AL_.jpg",
  //         plot: "",
  //         directors: "",
  //         stars: "",
  //         genres: "",
  //         imDbRating: "8.0",
  //       },
  //       {
  //         id: "tt2382298",
  //         title: "Life Itself",
  //         fullTitle: "Life Itself",
  //         year: "",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTQ2OTQzMjcxNF5BMl5BanBnXkFtZTgwMzc2Njk3MTE@._V1_Ratio0.6763_AL_.jpg",
  //         plot: "",
  //         directors: "",
  //         stars: "",
  //         genres: "",
  //         imDbRating: "7.8",
  //       },
  //       {
  //         id: "tt5593872",
  //         title: "Life After Hoop Dreams",
  //         fullTitle: "Life After Hoop Dreams",
  //         year: "",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BZGJkODNhYTQtMWZmZC00NTQ1LWJlNGMtOGJiZWMwM2I4YzI2XkEyXkFqcGdeQXVyNjgwNjk1NjY@._V1_Ratio0.7150_AL_.jpg",
  //         plot: "",
  //         directors: "",
  //         stars: "",
  //         genres: "",
  //         imDbRating: "7.0",
  //       },
  //       {
  //         id: "tt0310793",
  //         title: "Bowling for Columbine",
  //         fullTitle: "Bowling for Columbine",
  //         year: "",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BOWY2OWM1ODEtNDU5OS00MjMwLTliYzItZWZlOTEyYmQ2Njg4XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_Ratio0.6763_AL_.jpg",
  //         plot: "",
  //         directors: "",
  //         stars: "",
  //         genres: "",
  //         imDbRating: "7.9",
  //       },
  //       {
  //         id: "tt0803005",
  //         title: "Hoop Reality",
  //         fullTitle: "Hoop Reality",
  //         year: "",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTMwNTkwMDk1N15BMl5BanBnXkFtZTcwMDA3NzU4Mg@@._V1_Ratio0.6957_AL_.jpg",
  //         plot: "",
  //         directors: "",
  //         stars: "",
  //         genres: "",
  //         imDbRating: "5.4",
  //       },
  //       {
  //         id: "tt5275892",
  //         title: "O.J.: Made in America",
  //         fullTitle: "O.J.: Made in America",
  //         year: "",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BNGNmYmY3OTktMWM1Ni00NTU1LTk0ZjctMDcwYjViMjY0MTIwL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_Ratio0.6763_AL_.jpg",
  //         plot: "",
  //         directors: "",
  //         stars: "",
  //         genres: "",
  //         imDbRating: "8.9",
  //       },
  //       {
  //         id: "tt0427312",
  //         title: "Grizzly Man",
  //         fullTitle: "Grizzly Man",
  //         year: "",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BODc3NTAxMTY1MV5BMl5BanBnXkFtZTcwOTE4NjUzMw@@._V1_Ratio0.6763_AL_.jpg",
  //         plot: "",
  //         directors: "",
  //         stars: "",
  //         genres: "",
  //         imDbRating: "7.8",
  //       },
  //       {
  //         id: "tt0097216",
  //         title: "Do the Right Thing",
  //         fullTitle: "Do the Right Thing",
  //         year: "",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BODA2MjU1NTI1MV5BMl5BanBnXkFtZTgwOTU4ODIwMjE@._V1_Ratio0.6763_AL_.jpg",
  //         plot: "",
  //         directors: "",
  //         stars: "",
  //         genres: "",
  //         imDbRating: "8.0",
  //       },
  //       {
  //         id: "tt0317910",
  //         title: "The Fog of War",
  //         fullTitle: "The Fog of War",
  //         year: "",
  //         image:
  //           "https://imdb-api.com/images/original/MV5BMTc3MTA4NDgzNl5BMl5BanBnXkFtZTcwOTAxNTQyMQ@@._V1_Ratio0.6860_AL_.jpg",
  //         plot: "",
  //         directors: "",
  //         stars: "",
  //         genres: "",
  //         imDbRating: "8.1",
  //       },
  //     ],
  //     tvSeriesInfo: null,
  //     tvEpisodeInfo: null,
  //     errorMessage: "",
  //   };

  const toggleDrawer = () => {
    setVisible((prevState) => !prevState);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="dashboard">
      <Logo />
      <Progress
        percent={movie ? 100 : qNum * 5}
        showInfo={false}
        strokeLinecap="square"
        strokeColor="#ff2e63"
      />
      {question && !movie && (
        <Question data={question} getQuestion={getQuestion} />
      )}
      {movie && <MovieCard data={movie} />}
      {/* <PosterQuestion /> */}
      {/* <TrailerQuestion /> */}
      {/* <TaglineQuestion /> */}
      {/* <WordCloudQuestions /> */}
      {/* <Gauge /> */}
      {/* <div
        className={`note-btn ${visible ? "active" : ""}`}
        onClick={toggleDrawer}
      >
        {visible ? <CaretLeftOutlined /> : <CaretRightOutlined />}
        <RadarChartOutlined />
      </div>
      <Drawer
        title="XAI"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        mask={false}
        width={500}
      >
        <XAI />
      </Drawer> */}
    </div>
  );
}
