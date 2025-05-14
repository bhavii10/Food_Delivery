import React, { useState } from 'react';
import './review.css';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [inputName, setInputName] = useState('');
  const [inputReview, setInputReview] = useState('');

  const handlePostReview = () => {
    if (inputName.trim() === '' || inputReview.trim() === '') {
      alert('Please fill both Name and Review!');
      return;
    }

    const newReview = {
      name: inputName,
      review: inputReview
    };

    setReviews([newReview, ...reviews]);
    setInputName('');
    setInputReview('');
  };

  return (
    <div className="review-page">

      <section className="review-section">
        <h2>Write Your Review</h2>

        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          placeholder="Your Name"
          className="input-name"
        />

        <textarea
          value={inputReview}
          onChange={(e) => setInputReview(e.target.value)}
          placeholder="Share your experience..."
          className="input-review"
        />

        <button onClick={handlePostReview}>Post Review</button>

        <div className="reviews">
          {reviews.map((r, index) => (
            <div key={index} className="review">
              <h4>{r.name}</h4>
              <p>{r.review}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReviewPage;
