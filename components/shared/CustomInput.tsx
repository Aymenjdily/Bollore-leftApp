import { InputP } from '@/types'
import React from 'react'

const CustomInput = ({ title, type, width, state, setState } : InputP) => {
  return (
    <div className='flex flex-col space-y-4'>
      <label htmlFor={title} className='capitalize text-gray-500'>
        {title}
      </label>
      <input type={type} value={state} placeholder={title} onChange={(e) => setState(e.target.value)} id={title} className={`border-2 border-gray-400 p-3 rounded-xl outline-none ${width}`} required />
    </div>
  )
}

export default CustomInput