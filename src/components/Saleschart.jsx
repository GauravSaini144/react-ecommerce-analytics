import React, { useEffect, useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import useTheme from './useTheme';
function Saleschart({data}) {
  const isDark=useTheme();
  
  const [revenueData, setRevenueData]=useState([]);
  const [select, setSelect]=useState('current');
  useEffect(()=>{
    function sortRevenueData(select){

    
      if(select==="current"){
        const currentMonth=new Date().getMonth();
  const curretYear=new Date().getFullYear();
  const currentMonthSales=data.filter((item)=>{
    const date=new Date(item.date);
    return date.getMonth()===currentMonth && date.getFullYear()===curretYear;
  });
        setRevenueData(currentMonthSales);
      }
      else if(select==="7days"){
const arr=[...data];
 arr.reverse();
 const newArr=[...arr];
 setRevenueData(newArr.slice(0,7).reverse());
      }
      else if(select==="30days"){
        setRevenueData(data);
      }

 
    }
 
   sortRevenueData(select);

  },[data, select]);
 
  
  
  const currentMonthRevenue=revenueData.reduce((acc, item)=>acc+item.revenue,0);
  return (
    <>
    
    <div className=" bg-white dark:bg-gray-800  p-2 md:p-6 rounded-xl   w-full max-w-xl">
      <div className='flex items-center gap-6 '>
      <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 ">Sales Chart</h2>
      <select name="" id="" onChange={(e)=>setSelect(e.target.value)} className='bg-white cursor-pointer text-gray-700 font-medium dark:bg-gray-800 dark:text-gray-200 px-3 py-1 border-2 outline-none' >
        <option className='cursor-pointer' value="current">This Month</option>
        <option className='cursor-pointer' value="7days">Last 7 Days</option>
        <option className='cursor-pointer' value="30days">Last 30 Days</option>
      </select>
      </div>
      <p className="text-sm text-gray-300 mb-4"></p>
      <h3 className="text-3xl font-bold mb-1 text-green-600 dark:text-green-300 flex items-center gap-2">{currentMonthRevenue.toLocaleString('en-IN')} ₹ <span className='text-sm bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-100 rounded-md p-1'>^ 4.2%</span></h3>
      <p className="text-sm text-gray-400 mb-6"></p>

       <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            stroke={isDark ? 'white' : 'black'}


          />
          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickFormatter={(val) => `${val.toLocaleString('en-IN')}₹`}
            stroke={isDark ? 'white' : 'black'}
          />
          <Tooltip formatter={(value) => `${value.toLocaleString('en-IN')}₹`} 
           contentStyle={{
          backgroundColor:isDark?'gray':'white'
        }} 
        itemStyle={{
          color:isDark?"#90EE90":"green"
        }}
            />

          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    </>
  )
}

export default Saleschart