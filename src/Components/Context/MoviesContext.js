import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
export const MoviesContext = createContext([]);

export default function MoviesContextProvider(props) {
    const [trending, setTrending] = useState([]);
    const [movie, setMovie] = useState([]);
    const [tv, setTv] = useState([]);
    const [person, setPerson] = useState([]);

    async function getMovies(mediaType, callBack){
        let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=eba8b9a7199efdcb0ca1f96879b83c44&fbclid=IwAR1nXVz-UHNL_vDTQweEqbh2kBDklEHajM2c9pPbgKhXknEyGYfAnBLNAjs`);
        callBack(data.results);
    };
    useEffect(() =>{
      getMovies('trending', setTrending);
      getMovies('movie', setMovie);
      getMovies('tv', setTv);
      getMovies('person', setPerson);
    }, [])

    return (
    <MoviesContext.Provider value={{trending, movie, tv, person}}>
          {props.children}
      </MoviesContext.Provider>
  )
}


 


