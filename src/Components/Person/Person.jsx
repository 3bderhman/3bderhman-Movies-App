import React, { useContext} from 'react';
import { MoviesContext } from '../Context/MoviesContext';

export default function Person() {
  const imgPath = `https://image.tmdb.org/t/p/w500`;
  let {person} = useContext(MoviesContext)
  return (
    <div>
      <div className="row py-5">
        {person.map((person, index) => <div key={index} className="col-md-3">
          <div className="mb-5">
            <img src ={imgPath+person.profile_path} className="img-fluid" alt=""/>
            <h3 className="h6 mt-2 text-center">{person.name}</h3>
          </div>
        </div>)}
      </div>
    </div>
  )
}
