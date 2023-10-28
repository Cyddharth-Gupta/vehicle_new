import React, { useState, useEffect } from 'react';
import LoginPage from './Pages/LoginPage';
import ZoneTracker from './Pages/ZoneTracker';
import WeighingTracker from './Pages/WeighingTracker';
import "./App.css";
import NavigationDrawer from './Components/NavigationDrawer';

import { useDispatch, useSelector } from 'react-redux';
import { loginStatus } from './redux_store/slice/userInfoSlice';
import { setLoginStatus } from './redux_store/slice/userInfoSlice';


const App = () => {
  //const [isLoggedIn, setIsLoggedIn] = useState(false);
const dispatch = useDispatch();
const isLoggedIn = useSelector(loginStatus);
  const handleLogin = () => {
    //setIsLoggedIn(true);
    dispatch(setLoginStatus(true));
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
         <WeighingTracker />
        </>
      ) : (
        <LoginPage  onLogin = {handleLogin} />
      )}
    </div>
  );
};

export default App;
