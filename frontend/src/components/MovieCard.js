import React from "react";
import "../styles/components/movie-card.scss";

export default function MovieCard({ data }) {
  console.log(data);
  return (
    <div className="card-movie-wrapper card-movie-wrapper--centered">
      <div className="card-movie card-movie--light card-movie--looper card-movie--active">
        <img src={data.image} alt={data.title} className="card-movie__img" />
        <div className="card-movie__content">
          <div className="card-movie__title">{data.title}</div>

          <div className="card-movie__details">
            <span className="card-movie__details-item">{data.year}</span>

            <span className="card-movie__details-item">
              {data.runtimeMins} mins
            </span>

            <ul className="card-movie__details-item card-movie__details-list">
              {data.genreList.map((el) => (
                <li key={el.value}>{el.value}</li>
              ))}
            </ul>
          </div>

          <div className="card-movie__description">
            <p>{data.plot}</p>
          </div>
        </div>

        <div className="card-movie__rating">{data.imDbRating}</div>
      </div>

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
    </div>
  );
}
