"use client"

import { CustomButton, Pagination } from '@/components/shared'
import { useDepartment } from '@/hooks/useDepartment'
import { useState } from 'react'
import Link from 'next/link'

const Page = () => {
    const { departments } = useDepartment()
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7
    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage
    const items = departments && departments.slice(firstIndex, lastIndex)
    const npage = Math.ceil(departments && departments.length / itemsPerPage)
    // @ts-ignore
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const { dispatch } = useDepartment()

    const changePage = (n:any) => {
        setCurrentPage(n)
    }

    const headsDepartment = [
        {
            title: "Name"
        },
        {
            title: "Tag"
        },
        {
            title: "Actions"
        }
    ]

    const handleDelete = async (department:any) => {
        const hasConfirmed = confirm("Are you sure you want to delete this Department ?")

        if(hasConfirmed){
            try{
                await fetch(`/api/department/${department._id.toString()}`,{
                    method: 'DELETE'
                })

                const filteredPosts = departments && departments.filter((item:any) => item._id !== department._id)


                dispatch({
                    type:'SET_DEPARTMENT',
                    payload:filteredPosts
                })
            }
            catch(error){
                console.log(error)
            }
        }
    }

    return (
        <section className='py-10'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-bold capitalize text-gray-500'>
                    Department
                </h1>
                <div>
                    <Link href="/Department/create">
                        <CustomButton
                            type='button'
                            title="Ajouter"
                        />
                    </Link>
                </div>
            </div>
            <div className='mt-10'>
                <table className="w-full">
                    <thead>
                        <tr className="tracking-wide text-left text-gray-900 bg-gray-100 border-b border-gray-600">
                            {
                                headsDepartment.map((item) => (
                                    <th key={item.title} className="px-5 py-3 text-sm font-semibold">
                                        {item.title}
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {
                            items && items.map((item: any) => (
                                <tr key={item._id} className="text-gray-700">
                                    <td className="px-4 py-4 border">
                                        <div className="flex items-center text-sm">
                                            <div>
                                                <p className="font-semibold text-black">{item.title}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-xs border">
                                        <span className="px-3 py-1 font-semibold leading-tight text-white bg-[#FF2366] rounded-full">
                                            #{item.title}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-ms font-semibold border">
                                        <div className='flex items-center gap-8'>
                                            <Link href={`/Department/${item._id}/update`}>
                                                <span className='underline text-sm cursor-pointer'>
                                                    Modifier
                                                </span>
                                            </Link>
                                            <span className='underline text-sm cursor-pointer' onClick={() => handleDelete(item)}>
                                                Supprimer
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className='mt-16 flex items-end justify-end'>
                    <Pagination numbers={numbers} changePage={changePage} currentPage={currentPage} />
                </div>
            </div>
        </section>
    )
}

export default Page