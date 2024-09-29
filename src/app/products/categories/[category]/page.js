'use client';
import Products from '@/components/Products';

const CategoryPage = ({ params }) => {
  
  return (
    <Products params={params} />
  );
};

export default CategoryPage;
