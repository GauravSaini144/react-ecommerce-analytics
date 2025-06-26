import { tr } from '@faker-js/faker'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";


function ProductRatingTable({products}) {
    const [sortedProduct, setSortedProduct]=useState([]);
    const [select, setSelect]=useState("HTL");
    
    useEffect(() => {
  function sortProducts() {
    const newArr = [...products]; 
    if (select === "HTL") {
      newArr.sort((a, b) => b.rating - a.rating); // High to Low
    } else if (select === "LTH") {
      newArr.sort((a, b) => a.rating - b.rating); // Low to High
    }
    setSortedProduct(newArr);
  }

  sortProducts();
}, [select, products]); 

  return (
    <>
    <div className="w-full">
      <h1 className='text-xl text-gray-800 dark:text-gray-200 md:text-2xl font-bold'>Top 10 Products by Rating
      </h1>
        <div className='flex gap-2 mt-4 mb-4 items-center'>
        <p className='font-bold text-gray-800 dark:text-gray-200'>Sort by rating</p>
        <select value={select} onChange={(e)=>setSelect(e.target.value)} className='outline-none cursor-pointer border-2 text-gray-800 font-medium  px-3 py-1 dark:bg-gray-800 dark:text-gray-200 ' >
            <option className='cursor-pointer' value="HTL">High to Low</option>
            <option className='cursor-pointer' value="LTH">Low to high</option>
        </select></div>
        <table className='min-w-full text-sm text-left '>

            
            <thead className='text-xs text-gray-800 bg-gray-200 dark:text-gray-100 uppercase dark:bg-gray-700 '>
                <tr>
                 <th>&nbsp; &nbsp;&nbsp;</th>
                <th className='px-6 py-3'>Product Name</th>
                <th className='px-6 py-3'>Product ID</th>
                <th className='px-6 py-3'>Category</th>
                <th className='px-6 py-3'>Price</th>
                <th className='px-6 py-3'>Rating</th>
                </tr>
            </thead>
            <tbody className=''>
                {
                    sortedProduct.slice(0,10).map((product)=>{
                        return <tr key={product.id} className=' bg-white text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 border-b dark:hover:bg-gray-900 '>
                          <td><LazyLoadImage src={product.image} effect='blur' className='h-10 w-10'/></td>
                            <td className='px-6 py-4 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap truncate'>{product.name}</td>
                            <td className='px-6 py-4 truncate'>{product.id}</td>
                            <td className='px-6 py-4 truncate'>{product.category}</td>
                            <td className='px-6 py-4 truncate'>{product.price.toLocaleString('en-IN',{maximumFractionDigits:0})} ₹ </td>
                            <td className={product.rating<3?"font-medium px-6 py-4 text-red-400 dark:text-red-500":" font-medium px-6 py-4 text-green-600"}>{product.rating.toLocaleString('en-IN',{maximumFractionDigits:1})}</td>
                        </tr>
                    })
                }
            </tbody>

        </table>
    </div>
    </>
  )
}

export default ProductRatingTable