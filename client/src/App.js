import React, { useEffect }from 'react'
import './App.css';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { loginUser, clearUser } from './Reducer/userSlice';
import firebase from './firebase';

import Heading from './Component/Heading';
import Footer from './Component/Footer';

import MainPage from './Component/MainPage';
import Upload from './Component/Post/Upload';
import Detail from './Component/Post/Detail';
import Edit from './Component/Post/Edit';
import PostArea from './Component/Post/PostArea';

import Login from './Component/User/Login';
import Register from './Component/User/Register';




function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  }, []);

  return (
    <>
    <Heading/>
    <Routes>
        <Route path='/' element={<MainPage />}/>
        <Route path='/upload' element={<Upload />}/>
        <Route path='/post/:postNum' element={<PostArea />}/>
        <Route path='/edit/:postNum' element={<Edit />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
