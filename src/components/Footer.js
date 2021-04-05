import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <React.Fragment>
      <footer>
    <div className="footer-grid container">
      <div className="grid-item">
        <h2 className="footer-heading"> ZWatch </h2> 
        <a href="#" className="icon"><i className="fab fa-facebook "></i> </a>
        <a href="#" className="icon"><i className="fab fa-twitter "></i> </a>
        <a href="#" className="icon"><i className="fab fa-instagram "></i> </a>
        <a href="#" className="icon"><i className="fab fa-linkedin-in "></i> </a>
      </div>
      <div className="grid-item">
        <p> All the movie details i.e. posters, titles have been taken from TMDB API and ofcourse they deserve all the rights of their data. </p>
        <p> Likewise, this website uses fontawesome icons. </p>
      </div>
      <div className="grid-item">
       <Link to="/privacy"> <a href='#' className="btn btn-outline-warning warning-btn"> Privacy Policy </a> </Link>
        <p className='copyright-text'> <i className="far fa-copyright"></i> ZWatch. All Rights Reserved </p>
      </div>
    </div>
  </footer>
    </React.Fragment>
  )
}

export default Footer
