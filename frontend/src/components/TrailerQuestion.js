import React from "react";
import ReactPlayer from "react-player";
import MOVIE1 from "../assets/img/24movie-posters8-superJumbo.jpeg";
import MOVIE2 from "../assets/img/61gtGlalRvL._AC_SY679_.jpg";
import MOVIE3 from "../assets/img/moonlight-ver2-xlg.jpeg";
import MOVIE4 from "../assets/img/rons-gone-wrong-movie-poster-6515.jpeg";

export default function TrailerQuestion() {
  return (
    <div className="dashboard-inner">
      <h1>
        Q1: Lorem ipsum is placeholder text commonly used in the graphic, print,
        and publishing industries for previewing layouts and visual mockups.
      </h1>
      <div className="answers">
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=WzV6mXIOVl4&ab_channel=JoBloMovieTrailers"
            width="100%"
            height="100%"
            controls={false}
          />
        </div>
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=9NJj12tJzqc&ab_channel=A24"
            width="100%"
            height="100%"
            controls={false}
          />
        </div>
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=zAGVQLHvwOY&ab_channel=WarnerBros.Pictures"
            width="100%"
            height="100%"
            controls={false}
          />
        </div>
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=mYfJxlgR2jw&ab_channel=Pixar"
            width="100%"
            height="100%"
            controls={false}
          />
        </div>
      </div>
    </div>
  );
}
