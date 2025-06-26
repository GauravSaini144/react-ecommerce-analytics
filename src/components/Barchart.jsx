import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import useTheme from './useTheme';
function Barchart({data}) {
  const isDark=useTheme();
  const dataCount=data.reduce((acc, order)=>{
    const date=new Date(order.createdAt).toISOString().split('T')[0];
    acc[date]=(acc[date]||0)+1;
    return acc;
},[]);
const orderPerDay=Object.entries(dataCount).map(([date, orders])=>{
  const getdate=new Date(date);
  const month=getdate.toLocaleString('en-US',{month:"short"});
  const day=getdate.getDate();
  const Newdate=`${month}${day}`;
  return {
   date:Newdate, orders
    
  }
});

  return (
    <div className='bg-white cursor-pointer dark:bg-gray-800 p-2 md:p-6  rounded-xl  w-full max-w-xl '>
       <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 ">Orders Per Day</h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Past 30 Days</p>

             <p className="text-md text-gray-800 dark:text-gray-200 mb-1">Total Orders</p>

       <h3 className="text-3xl font-bold mb-3 text-blue-600 dark:text-blue-300">{data.length}</h3>

      <ResponsiveContainer width="100%" height={300}>
      <BarChart data={orderPerDay} barCategoryGap="40%">
        <XAxis
          dataKey="date"
          axisLine={true}
          // tick={false}
          hide={true}
          // stroke={isDark ? 'white' : 'black'}

          
        />
        

        <YAxis hide={false} 
        stroke={isDark ? 'white' : 'black'}
         
        />
        <Tooltip cursor={{ fill: "transparent" } }

        contentStyle={{
          backgroundColor:isDark?'gray':'white'
        }}
       

        />
        
        <Bar
          dataKey="orders"
          fill="rgb(22, 232, 255)"     // blue color like the image
          radius={[10, 10, 0, 0]} // round top left & top right
          barSize={12}             // control thickness of bar
        />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
}

export default Barchart