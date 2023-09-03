import { InputP } from '@/types'
import React from 'react'

const CustomInput = ({ title, type, width, state, setState, isTextArea } : InputP) => {
  return (
    <div className='flex flex-col space-y-4 w-full'>
      <label htmlFor={title} className=' text-sm text-black'>
        {title}
      </label>
      {
        isTextArea ? (
          <textarea value={state} onChange={(e) => setState(e.target.value)} id={title} className={`block w-full rounded-md border-0 py-2 pl-2 outline-none pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 `} required />
        ) : (
          <input type={type} value={state} onChange={(e) => setState(e.target.value)} id={title} className={`block w-full rounded-md border-0 py-2 pl-2 outline-none pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 `} required /> 
        )
      }
    </div>
  )
}

export default CustomInput