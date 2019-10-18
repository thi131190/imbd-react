import React from 'react'

const MovieCard = props => {
  let { title, poster_path, overview } = props.movie
  return (
    <div className='col-md-4'>
      <div className='card mb-4 shadow-sm'>
        <img
          src={`https://image.tmdb.org/t/p/w300${poster_path}`}
          alt={title}
        />
        <div className='card-body'>
          <p className='card-text'>
            {overview}
          </p>
          <div className='d-flex justify-content-between align-items-center'>
            <button className='btn btn-primary btn-block'>See more</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
