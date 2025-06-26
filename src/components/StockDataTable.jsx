import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
function StockDataTable({data}) {
  const [sortType, setSortType]=useState("LTH");
  const [stock, setStock]=useState([]);
  useEffect(()=>{
    function sortData(data){
      const arr=[...data];
      if(sortType==="LTH"){
        arr.sort((a,b)=>a.stock-b.stock);

      }else if(sortType==="HTL"){
        arr.sort((a,b)=>b.stock-a.stock);
      }
      setStock(arr);
    }
    sortData(data);
  },[data, sortType]);
 
  return (
   <>
   <div className="w-full">
     <h1 className='text-xl text-gray-800 dark:text-gray-200 md:text-2xl font-bold'>Top 10 Products by Stock
           </h1>
             <div className='flex gap-2 mt-4 mb-4 items-center'>
             <p className='font-bold text-gray-800 dark:text-gray-200'>Sort by Stock</p>
             <select value={sortType} onChange={(e)=>setSortType(e.target.value)} className='cursor-pointer bg-white text-gray-800 font-medium dark:bg-gray-800  dark:text-gray-200  outline-none border-2 px-3 py-1' >
                 <option className='cursor-pointer' value="HTL">High to Low</option>
                 <option className='cursor-pointer' value="LTH">Low to high</option>
             </select></div>
             <table className='min-w-full text-sm text-left '>
     
                 
                 <thead className='text-xs font-medium text-gray-800 dark:text-gray-100  uppercase bg-gray-200 dark:bg-gray-700 '>
                     <tr>
                      <th>&nbsp; &nbsp;&nbsp;</th>
                     <th className='px-6 py-3'>Product Name</th>
                     <th className='px-6 py-3'>Product ID</th>
                     <th className='px-6 py-3'>Status</th>
                     <th className='px-6 py-3'>Price</th>
                     <th className='px-6 py-3'>Quantity</th>
                     </tr>
                 </thead>
                 <tbody>
                     {
                         stock.slice(0,10).map((product)=>{
                             return <tr key={product.productId} className=' bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-b hover:bg-gray-100 dark:hover:bg-gray-900 '>
                               <td><LazyLoadImage src={product.productImage} effect='blur' className='h-10 w-10'/></td>
                                 <td className='px-6 py-4 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap truncate'>{product.productName}</td>
                                 <td className='px-6 py-4 truncate'>{product.productId}</td>
                                   <td className='px-6 py-4 truncate'>{product.stock===0? <span className='bg-red-200 text-red-600 dark:bg-red-600 p-1 rounded-md dark:text-red-100 font-medium'>Out of Stock</span>:product.stock<20?<span className='bg-yellow-100 text-yellow-600 dark:bg-yellow-600 dark:text-yellow-100 font-medium p-1 rounded-md'>Low Stock</span>:<span className='bg-green-100 text-green-600 dark:bg-green-600 dark:text-green-50 p-1 rounded-md font-medium'>In stock</span> }</td> 
                                 <td className='px-6 py-4 truncate'>{product.price.toLocaleString('en-IN',{maximumFractionDigits:0})} ₹ </td>
                                 <td className="px-6 py-4 ">{product.stock}</td>
                             </tr>
                         })
                     }
                 </tbody>
     
             </table>
   </div>
   </>
  )
}

export default StockDataTable