import React, { useContext} from 'react';
import { MoviesContext } from '../Context/MoviesContext';

export default function Home(props) {
  const imgPath = `https://image.tmdb.org/t/p/w500`;
  let {trending} = useContext(MoviesContext);

  return (
    <div>
      <h3 className='h2'>Hi {props.user.first_name} {props.user.last_name}</h3> 
      <div className="row py-5">
          {trending.map((movie, index) => <div key={index} className="col-md-3">
                  <div className="mb-5">
                      <img src={imgPath + movie.poster_path} className="img-fluid" alt="" />
                  </div>
          </div>)}
      </div>
    </div>
  )
}
