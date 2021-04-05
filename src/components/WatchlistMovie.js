import React,{useState} from 'react'
import { Button } from 'react-bootstrap';
import NotFound from '../assets/images/notfound.jpg';
import '../index.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function WatchlistMovie({ movie }) {
   let trimString = function (string, length) {
      return string.length > length ? 
             string.substring(0, length) + '...' :
             string;
  };
  
  let trimmedTitle = trimString(movie.title, 25);
  const [button, setButton] = useState("Add To Watched");
  const [error, setError] = useState(undefined);
  const addToWatched = async function(movie) {
    
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      const movieObj = {
        title: movie.title,
        poster_path: movie.poster_path ? movie.poster_path : null,
        movie_id: movie.movie_id
      }
      const movieId = movieObj.movie_id;
      try {
        const { data } = await axios.post("https://calm-eyrie-07624.herokuapp.com/api/watched", movieObj, config);
        if (data.movie) {
          setButton("Movie Added");
          const { watched } = await axios.delete(`https://calm-eyrie-07624.herokuapp.com/api/watchlist/${movieId}`, config);
        }
        else if (data.duplicateMsg) {
          setButton("Already added");
        }
       
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    }

    fetchPrivateData();
  }
  

  return (
    <React.Fragment>
      {movie.poster_path ? (
        <div className="col-4">
          {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
         <Link to={`/moviedetails/${movie.movie_id}`}> <h2 className="movie-title">{  trimmedTitle } </h2> </Link>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              height="300"
              width="200"
            />

          <Button variant="success" className="btn-add-watchlist" onClick={() => { addToWatched(movie) }}>{ button }</Button>
          
          </div>
        ) : (
          <div className="col-4">
            <h2 className="movie-title"> {trimmedTitle} </h2>
            <img
              src={NotFound}
              height="300"
              width="200"
              alt="Poster not found"
            />
            <Button variant="success" className="btn-add-watchlist" onClick={() => { addToWatched(movie) }}>{ button }</Button>
          </div>
        )}
    </React.Fragment>
  )
}

export default WatchlistMovie
