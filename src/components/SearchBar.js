'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findProduct } from '@/store/slices/productSlice';
import styles from './searchBar.module.css';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const foundProducts = useSelector((state) => state.products.foundProducts);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim() === '') {
      setShowResults(false); // Hide results
      setErrorMessage('Please enter a valid search term.'); // Show error
      return;
    }
    
    setShowResults(true); 
    setErrorMessage(''); 
    dispatch(findProduct(search)); 
  };

  return (
    <div>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>

      {showResults && foundProducts.length > 0 ? (
        <div>
          <h3>Results</h3>
          <div className={styles.productGrid}>
          {foundProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <img
                src={product.thumbnail}
                alt={product.title}
                className={styles.productImage}
              />
              <p className={styles.productPrice}>${product.price}</p>
            </div>
          ))}
          </div>
          <h2>More Products you might like</h2>
        </div>
      ) : showResults && foundProducts.length === 0 ? (
        <p>No products found</p>
      ) : null}
    </div>
  );
};

export default SearchBar;
