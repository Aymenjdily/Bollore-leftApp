"use client"

import { useLoading } from '@/hooks/useLoading';
import React from 'react'
import ReactLoading from 'react-loading';

const Loading = () => {
  const { loading } = useLoading()

  return (
    loading && (
      <div className='absolute bg-white z-10 w-full h-full flex items-center justify-center'>
        <ReactLoading
          type='spokes'
          color='#FF5789'
          width={100}
          height={100}
        />
      </div>
    )
  )
}

export default Loading