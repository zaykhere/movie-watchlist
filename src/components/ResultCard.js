import { Button} from 'react-bootstrap';
import React, {useContext,useState} from 'react';
import NotFound from '../assets/images/notfound.jpg';
import { Link } from 'react-router-dom';
import '../index.css';
import { GlobalContext } from './context/GlobalState';
import axios from 'axios';

function ResultCard({ movie }) {
  

  const { addMovieToWatchlist } = useContext(GlobalContext);
  const [button, setButton] = useState(false);
  const [btnValue, setBtnValue] = useState('Add To Watchlist');
  const [error, setError] = useState(undefined);

  
  
  let addToWatchlist = async function (movie) {
    // if (button == false) {
    //   addMovieToWatchlist(movie);
    //   axios.post(`http://localhost:5000/api/watchlist`, {
    //     title: movie.title,
    //     poster_path: movie.poster_path ? movie.poster_path : null,
    //     movie_id: movie.id
    //   })
    //     .then((res) => {
    //       setButton(true);
    //       setBtnValue("Movie Added");
    //     })
    //     .catch((err) => console.log(err));
    // }

    if (button === false) {
      if (!localStorage.getItem("authToken")) {
        console.log("yay");
    }
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
        movie_id: movie.id
      }
      try {
       
          const { data } = await axios.post("https://calm-eyrie-07624.herokuapp.com/api/watchlist", movieObj, config);
          if (data.movie) {
          addMovieToWatchlist(data.movie);
          setButton(true);
          setBtnValue("Movie Added");
        }
        
          else if (data.duplicateMsg) {
            setBtnValue("Already Added");
        }
          
        
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    }

    fetchPrivateData();
 
    }
    
  }

  let trimString = function (string, length) {
      return string.length > length ? 
             string.substring(0, length) + '...' :
             string;
  };
  
  let trimmedTitle = trimString(movie.title, 25);

  return (
    <React.Fragment>
     
        {movie.poster_path ? (
        <div className="col-4">
          {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
          <Link to={`/moviedetails/${movie.id}`}><h2 className="movie-title">{  trimmedTitle } </h2> </Link>
            <img
              src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              height="300"
              width="200"
            />

          <Button variant="success" onClick={() => { addToWatchlist(movie) }} className="btn-add-watchlist">{btnValue}</Button>
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
            <Button variant="success" className="btn-add-watchlist">Add to Watchlist</Button>
          </div>
        )}
   
    </React.Fragment>
  );
}





export default ResultCard
