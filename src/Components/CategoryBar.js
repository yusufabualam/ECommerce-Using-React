import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './CategoryBar.css'

function CategoryBar({ selectedCategory, handleCategoryClick }) {
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const visibleCategories = expanded ? categories : categories.slice(0, 15);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('https://dummyjson.com/products/categories');
        setCategories(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            {visibleCategories.map((category, index) => (
              <li className="nav-item" key={index}>
               <Link
                  to={`/category/${category}`}
                  className="nav-link"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
          {categories.length > 15 && (
            <button className="btn btn-primary" onClick={toggleExpanded}>
              {expanded ? 'Less Categories' : 'More Categories'}
            </button>
          )}
        </div>
      </div>
    </nav>
  );  
}

export default CategoryBar;
