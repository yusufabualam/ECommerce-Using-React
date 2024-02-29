import logo from './logo.svg';
import './App.css'
import Navbar from './Components/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './Pages/Home';
import CategoryBar from './Components/CategoryBar';
import RegisterForm from './Pages/Registeration';
import LoginForm from './Pages/Login';
import Profile from './Components/UserProfile';
import React, { useState } from 'react';
import CategoryPage from './Components/CategoryPage'; 
import ProductDetails from './Components/ProductDetails';
import SearchResults from './Components/SearchResults';
import Wishlist from './Pages/Wishlist';
import Favorites from './Pages/favorites';
import Footer from './Components/Footer';
import CartPage from './Components/CartPage';

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null); 

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <BrowserRouter>
      <Navbar />
      <CategoryBar
        selectedCategory={selectedCategory}
        handleCategoryClick={handleCategoryClick}
      />
      <Switch>
      {/* <Route exact path={"/"}>
          <Home selectedCategory={selectedCategory} />
        </Route> */}
        <Route exact path={"/"} component={Home}/>
        <Route exact path={'/Wishlist'} component={Wishlist} />
        <Route path={'/favorites'} component={Favorites} />
        <Route path={'/CartPage'} component={CartPage} />
        <Route path="/product/:id" component={ProductDetails} />
        <Route exact path="/search/:query" component={SearchResults} />
        <Route path="/category/:category" component={CategoryPage} />
        <Route exact path={"/registeraion"} component={RegisterForm}/>
        <Route exact path={"/login"} component={LoginForm}/>
        <Route exact path="/profile" component={Profile} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
