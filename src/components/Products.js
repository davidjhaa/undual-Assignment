'use client';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../store/slices/productSlice'
import styles from './Products.module.css'; 
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

const Products = ({ params }) => {
  const { category } = params; 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
  const [categories, setCategories] = useState([]);
  
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products); 

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProducts(data.products)); 
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, [category, dispatch]);

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
  }, []);

  if (loading) return <p className={styles.loadingMessage}>Loading...</p>;
  if (error) return <p className={styles.errorMessage}>{error}</p>;

  return (
    <>
      <div className={styles.container}>
        <div style={{width:'20vw'}}>
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
        <div style={{width:'70vw'}}>
          <Link href={'/products'} style={{textAlign:'end'}}>Home</Link>
          <h1 className={styles.title}>{category} Products</h1>
          <SearchBar />
          <div className={styles.productGrid}>
            {products.map((product) => (
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
        </div>
      </div>
    </>
  );
};

export default Products;
