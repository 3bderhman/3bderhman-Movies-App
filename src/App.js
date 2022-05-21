import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tv from './Components/Tv/Tv';
import Person from './Components/Person/Person';
import Login from './Components/Login/Login';
import Lougout from './Components/Logout/Lougout';
import Register from './Components/Register/Register';
import NotFound from "./Components/NotFound/NotFound";
import jwtDecode from "jwt-decode";
import ProtecedRouter from "./Components/ProtecedRouter/ProtecedRouter";

function App() {
  const navigate = useNavigate();
  let [loginUser, setLoginUser] = useState(null);
  useEffect(() => {
    if(localStorage.getItem('userToken'))
      loginUserInfo();
  }, [])

  function loginUserInfo(){
    let encodeToken = localStorage.getItem('userToken');
    let userData = jwtDecode(encodeToken);
    setLoginUser(userData);
  }

  function LogOut(){
    localStorage.removeItem('userToken');
    setLoginUser(null);
    navigate('/login');
  }
  
  return (
    <div>
        <Navbar  user={loginUser} LogOut={LogOut} />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Outlet />}>
                {loginUser? 
                  <>
                    <Route element={<ProtecedRouter isLogged={loginUser} />}>
                      <Route path="Movies-App/" element={<Home user={loginUser} />} />
                    </Route>
                    <Route element={<ProtecedRouter isLogged={loginUser} />}>
                      <Route path="/home" element={<Home user={loginUser} />} />
                    </Route>
                    <Route element={<ProtecedRouter isLogged={loginUser} />}>
                      <Route path="/movies" element={<Movies />} />
                    </Route>
                    <Route element={<ProtecedRouter isLogged={loginUser} />}>
                      <Route path="/tv" element={<Tv />} />
                    </Route>
                    <Route element={<ProtecedRouter isLogged={loginUser} />}>
                      <Route path="/person" element={<Person />} />
                    </Route>
                  </>: 
                  <>
                    <Route path="Movies-App/" element={<Login userInfo={loginUserInfo} />} />
                    <Route path="/login" element={<Login userInfo={loginUserInfo} />} />
                    <Route path="/logout" element={<Lougout />} />
                    <Route path='/register' element={<Register />} />
                  </>
                }  
                <Route path='/*' element={<NotFound />} />
              </Route>   
          </Routes>
        </div>
    </div>
  );
}

export default App;
