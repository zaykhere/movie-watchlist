import React from 'react'
import { Nav, Navbar, Button} from 'react-bootstrap';
import styled from 'styled-components';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

const Styles = styled.div`
  .navbar {
    background-color: #032541;
  }
  .navbar-nav, .navbar-brand, .navbar-link {
    color: #bbb;
    

    &:hover{
      color: white;
    }
  }
  .navbar-brand{
    font-size: 35px;
  }
  .nav-link, .nav-link a, .nav-link a:link {
    color: #bbb !important ;
    margin-right: 10px;
    font-size: 18px;

    &:hover{
      color: white !important;
    }
  }
  .add-btn{
    margin-right: 10px;
  }

  .navbar .btn {
    font-size:16px;
  }

  .menu-icon {
    font-size: 25px;
  }

  .login-btn{
    margin-left: 10px;
  }

  @media screen and (max-width:992px){
    .add-btn{
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }

  .navbar-toggler {
    color: white !important;
  }

  .navbar-toggler-icon{
    color: white !important;
  }

   @media screen and (max-width:576px){
     .signup-btn, .login-btn {
       margin: 10px;
     }
   }
`

function NavigationBar(props) {
  let history = useHistory();
  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    history.push("/signup");
  }

  
  
  return (
    <Styles>
      
      <Navbar expand="lg">
        <div className="container">
       <Link to="/"> <Navbar.Brand href="/">ZWatch</Navbar.Brand> </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <FontAwesomeIcon icon={faBars} color="white" size='lg' className="menu-icon" />
          </Navbar.Toggle>
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="ml-auto">
              {localStorage.getItem('authToken') && (
            <React.Fragment>  
            <Nav.Link as={Link} to="/watchlist" >  WatchList  </Nav.Link>
            <Nav.Link as={Link} to="/watched"  >  Watched  </Nav.Link>
            <Link to="/addmovie"> <Button variant="success" className="add-btn btn">   +Add   </Button>{' '} </Link>
            <button className='logout btn btn-danger' onClick={logoutHandler}> Logout  </button>     
            </React.Fragment>        
    )}
      
              {!localStorage.getItem('authToken') && (
                <React.Fragment>
                   <Link to="/signup"> <Button variant="info" className="signup-btn btn">   Sign Up   </Button>{' '} </Link>
                    <Link to='/login'> <Button variant="success" className="login-btn btn">   login  </Button>{' '} </Link> 
                </React.Fragment>
      )}
            
      
          </Nav>
          </Navbar.Collapse>
          </div>
        
      </Navbar>
    </Styles>
  )
}

export default NavigationBar;
