import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import Movie from './Movie';
import '../index.css';
import NavigationBar from './NavigationBar';

const Styles = styled.div`
  .columns{
    
    margin-top: 10px;
    margin-bottom: 25px;
  }

  @media screen and (max-width:576px){
    .columns, .rows{
      text-align: center;
    }
  }

  @media screen and (max-width: 1000px) {
    .columns img {
      max-width: 200px;
    }
  }
 
`

function Movies(props) {
  const [results, setResults] = useState([]);
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results)
          
        }
        else {
          setResults([])
        }
      }) 
  }, [])
  

  return (
    
    <React.Fragment>
      <NavigationBar />
      <Styles>
        <div className="movies">
           <h2 className="movies-title">Trending</h2>
      <div className="row">
    {results.length > 0 && (
    results.map((movie) => (
      <Movie key={movie.id} movieStatus="Add To Watchlist" movie={movie} />
    ))
  )}
  </div>
     </div>
        </Styles>
    </React.Fragment>
  )
}

export default Movies
