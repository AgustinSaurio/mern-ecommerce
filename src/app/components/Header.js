import React from 'react';
import { NavLink } from 'react-router-dom';

function Header( { basket } ) {
    return (
        <div className='header sticky-top'>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link active text-white">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Products
                                </a>
                                <ul className="dropdown-menu">
                                    <NavLink to="/products/shirts" className="nav-link active text-white">
                                        <li className="dropdown-item">T-Shirt</li>
                                    </NavLink>
                                    <NavLink to="/products/pants" className="nav-link active text-white">
                                        <li className="dropdown-item">Pants</li>
                                    </NavLink>
                                    <NavLink to="/products/sneakers-and-shoes" className="nav-link active text-white">
                                        <li className="dropdown-item">Sneakers and shoes</li>
                                    </NavLink>
                                    <NavLink to="/products/accesories" className="nav-link active text-white">
                                        <li className="dropdown-item">Accesories</li>
                                    </NavLink>
                                </ul>
                            </li>
                        </ul>                
                    </div>
                    <NavLink to="/products/cart">
                        <div className='me-3'>
                            <div type="button" className="btn btn-primary position-relative">
                                <i className="bi bi-cart2"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {basket.length}
                                </span>
                            </div>
                        </div>
                    </NavLink>                            
                </div>
            </nav>
        </div>
    );
}

export default Header;