import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector} from 'react-redux';
import firebase from '../firebase';

function Heading() {

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };
    
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand href="/">연등</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          
            <Link to="/" style={{ color: "white", textDecoration: "none", marginRight: "10px", marginLeft: "10px"}}>
              홈</Link>
          
            <Link to="/upload" style={{ color: "white", textDecoration: "none", marginRight: "10px"}}>글쓰기</Link>
             
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          {user.accessToken ? <Navbar.Text style={{color: "white", cursor: "pointer"}} onClick={() => LogoutHandler()}>로그아웃</Navbar.Text>
          : <Link to="/login" style={{ color: "white", textDecoration: "none", marginRight: "10px"}}>로그인</Link>}
         
        </Navbar.Collapse>
      </Container>
    </Navbar>

     
  )
}

export default Heading