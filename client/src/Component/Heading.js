import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useSelector} from 'react-redux';
import firebase from '../firebase';
import axios from 'axios';

function Heading() {

  const [DisplayName, setDisplayName] = useState("");

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    let body = {
      uid : user.uid
    }
    axios.post("/api/user/getDisplayName", body).then((response) => {
      if(response.data.success) {
        setDisplayName(response.data.displayName);
      }
    }).catch((err) => {
      console.log(err);
    });
  });

  const LogoutHandler = () => {
    firebase.auth().signOut();
    navigate("/");
  };
    
  return (
    <Navbar  expand="lg" variant="dark" style={{backgroundColor: '#000080'}}>
      <Container>
        <Navbar.Brand href="/" style={{ fontFamily: '"Do Hyeon", sans-serif',fontWeight: 'bold', fontSize: '40px'}}>연등</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          
            <Link to="/" style={{ color: "white", textDecoration: "none", marginRight: "14px", marginLeft: "0px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-house-fill" viewBox="0 2 13 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L8 2.207l6.646 6.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z"/>
            <path d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Z"/>
            </svg> 홈</Link>
          
            <Link to="/upload" style={{ color: "white", textDecoration: "none", marginRight: "10px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 2 13 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
            </svg>글작성</Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end'>
          {user.accessToken ? <><span style={{color : '#ffffff', fontSize: '15px', paddingRight: '15px'}}> {DisplayName} 님 </span><Navbar.Text style={{color: "white", cursor: "pointer"}} onClick={() => LogoutHandler()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-unlock-fill" viewBox="0 2 16 16">
            <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z"/>
            </svg>로그아웃 </Navbar.Text></> 
          : <Link to="/login" style={{ color: "white", textDecoration: "none", marginRight: "10px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="30" fill="currentColor" class="bi bi-lock-fill" viewBox="0 2 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
            </svg>로그인</Link>}
         
        </Navbar.Collapse>
      </Container>
      <br/><br/><br/>
    </Navbar>    
  )
}

export default Heading