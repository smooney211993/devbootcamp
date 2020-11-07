import React, { useState } from 'react';

const AddRating = ({ color, value, setRating }) => {
  return (
    <div className='rating add-rating'>
      <span>
        <i
          onClick={() => setRating(1)}
          style={{ color }}
          className={
            value >= 1
              ? 'fas fa-star'
              : value >= 0.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }></i>
      </span>
      <span>
        <i
          onClick={() => setRating(2)}
          style={{ color }}
          className={
            value >= 2
              ? 'fas fa-star'
              : value >= 1.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }></i>
      </span>
      <span>
        <i
          onClick={() => setRating(3)}
          style={{ color }}
          className={
            value >= 3
              ? 'fas fa-star'
              : value >= 2.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }></i>
      </span>
      <span>
        <i
          onClick={() => setRating(4)}
          style={{ color }}
          className={
            value >= 4
              ? 'fas fa-star'
              : value >= 3.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }></i>
      </span>
      <span>
        <i
          onClick={() => setRating(5)}
          style={{ color }}
          className={
            value >= 5
              ? 'fas fa-star'
              : value >= 4.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }></i>
      </span>
      <span>
        <i
          onClick={() => setRating(6)}
          style={{ color }}
          className={
            value >= 6
              ? 'fas fa-star'
              : value >= 5.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }></i>
      </span>
      <span>
        <i
          onClick={() => setRating(7)}
          style={{ color }}
          className={
            value >= 7
              ? 'fas fa-star'
              : value >= 6.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }></i>
      </span>
      <span>
        <i
          onClick={() => setRating(8)}
          style={{ color }}
          className={
            value >= 8
              ? 'fas fa-star'
              : value >= 7.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }></i>
      </span>
      <span>
        <i
          onClick={() => setRating(9)}
          style={{ color }}
          className={
            value >= 9
              ? 'fas fa-star'
              : value >= 8.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }></i>
      </span>
      <span>
        <i
          onClick={() => setRating(10)}
          style={{ color }}
          className={
            value >= 10
              ? 'fas fa-star'
              : value >= 9.5
              ? 'fas fa-star-half-alt'
              : 'far fa-star'
          }></i>
      </span>
    </div>
  );
};

AddRating.defaultProps = {
  color: '#f8e825',
};

export default AddRating;
