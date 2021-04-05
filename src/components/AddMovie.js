import React, { useState} from 'react'
import styled from 'styled-components';
import ResultCard from './ResultCard';
import '../index.css';
import NavigationBar from './NavigationBar';
import axios from 'axios';

const Styles = styled.div`

  .add-movie {
    min-width: 75%;
    margin-top: 20px;
    padding: 10px;
    background-color: #032541;
    color: white;
    border-radius: 25px;
  }

  .add-movie-heading{
    text-align: center;
    margin: 20px;
  }

  add-movie:focus {
    outline: none !important;
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: white;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: white;
}


`
                

function AddMovie(props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(undefined);

  const onChange =   (e) => {
    e.preventDefault();
    setQuery(e.target.value);
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${e.target.value}&page=1`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) {
          setResults(data.results);
        }
        else {
          setResults([]);
        }
      } )
      .catch((err) => {
        setError("Something went wrong");
        setTimeout(() => {
          setError(undefined);
        }, 5*1000);
      } );
    
  }

 
  return (
    <Styles>
      <NavigationBar />
      <div className="container add-page">
         {error && (
            <div class="alert alert-danger" role="alert">
  {error}
</div>
          )}
        <h1 className="movies-title">Add Movies to Your WatchList</h1>
        
      <input className="add-movie container" type="text" placeholder="Search for movies" value={query} onChange={onChange} />
      </div>
      <div className="movies">
        <h2 className="movies-title">Search Results</h2>
      <div className="row">
    {results.length > 0 && (
    results.map((movie) => (
      <ResultCard key={movie.id} movie={movie} />
    ))
  )}
  </div>
     </div>

    </Styles>
  )
 
}

export default AddMovie
