import React from "react";
import Saleschart from "./Saleschart";
import { users, products, revenue, orders, inventory } from "../data/getData";
import Barchart from "./Barchart";
import ProductRatingTable from "./ProductRatingTable";
import StockDataTable from "./StockDataTable";
import ThemeToggle from "./ThemeToggle";
function Home() {
 
  const totalRevenue = revenue.reduce((acc, rev) =>  acc + rev.revenue, 0);
 const categories=products.reduce((acc, product)=>{
 if(!acc.includes(product.category)) acc.push(product.category);

 return acc;
 },[]);
 
const totalItems = orders.reduce((acc, order)=>acc+order.items.reduce((acc, item)=>acc+item.quantity,0) ,0);

const totalOrdersDelivered=orders.filter((order)=>{
  if(order.status==="delivered"){
    return order;
  }
})

const totalOrdersPending=orders.filter((order)=>{
  if(order.status==="pending"){
    return order;
  }
})


  return (
    
    <>
      <div className="dashboard flex flex-col items-center py-8 min-h-screen relative  ">
        <div className="cursor-pointer absolute top-6 left-6"><img src="/logo.png" alt="" className="h-10" /></div>
        <div className="sticky top-2 shadow-xl right-0 ml-auto m-2 z-50 outline-none "><ThemeToggle/></div>
        <div className="heading text-center mb-12 text-gray-800 dark:text-white mt-4 cursor-pointer">
          <h1 className="text-2xl md:text-5xl font-extrabold ">E-Commerce Insights</h1>
          <p className=" text-xl mt-2 opacity-80">Overview of key metrics</p>
        </div>

        <div className="kpis grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-screen-xl px-4">
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {/* Revenue */}
            <div className="kpi-card cursor-pointer relative flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
              <div className="mt-4 text-xl xs:text-md md:text-3xl font-bold text-green-600 dark:text-green-300 flex items-center gap-2">{totalRevenue.toLocaleString('en-IN')} ₹ </div><span className="text-sm absolute top-1 right-1 rounded-md bg-green-100 text-green-600 dark:bg-green-800  dark:text-green-100 px-1 ">^ 4.5%</span>
              <div className="text-lg xs:text-sm md:text-xl text-gray-800 dark:text-gray-200 mt-2">Total Revenue</div>
              <div className="text-sm text-gray-500">Past 30 days</div>
            </div>

            {/* Orders */}
            <div className="kpi-card cursor-pointer relative flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
              <div className="mt-4 text-xl xs:text-md md:text-3xl font-bold text-blue-600 dark:text-blue-300 flex items-center gap-2">{orders.length}</div><span className='text-sm absolute top-1 right-1 bg-green-100 text-green-600  dark:bg-green-800 dark:text-green-100 rounded-md px-1'>^ 6.1%</span>
              <div className="text-lg xs:text-sm md:text-xl text-gray-800 dark:text-gray-200  mt-2">Total Orders  </div>
              <div className="text-sm text-gray-500">Past 30 Days</div>
            </div>

            {/* Customers */}
            <div className="kpi-card cursor-pointer flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
              <div className="mt-4 text-xl xs:text-md md:text-3xl font-bold text-purple-600 dark:text-purple-300">{users.length}</div>
              <div className="text-lg xs:text-sm md:text-xl text-gray-800 dark:text-gray-200 mt-2">Total Customers</div>
              <div className="text-sm text-gray-500">Registered Users</div>
            </div>

            {/* Products */}
            <div className="kpi-card cursor-pointer relative flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
              <div className=" mt-4 text-xl xs:text-md md:text-3xl font-bold text-green-600 dark:text-green-300 flex items-center gap-2 ">{(totalRevenue/revenue.length).toLocaleString('en-IN',{maximumFractionDigits:0})} ₹</div><span className="text-sm text-green-600 absolute top-1 right-1 bg-green-100 dark:bg-green-800 dark:text-green-100  rounded-md px-1">^ 4.7%</span>
              <div className="text-lg xs:text-sm md:text-xl text-gray-800 dark:text-gray-200 mt-2">Average sales</div>
              <div className="text-sm text-gray-500">Per Day</div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white cursor-pointer dark:bg-gray-800 p-1 md:p-8 rounded-2xl shadow-xl flex flex-col justify-center min-h-[500px]">
            <Saleschart data={revenue} />
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-screen-xl px-4 mt-16">
        <div className=" bg-white cursor-pointer dark:bg-gray-800 p-1 md:p-8 rounded-2xl shadow-xl flex flex-col justify-center min-h-[500px]">
        <Barchart data={orders}/>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 ">
          <div className="kpi-card cursor-pointer flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
              <div className="text-xl xs:text-md md:text-3xl font-bold text-blue-600 dark:text-blue-300">{totalItems.toLocaleString('en-IN')}</div>
              <div className="text-lg xs:text-sm md:text-xl text-gray-800 dark:text-gray-200 mt-2">Products Sold</div>
              <div className="text-sm text-gray-500">Past 30 days</div>
            </div>

            <div className="kpi-card cursor-pointer flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 xs:p-1 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
              <div className="text-xl xs:text-md md:text-3xl font-bold text-blue-600 dark:text-blue-300">{(totalItems/30).toLocaleString('en-IN', {maximumFractionDigits:0})}</div>
              <div className="text-lg xs:text-sm md:text-xl text-gray-800 dark:text-gray-200 mt-2">Daily Product Sales</div>
              <div className="text-sm text-gray-500">Past 30 days</div>
            </div>

            <div className="kpi-card cursor-pointer flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
              <div className="text-xl xs:text-md md:text-3xl font-bold text-blue-600 dark:text-blue-300">{totalOrdersDelivered.length}</div>
              <div className="text-lg xs:text-sm md:text-xl text-gray-800 dark:text-gray-200 mt-2">Orders Delivered</div>
              <div className="text-sm text-gray-500">Past 30 days</div>
            </div>

            <div className="kpi-card cursor-pointer flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-4 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105">
              <div className="text-xl xs:text-md md:text-3xl font-bold text-yellow-600 dark:text-yellow-300">{products.length}</div>
              <div className="text-lg xs:text-sm md:text-xl text-gray-800 dark:text-gray-200 mt-2">Total Products</div>
              <div className="text-sm text-gray-500">Listed</div>
            </div>
            
        </div>
        </div>
        <div className="w-full max-w-screen-xl px-4 mt-16 flex flex-col items-center gap-10">
          <div className=" text-gray-800 dark:text-gray-200 font-medium text-3xl">
 
       Product Categories           
          </div>
          <div className="cursor-pointer grid grid-cols-2 md:grid-cols-4 px-2  gap-12  font-medium ">
       {
        categories.map((category)=>{
          return <div key={category} className="bg-white w-auto dark:bg-gray-800  px-4 text-gray-800 dark:text-gray-200 uppercase  text-center text-md md:text-xl  py-2  rounded-md shadow-xl hover:shadow-2xl transition transform hover:scale-105">{category}</div>
        })
       }</div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 w-full max-w-screen-xl px-4 mt-16">
        <div className="relative overflow-x-auto max-w-full bg-white dark:bg-gray-800   p-4 rounded-xl " >
        
        <ProductRatingTable products={products}/>
        </div>
        </div>
        <div className="grid-cols-1 gap-8 w-full max-w-screen-xl px-4 mt-16">
          <div className="relative overflow-x-auto max-w-full bg-white dark:bg-gray-800 p-4 rounded xl">
          <StockDataTable data={inventory} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
