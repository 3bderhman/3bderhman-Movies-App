import React, { useContext} from 'react';
import { MoviesContext } from '../Context/MoviesContext';

export default function Movies() {
    const imgPath = `https://image.tmdb.org/t/p/w500`;
    let {movie} = useContext(MoviesContext)
  return (
    <div>
      <div className="row py-5">
        {movie.map((movie, index) => <div key={index} className="col-md-3">
          <div className="mb-5">
              <img src ={imgPath+movie.poster_path} className="img-fluid" alt=""/>
          </div>
          </div>)}
      </div>
    </div>
  )
}