import React from "react";
import "../styles/components/movie-card.scss";
import Feedback from "./Feedback";

export default function MovieCard({ data, getMovie, movieNum }) {
  return (
    <div className="card-movie-wrapper card-movie-wrapper--centered">
      <div className="card-movie card-movie--light card-movie--looper card-movie--active">
        <img
          src={`https://image.tmdb.org/t/p/w500/${data.poster_path}`}
          alt={data.title}
          className="card-movie__img"
        />
        <div className="card-movie__content">
          <div className="card-movie__title">{data.title}</div>

          <div className="card-movie__details">
            {/* <span className="card-movie__details-item">{data.year}</span> */}

            <span className="card-movie__details-item">
              {data.runtime} mins
            </span>

            <ul className="card-movie__details-item card-movie__details-list">
              {data.genres.map((el) => (
                <li key={el.name}>{el.name}</li>
              ))}
            </ul>

            <span>Popularity: {parseInt(data.popularity)}%</span>
          </div>

          <div className="card-movie__description">
            <p>{data.overview}</p>
          </div>
        </div>

        <div className="card-movie__rating">
          Ranking: <span>{movieNum + 1}</span>
        </div>
      </div>
      <a className="link" href="#" onClick={() => getMovie("next")}>
        <span className="link__arrow">
          <span></span>
          <span></span>
        </span>
        <span className="link__line"></span>
        <span className="link__text">Next Movie</span>
      </a>
      <a className="link reverse" href="#" onClick={() => getMovie("previous")}>
        <span className="link__arrow">
          <span></span>
          <span></span>
        </span>
        <span className="link__line"></span>
        <span className="link__text">Previous Movie</span>
      </a>

      {/* <div className="card-movie card-movie--light card-movie--interstellar">
          <div className="card-movie__content">
            <div className="card-movie__title">Interstellar</div>

            <div className="card-movie__details">
              <span className="card-movie__details-item">2014</span>

              <span className="card-movie__details-item">169 mins</span>

              <ul className="card-movie__details-item card-movie__details-list">
                <li>Adventure</li>
                <li>Drama</li>
                <li>Sci-fi</li>
              </ul>
            </div>

            <div className="card-movie__description">
              <p>
                With our time on Earth coming to an end, a team of explorers
                undertakes the most important mission in human history;
                traveling beyond this galaxy to discover whether mankind has a
                future among the stars.
              </p>
            </div>
          </div>

          <div className="card-movie__rating">8.7</div>

          <div className="card-movie__player" data-trailer="3WzHXI5HizQ"></div>
        </div> */}

      <Feedback />
    </div>
  );
}
