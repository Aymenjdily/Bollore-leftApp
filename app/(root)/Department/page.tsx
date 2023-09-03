"use client"

import { CustomButton, Pagination } from '@/components/shared'
import { useDepartment } from '@/hooks/useDepartment'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import ReactPaginate from 'react-paginate'

const Page = () => {
    const { departments } = useDepartment()

    const [pageNumber, setpageNumber] = useState(0)
    const peopleperpage = 40
    const pagevisited = pageNumber * peopleperpage
    const displaypeople = departments && departments.slice(pagevisited, pagevisited + peopleperpage)
    const pagecount = Math.ceil(departments && departments.length / peopleperpage)
  
    const changePage = ({ selected }: any) => {
      setpageNumber(selected)
    }
  
    const { dispatch } = useDepartment()

    const headsDepartment = [
        {
            title: "Titre"
        },
        {
            title: "Tag"
        },
        {
            title: "Entreprise"
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

    useEffect(() => {
        const fetchDepartments = async () => {
            const res = await fetch('/api/department')
            const data = await res.json()
        
            if(res.ok){
              dispatch({
                  type:'SET_DEPARTMENT',
                  payload:data
              })
            }
        }

        fetchDepartments()
    }, [])

    return (
        <section className='py-10'>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold capitalize text-gray-500'>
                    Notre Départements
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
                            displaypeople && displaypeople.map((item: any) => (
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
                                    <td className="px-4 py-4 text-xs border">
                                        <span className="px-3 py-1 font-semibold leading-tight text-white bg-black rounded-full">
                                            #{item.company}
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
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={pagecount}
                        onPageChange={changePage}
                        containerClassName='flex mt-10 justify-end items-end gap-5'
                        previousLinkClassName='bg-black text-white px-2 py-2 rounded-xl'
                        nextLinkClassName='bg-black text-white px-2 py-2 rounded-xl'
                        activeClassName='text-[#FF2364] font-bold'
                    />
                </div>
            </div>
        </section>
    )
}

export default Page