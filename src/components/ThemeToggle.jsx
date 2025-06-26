import React, {useEffect, useState} from 'react'

function ThemeToggle() {
    const [isDark, setIsDark]=useState(true);
    useEffect(()=>{
      const savedTheme=localStorage.getItem('theme');
      if(savedTheme==="light"){
        document.documentElement.classList.remove('dark');
        setIsDark(false);
      }
      else {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      }
    },[]);
    const toggleTheme=()=>{
        if(isDark){
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else{
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        setIsDark(!isDark);
    }
  return ( 
    <button onClick={toggleTheme} 
    className='p-3 px-4 rounded-md bg-gray-200 dark:bg-black outline-none text-black dark:text-white'
    >
{
  isDark?<i className="fa-regular fa-sun fa-2xl"></i>:<i className="fa-solid fa-moon fa-2xl"></i>
}
    </button>
  )
}

export default ThemeToggle