import React from 'react'
import {NavLink} from "react-router-dom";

export default function Navbar(props) {
  return (
    <div>
        <nav className="navbar navbar-expand-lg px-0 px-md-3">
                <div className="container-fluid">
                    <h1 className="nav-brand me-5">Noxe</h1>
                    <i className="fas fa-bars fa-larg navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbar"></i>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {props.user ? <>
                                        <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to={'/home'}>Home</NavLink></li>
                                        <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to={'/movies'}>Movies</NavLink></li>
                                        <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to={'/tv'}>Tv</NavLink></li>
                                        <li className="nav-item"><NavLink className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} to={'/person'}>Person</NavLink></li>
                                </> : ''
                            }
                        </ul>

                        <ul className="d-flex list-unstyled m-0">
                            <li className="nav-item">
                                <a className="nav-link" href="https://www.instagram.com">
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link"  href="https://www.facebook.com/">
                                    <i className="fab fa-facebook"></i>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="https://twitter.com">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {props.user ? <>
                                <li className="nav-link" onClick={props.LogOut}>Logout</li>
                            </>:<>
                                <li className="nav-item"><NavLink className="nav-link" to={'/register'}>Register</NavLink></li>
                                <li className="nav-item"><NavLink className="nav-link" to={'/login'}>Login</NavLink></li>
                            </>
                        }

                        </ul>
                    </div>
                </div>
            </nav>
    </div>
  )
}
