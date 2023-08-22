"use client"

import { Pagination } from "@/components/shared"
import { useDemande } from "@/hooks/useDemande"
import Link from "next/link"
import { useState } from "react"

const Demandes = () => {

    const { demandes } = useDemande()
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7
    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage
    const items = demandes && demandes.slice(firstIndex, lastIndex)
    const npage = Math.ceil(demandes && demandes.length / itemsPerPage)
    // @ts-ignore
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const changePage = (n:any) => {
        setCurrentPage(n)
    }

    const headsDemandes = [
        {
            title: "Name"
        },
        {
            title: "Département"
        },
        {
            title: "Type"
        },
        {
            title: "Actions"
        }
    ]

    return (
        <section className='py-10'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-bold capitalize text-gray-500'>
                    Demandes
                </h1>
            </div>
            <div className='mt-10'>
                <table className="w-full">
                    <thead>
                        <tr className="tracking-wide text-left text-gray-900 bg-gray-100 border-b border-gray-600">
                            {
                                headsDemandes.map((item) => (
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
                                            {item.department}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-xs border">
                                        <span className="px-3 py-1 font-semibold leading-tight rounded-full">
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-ms font-semibold border">
                                        <div className='flex items-center gap-8'>
                                            <Link href={`/Demandes/${item._id}`}>
                                                <span className='underline text-sm cursor-pointer'>
                                                    Voir la Demande
                                                </span>
                                            </Link>
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

export default Demandes