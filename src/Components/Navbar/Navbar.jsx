import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
// import { CounterContext } from '../../Context/Counter'
import { TokenContext } from "../../Context/Token";
import { cartContext } from "../../Context/CartContext";
// import styles from './Navbar.module.scss'

export default function Navbar() {
  const { numOfCartItems } = useContext(cartContext);
  let { isLogin, setIsLogin } = useContext(TokenContext);
  let navigate = useNavigate();
  // console.log(token,"tokennnnnn");
  function logOut() {
    setIsLogin(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to={"home"}>
            <img src={Logo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isLogin ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/home"}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/products"}>
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/categories"}>
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to={"/brands"}>
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link position-relative"
                    to={"/wishlist"}
                  >
                    WishList
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link position-relative"
                    to={"/allorders"}
                  >
                    My Orders
                  </NavLink>
                </li>
              </ul>
            ) : null}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              {isLogin ? (
                <>
                  <li className="nav-item position-relative me-2">
                    <Link
                      to={"/cart"}
                      className="fa-solid fa-cart-shopping fs-4 text-decoration-none mx-2 text-success"
                    ></Link>
                    <span className="position-absolute top-25 start-100 translate-middle badge rounded-4 bg-danger">
                      {numOfCartItems}
                    </span>
                  </li>
                  <li>
                  <Link className="nav-link" to="/profile">
                    <i className="fa-regular fa-circle-user fs-4 text-success"></i>
                  </Link>
                </li>
                  <li className="nav-item">
                    <button className="nav-link" onClick={logOut}>
                      LogOut
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/register"}>
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"/login"}>
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
