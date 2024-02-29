import { Link , useHistory} from "react-router-dom";
import { useEffect, useState } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import axios from "axios";
import { useSelector } from "react-redux";

function Navbar() {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const favorites = useSelector((state) => state.favor.favorites)
  const wishlist = useSelector((state) => state.wish.wishlist)
  const cart = useSelector((state) => state.cart.cart)
  const [showCart, setShowCart] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
        history.push(`/search/${searchQuery}`);
    }
    };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setShowDropdown(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    history.push("/");
  };
  const toggleCart = () => {
    setShowCart(!showCart);
    console.log("Cart toggled:", showCart);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-shop"></i> E-COMMERCE
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/Wishlist">Wish List <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">{wishlist.length}</span></Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/favorites">Favorites <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">{favorites.length}</span></Link>
            </li>
          </ul>
          <form className="d-flex justify-content-center">
            <input className="form-control me-2 ms-2" type="search" placeholder="Search Product ..." aria-label="Search" value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} style={{width:'40rem'}}/>
            <button className="btn btn-outline-light" type="submit" onClick={handleSearch}>Search</button>
          </form>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          
          {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    <i className="bi bi-person-circle"></i> Login
                  </Link>
                </li>
              </>
            )}
          {isLoggedIn && (
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-secondary"
                id="navbarDropdown"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                User
              </button>
              <ul
                className={`dropdown-menu ${showDropdown ? 'show' : ''}`}
                aria-labelledby="navbarDropdown"
              >
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          )}
            <li className="nav-item position-relative">
              <Link className="btn btn-primary me-2" to='./CartPage'>
                <i className="bi bi-cart"></i> <span className="position-absolute top-25 start-75 translate-middle badge rounded-pill bg-warning">{cart.length}</span>
              </Link>
            </li> 
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
