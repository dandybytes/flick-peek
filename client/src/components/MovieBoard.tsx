import React, {FC} from 'react'

import './MovieBoard.scss'

import LoadingIndicator from './common/LoadingIndicator'
import MovieCard from './MovieCard'
import {ITMDBMovieData, url_img_poster} from '../services/tmdbapi'

type MovieBoardProps = {
  movieList: ITMDBMovieData[]
}

const MovieBoard: FC<MovieBoardProps> = ({movieList}) => (
  <div className='movie-board'>
    {!movieList?.length ? (
      <LoadingIndicator />
    ) : (
      <>
        {movieList.map(movie => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            img={movie.poster_path ? url_img_poster + movie.poster_path : ''}
            title={movie.title}
          />
        ))}
      </>
    )}
  </div>
)

export default MovieBoard