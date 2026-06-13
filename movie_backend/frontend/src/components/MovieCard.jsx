import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const navigate = useNavigate();

  // ADD TO FAVORITES
  const addToFavorites = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first ❌");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/favorites/",
        {
          movie_title: movie.title,
          genre: movie.genre,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response.data.message ||
        "Added to favorites ❤️"
      );
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );
      alert("Favorite failed ❌");
    }
  };

  // OPEN REVIEWS PAGE
  const openReviews = () => {
    navigate(`/reviews/${movie.id}`);
  };

  return (
    <div className="movie-card">
      <img
        src={movie.poster}
        alt={movie.title}
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <p className="genre">
          {movie.genre}
        </p>

        <p>{movie.reason}</p>

        <button
          className="fav-btn"
          onClick={addToFavorites}
        >
          ❤️ Favorite
        </button>

        <br />
        <br />

        <button
          className="review-btn"
          onClick={openReviews}
        >
          ⭐ Reviews & Ratings
        </button>
      </div>
    </div>
  );
}

export default MovieCard;