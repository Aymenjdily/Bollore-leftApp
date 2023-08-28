"use client"

import { CustomFieldProps } from '@/types'
import React,{ Fragment } from 'react'
import { Menu } from '@headlessui/react'
import Image from 'next/image'

const CustomMenu = ({
    title, state, filters, setState
} : CustomFieldProps) => {
  return (
    <div className='flex items-center justify-start flex-col w-full gap-3 relative'>
        <label htmlFor={title} className='w-full capitalize text-black'>
            {title}
        </label>
        <Menu
            as="div"
            className="self-start relative w-full"
        >
            <div>
               <Menu.Button className="flex justify-between items-center custom_menu-btn">
                    {state || `${title}`}
                    <Image
                        src="/down.svg"
                        width={17}
                        height={17}
                        alt="down"
                    />
                </Menu.Button>
            </div>
            <Menu.Items className="flex items-center justify-start custom_menu-items z-10">
                {
                    filters && filters.map((item, index) => (
                        <Menu.Item
                            key={index}
                        >
                            <button
                                type='button'
                                value={item}
                                className='custom_menu-item'
                                onClick={() => setState(item.title)}
                            >
                                {item.title}
                            </button>
                        </Menu.Item>
                    ))
                }
            </Menu.Items>
        </Menu>
    </div>
  )
}

export default CustomMenu