import React,{useState} from 'react';
import { Link,useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NotFound from '../assets/images/notfound.jpg';
import axios from 'axios';
import '../index.css';

function WatchedMovie({ movie }) {
  let trimString = function (string, length) {
      return string.length > length ? 
             string.substring(0, length) + '...' :
             string;
  };

  const [btnValue, setBtnValue] = useState("Remove");
  const [error, setError] = useState(undefined);
  const history = useHistory();
  let trimmedTitle = trimString(movie.title, 25);

  const removeMovie = async function (movie) {
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      console.log(movie);
      const movieId = movie.movie_id;
     
      try {
        const { data } = await axios.delete(`https://calm-eyrie-07624.herokuapp.com/api/watched/${movieId}`, config);
       
        if (data.message) {
          setBtnValue("Movie Removed");
          history.push("/watch");
          history.goBack();
        }
        else if (data.errorMsg) {
          setBtnValue("Error Occured");
        }
       
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    }

    fetchPrivateData();
  }

  return (
    <div>
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

          <Button variant="success" className="btn-add-watchlist" onClick={() => { removeMovie(movie) }} >{btnValue}</Button>
          
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
            <Button variant="success" className="btn-add-watchlist" onClick={() => { removeMovie(movie) }} >{btnValue}</Button>
          </div>
        )}
    </div>
  )
}

export default WatchedMovie
