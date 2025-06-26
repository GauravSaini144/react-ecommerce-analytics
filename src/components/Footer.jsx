import React from 'react'
import github from "../assets/github.svg"
import linkedin from "../assets/linkedin.svg"
function Footer() {
  return (
    <>
    
    <div className="w-full bg-slate-100 py-6 dark:bg-slate-900 mt-6">
        <div className='max-w-screen-xl mx-auto  px-4 flex flex-col gap-4'>

            <div>
                <span className='text-sm'>Created By &nbsp;</span> <span className='font-medium cursor-pointer text-lg text-gray700 dark:text-gray-100'>Gaurav Saini</span> 
            </div>
            <div className='flex gap-2'>
           <a href="https://github.com/GauravSaini144" target='_blank'>
           <img className='h-10 cursor-pointer ' src={github} alt="Github" target='_blank' />
           </a>
           <a href="https://in.linkedin.com/in/gaurav-saini-09b441230">
            <img className='h-10 cursor-pointer' src={linkedin} alt="Linkedin" />
           </a>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer