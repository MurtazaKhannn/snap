import React, { useEffect, useState } from 'react';
import { ImCross } from "react-icons/im";


const ListProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchInfo = async () => {
    try {
      const response = await fetch('http://localhost:4000/allproducts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (!Array.isArray(data.products)) {
        throw new Error('Fetched data is not an array');
      }
      setAllProducts(data.products);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!Array.isArray(allProducts)) {
    return <p>Unexpected data format</p>;
  }

  const remove_product = async (id) => {
    if(confirm("Are you sure you want to remove product?")){
    await fetch('http://localhost:4000/removeproduct', {
      method: 'POST',
      headers: {
        Accept:'application/json' ,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
  }

    await fetchInfo();
  }

  return (
    <div className='list-product w-[70vw]'>
      <h1 className='font-bold text-3xl '>All Products List</h1>
      <div className="listproducts-format-main flex font-semibold justify-between p-2">
        <p>Products</p>
        <p>Name</p>
        <p>Stock</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => (
          <div key={index} className="listproduct-format-main flex mt-5 justify-between w-[70vw] items-center">
            <img src={product.image} alt={product.name} className="listproduct-product-item h-28" />
            <p className='mr-10'>{product.name}</p>
            <p className='mr-10'>{product.available}</p>
            <p className='pr-10'>{product.old_price}</p>
            <p className='pr-10'>{product.new_price}</p>
            <p className='pr-10'>{product.category}</p>
            <p onClick={() => {remove_product(product.id)}}><ImCross /></p> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
