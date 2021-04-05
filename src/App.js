import React,{useContext} from 'react';
import Movies from './components/Movies';
import WatchList from './components/WatchList';
import Watched from './components/Watched';
import AddMovie from './components/AddMovie';
import MovieDetails from './components/MovieDetails';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Privacy from './components/Privacy';
import { GlobalProvider } from './components/context/GlobalState';
import './index.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/context/AuthContext';
import { AuthContext } from "./components/context/AuthContext";
import  ProtectedRoute  from './components/ProtectedRoute';

function App() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <GlobalProvider>
      <AuthContextProvider>
      <Router>
      
      
        <Switch>
          <ProtectedRoute exact path="/" component={Movies} />
          <ProtectedRoute exact path="/watchlist" component={WatchList} />
          <ProtectedRoute exact path="/watched" component={Watched} /> 
          <ProtectedRoute exact path="/addmovie" component={AddMovie} /> 
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/moviedetails/:id" component={MovieDetails} />
          </Switch>
        <Footer />  
        </Router>
        </AuthContextProvider>
      </GlobalProvider>
    
  );
}

export default App;
