import './App.css';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Users from "./components/Users";
import Navbar from './components/navbar';
import NotFound from './components/NotFound';
import UserProfile from './components/userProfile';
import SearchUser from './components/searchUser';
import Login from './components/login';
import AuthProfile from './components/authProfile';
import { useState } from 'react';
import { SwitchTransition, CSSTransition } from 'react-transition-group';

function App() {
  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation();

  return (
    <SwitchTransition component={null}>
      <CSSTransition key={location.pathname} classNames="fade" timeout={300} unmountOnExit>
        <Routes location={location}>
          <Route path="/" element={<Navbar isLogged={isLogged} />}>
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/users" element={<Users />} />
            {/* values passed after colon (here, username) is considered as parameter, which is then captured in the aligned component using useParams and hence used in the code for operations on it  */}
            <Route element={<UserProfile />} path="/users/user/:username" />
            <Route path="/search" element={<SearchUser />} />
            <Route
              element={
                <Login setIsLogged={setIsLogged} setUsername={setUsername} />
              }
              path="/login"
            />
            <Route
              element={
                isLogged ? (
                  <AuthProfile username={username} />
                ) : (
                  <Navigate replace to={"/login"} />
                )
              }
              path="/authProfile"
            />
          </Route>
          <Route element={<NotFound />} path="*" />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  );
}

export default App;
