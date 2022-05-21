import React, { useContext} from 'react';
import { MoviesContext } from '../Context/MoviesContext';

export default function Tv() {
  const imgPath = `https://image.tmdb.org/t/p/w500`;
  let {tv} = useContext(MoviesContext)
  return (
    <div>
      <div className="row py-5">
          {tv.map((tv, index) => <div key={index} className="col-md-3">
              <div className="mb-5">
                  <img src ={imgPath+tv.poster_path} className="img-fluid" alt=""/>
              </div>
          </div>)}
      </div>
    </div>
  )
}
