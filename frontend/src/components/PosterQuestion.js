import React from "react";
import MOVIE1 from "../assets/img/24movie-posters8-superJumbo.jpeg";
import MOVIE2 from "../assets/img/61gtGlalRvL._AC_SY679_.jpg";
import MOVIE3 from "../assets/img/moonlight-ver2-xlg.jpeg";
import MOVIE4 from "../assets/img/rons-gone-wrong-movie-poster-6515.jpeg";

export default function PosterQuestion() {
  return (
    <div className="dashboard-inner">
      <h1>
        Q1: Lorem ipsum is placeholder text commonly used in the graphic, print,
        and publishing industries for previewing layouts and visual mockups.
      </h1>
      <div className="answers">
        <img src={MOVIE1} alt="movie1"></img>
        <img src={MOVIE2} alt="movie2"></img>
        <img src={MOVIE3} alt="movie3"></img>
        <img src={MOVIE4} alt="movie4"></img>
      </div>
    </div>
  );
}
