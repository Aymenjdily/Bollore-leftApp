"use client"

import { CustomButton, Pagination } from "@/components/shared"
import { useDemande } from "@/hooks/useDemande"
import { useLoading } from "@/hooks/useLoading"
import Link from "next/link"
import ReactPaginate from 'react-paginate'
import { useState, useEffect } from "react"
import { CSVLink } from "react-csv";

const Demandes = () => {
    const [user, setUser] = useState<any>()
    const { demandes, dispatch } = useDemande()
    const filteredDemandestoUser = demandes && demandes?.filter((item: any) => {
        return item.creator._id === user?.data._id
    })
    const filteredDemandestoAdmin = demandes && demandes?.filter((item: any) => {
        return item.creator.department === user?.data.department
    })
    const filteredDemandestoSuperAdmin = demandes && demandes?.filter((item: any) => {
        return item.state === "accepter"
    })
    console.log(demandes)

    const { setLoading } = useLoading()
    const [pageNumber, setpageNumber] = useState(0)
    const peopleperpage = 40
    const pagevisited = pageNumber * peopleperpage
    const displaypeople = user && user?.data.role === "employé" && filteredDemandestoUser && filteredDemandestoUser.slice(pagevisited, pagevisited + peopleperpage) || user && user?.data.role === "responsable" && filteredDemandestoAdmin && filteredDemandestoAdmin.slice(pagevisited, pagevisited + peopleperpage) || user && user?.data.role === "RH" && filteredDemandestoSuperAdmin && filteredDemandestoSuperAdmin.slice(pagevisited, pagevisited + peopleperpage) 
    const pagecount = Math.ceil(displaypeople && displaypeople.length / peopleperpage)

    const sheetData = filteredDemandestoSuperAdmin
  
    const changePage = ({ selected }: any) => {
      setpageNumber(selected)
    }

    useEffect(() => {
        const fetchDemandes = async () => {
          const res = await fetch('/api/demande')
          const data = await res.json()
    
          if(res.ok){
            dispatch({
                type:'SET_DEMANDE',
                payload:data
            })
          }
        }
    
        fetchDemandes()
    }, [])

    useEffect(() => {
        setLoading(true)
        const fetchUser = async () => {
          const res = await fetch('/api/users/getUser')
          const data = await res.json()
    
          if(res.ok){
            setUser(data)
            setLoading(false)
          }
        }
    
        fetchUser()
    }, [])

    const headsDemandes = [
        {
            title: "Id"
        },
        {
            title: "Nom et Prénom"
        },
        {
            title: "Type"
        },
        {
            title: "Date départ"
        },
        {
            title: "Date fin"
        },
        {
            title: "Date reprise"
        },
        {
            title: "Date creation"
        },
        {
            title: "State"
        },
        {
            title: "Validateur"
        },
        {
            title: "Actions"
        }
    ]

    const handleDelete = async (demande:any) => {
        const hasConfirmed = confirm("Are you sure you want to delete this Department ?")

        if(hasConfirmed){
            try{
                await fetch(`/api/demande/${demande._id.toString()}`,{
                    method: 'DELETE'
                })

                const filteredPosts = demandes && demandes.filter((item:any) => item._id !== user._id)

                dispatch({
                    type:'SET_DEMANDE',
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
                <h1 className='font-bold capitalize text-gray-500'>
                    Mes Demandes
                </h1>

                {
                    sheetData && (
                    <CSVLink data={sheetData} filename={"Demandes.xls"} className="bg-green-800 px-8 py-2 flex items-center gap-5 text-white rounded-xl">
                        Export 
                    </CSVLink>
                    )
                }
            </div>
            <div className='mt-10'>
                <table className="w-full shadow-lg">
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
                            displaypeople && displaypeople.map((item: any) => {
                                const getDate = new Date(item.createdAt)
                                const creationDate = getDate.toLocaleString() 

                                return (
                                    <tr key={item._id} className="text-gray-700">
                                        <td className="px-4 py-4 border">
                                            <div className="flex items-center text-[12px]">
                                                <div>
                                                    <p className="text-black">{item._id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 border">
                                            <div className="flex items-center text-[12px]">
                                                <div>
                                                    <p className="text-black">{item.creator.fullName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-xs border">
                                            <span className="px-3 py-1 font-semibold leading-tight text-white bg-[#FF2366] rounded-full">
                                                {item.type}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-xs border">
                                            <span className="px-3 py-1 font-semibold leading-tight rounded-full">
                                                {item.dateDepart}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-xs border">
                                            <span className="px-3 py-1 font-semibold leading-tight rounded-full">
                                                {item.dateReprise}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-xs border">
                                            <span className="px-3 py-1 font-semibold leading-tight rounded-full">
                                                {creationDate}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-xs border">
                                            <span className={`px-3 py-1 font-semibold leading-tight ${item.state === "pending" && "bg-black text-white"} ${item.state === "accepter" && "bg-green-500 text-white"} ${item.state === "refuser" && "bg-red-500 text-white"} rounded-full`}>
                                                {item.state}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-xs border">
                                            <span className="px-3 py-1 font-semibold leading-tight rounded-full">
                                                {item.validator}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4 text-ms font-semibold border">
                                            <div className='flex items-center gap-8'>
                                                <Link href={`/Demandes/${item._id}`}>
                                                    <span className='underline text-sm cursor-pointer'>
                                                        Voir la Demande
                                                    </span>
                                                </Link>
                                                {
                                                    item.state !== "accepter" && item.state !== "refuser"  && (
                                                        <span className='underline text-sm cursor-pointer' onClick={() => handleDelete(item)}>
                                                            Supprimer
                                                        </span>
                                                    )
                                                }

                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
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

export default Demandes