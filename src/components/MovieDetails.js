import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import Footer from './Footer';
import '../index.css';
import axios from 'axios';

function MovieDetails(props) {
  
  const [result, setResult] = useState({});
  const [btnValue, setBtnValue] = useState("Add To Watchlist");
  const [error, setError] = useState(undefined);
  useEffect(() => {
    const { id } = props.match.params; 
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        data.genres.map(genre=> console.log(genre.name));
      })
      .catch((err) => console.log(err));
  }, [])
  
  let addToWatchlist = async function (movie) {
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

  return (
    <>
      <NavigationBar />
    <div className="container">
      <div className="movie-details">
    <h1> {result.title} </h1>
    <h5> {result.release_date} </h5>
        <h5 className="movie-tags">
          Tags:
          {result.genres  &&  (result.genres.map(genre => (<span> <h5 key={genre.id}>{genre.name} </h5> </span>)))}
        </h5>
    <div className="row">
      <div className="col-sm">
        <img src={`https://image.tmdb.org/t/p/w200/${result.poster_path}`} className="movie-image" />
      </div>
      <div className="col-sm aside-details">

        <h4> Runtime: {result.runtime} mins </h4>
        <h4> Status: {result.status} </h4>
        <h4> Vote average: {result.vote_average}/10 </h4>
        <h4> Total votes: {result.vote_count} </h4>
        <a href={`${result.homepage}`} className="btn btn-danger" target="_blank" rel="noopener noreferrer"> Homepage </a>
        <a href={`https://www.imdb.com/title/${result.imdb_id}`} target="_blank" rel="noopener noreferrer" className="btn btn-warning"> Visit On IMDB </a>
      </div>

    </div>
    
    <button className="btn btn-success btn-add-to-watchlist" onClick={() => { addToWatchlist(result) }}> {btnValue} </button>
    <div className="movie-overview">
      <h2 className="movie-overview-heading">Overview </h2>
      <p className="movie-overview-text"> {result.overview} </p>
    </div>
  </div>
      </div>
    
  </>  
  )
}

export default MovieDetails
