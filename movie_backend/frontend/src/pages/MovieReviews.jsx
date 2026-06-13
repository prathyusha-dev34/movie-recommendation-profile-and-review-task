import React, { useEffect, useState } from "react";
import API from "../services/api";

function MovieReviews() {
  const movieId = 1; // Change this later to dynamic movie id

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [averageRating, setAverageRating] = useState(0);

  // Load reviews and average rating
  const fetchReviews = async () => {
    try {
      const reviewsRes = await API.get(
        `/reviews/${movieId}`
      );

      setReviews(reviewsRes.data);

      const avgRes = await API.get(
        `/reviews/${movieId}/average`
      );

      setAverageRating(
        avgRes.data.average_rating
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit Review
  const handleSubmit = async () => {
    try {
      await API.post(
        `/reviews/${movieId}`,
        {
          rating,
          comment,
        }
      );

      alert("Review added successfully");

      setComment("");
      setRating(5);

      fetchReviews();
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          "Error submitting review"
      );
    }
  };

  return (
    <div className="page">
      <h1>Movie Reviews & Ratings</h1>

      <h3>
        Average Rating: ⭐ {averageRating}
      </h3>

      <div
        style={{
          border: "1px solid #ddd",
          padding: "20px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      >
        <h3>Add Review</h3>

        <label>Rating</label>

        <br />

        <select
          value={rating}
          onChange={(e) =>
            setRating(Number(e.target.value))
          }
        >
          <option value={1}>⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
        </select>

        <br />
        <br />

        <textarea
          rows="4"
          cols="50"
          placeholder="Write your review..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />

        <br />
        <br />

        <button onClick={handleSubmit}>
          Submit Review
        </button>
      </div>

      <h2>All Reviews</h2>

      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
            }}
          >
            <h4>
              {"⭐".repeat(review.rating)}
            </h4>

            <p>{review.comment}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MovieReviews;