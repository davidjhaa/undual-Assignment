'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../store/slices/productSlice'
import SearchBar from './SearchBar';
import Link from 'next/link';
import styles from './Category.module.css';

const Categories = () => {
  // const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products); 

  const fetchProducts = (page) => {
    const skip = (page - 1) * productsPerPage;

    setLoading(true);
    fetch(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${skip}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data.products))
        // setAllProducts(data.products);
        setTotalProducts(data.total);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetch('https://dummyjson.com/products/categories')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          setError('Invalid category data');
        }
      })
      .catch((err) => {
        setError('Failed to fetch categories');
      });

    fetchProducts(1);
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchProducts(pageNumber);
  };

  if (loading) return <h1 className={styles.loadingMessage}>Loading...</h1>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div style={{ width: '20vw' }}>
          <h2 className={styles.titleMain}>Categories</h2>
          <div className={styles.grid1}>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <div className={styles.card1} key={index}>
                  <Link href={`/products/categories/${encodeURIComponent(category.slug)}`} className={styles.categoryName}>
                    <p>{category.name}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p className={styles.errorMessage}>No categories available</p>
            )}
          </div>
        </div>

        <div style={{ width: '70vw' }}>
          <h1 className={styles.title}>All Products</h1>
          <SearchBar />
          <div className={styles.grid}>
            {products.map((product) => (
              <div key={product.id} className={styles.card}>
                <img src={product.thumbnail} alt={product.title} className={styles.thumbnail} />
                <h3>{product.title}</h3>
                <p>${product.price}</p>
              </div>
            ))}
          </div>
          <div className={styles.pagination}>
            {Array.from({ length: Math.ceil(totalProducts / productsPerPage) }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`${styles.pageButton} ${currentPage === i + 1 ? styles.active : ''
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Categories;
