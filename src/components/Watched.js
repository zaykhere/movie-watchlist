import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import WatchedMovie from './WatchedMovie';

function Watched() {
  const history = useHistory();

  const [watched, setWatched] = useState([]);
  const [error, setError] = useState(undefined);
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/");
    }
    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get("https://calm-eyrie-07624.herokuapp.com/api/watched", config);
        setWatched(data.watched);
        
        if (data.errorMsg) {
          setError(data.errorMsg);
          setTimeout(() => {
            setError(undefined);
          }, 5 * 1000);
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("Something went wrong");
        setTimeout(() => {
          setError(undefined);
        }, 5 * 1000);
      }
    }

    fetchPrivateData();
  }, [])


  return (
    <React.Fragment>
      <NavigationBar />
       <div className="movies">
           <h2 className="movies-title">Watched Movies</h2>
      
     {error && (
            <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="row">
     {watched.length > 0 && (
    watched.map((movie) => (
      <WatchedMovie key={movie.id} movie={movie} />
    ))
        )}
        </div>
</div>
    </React.Fragment>
    
  )
}
export default Watched
