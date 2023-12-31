"use client"

import Link from "next/link"
import { CustomButton, Pagination } from "@/components/shared"
import { useUsers } from "@/hooks/useUsers"
import { useState, useEffect } from "react"
import { useLoading } from "@/hooks/useLoading"
import ReactPaginate from 'react-paginate'

const Utilisateurs = () => {
    const { users } = useUsers()
    const [user, setUser] = useState<any>()
    const filteredUsersAdmin = users && users.filter((item:any) => {
        return item.department === user?.data.department 
    })
    console.log(user)
    const [pageNumber, setpageNumber] = useState(0)
    const peopleperpage = 40
    const pagevisited = pageNumber * peopleperpage
    const displaypeople = user?.data.role === "responsable" ? filteredUsersAdmin && filteredUsersAdmin.slice(pagevisited, pagevisited + peopleperpage) : users && users.slice(pagevisited, pagevisited + peopleperpage)
    const pagecount = Math.ceil(displaypeople && displaypeople.length / peopleperpage)
  
    const changePage = ({ selected }: any) => {
      setpageNumber(selected)
    }

    const { dispatch } = useUsers()
    const { setLoading } = useLoading()

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
            title: "Nom et Prénom"
        },
        {
            title: "Email"
        },
        {
            title: "Role"
        },
        {
            title: "Actions"
        }
    ]

    const handleDelete = async (user:any) => {
        const hasConfirmed = confirm("Are you sure you want to delete this Department ?")

        if(hasConfirmed){
            try{
                await fetch(`/api/users/${user._id.toString()}`,{
                    method: 'DELETE'
                })

                const filteredPosts = users && users.filter((item:any) => item._id !== user._id)


                dispatch({
                    type:'SET_USER',
                    payload:filteredPosts
                })
            }
            catch(error){
                console.log(error)
            }
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
          const res = await fetch('/api/users')
          const data = await res.json()
    
          if(res.ok){
            dispatch({
                type:'SET_USER',
                payload:data
            })
          }
        }
    
        fetchUsers()
    }, [])

    return (
        <section className='py-10'>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold capitalize text-gray-500'>
                    Notre Utilisateurs
                </h1>
                {
                    user && user.data.role === "RH" && (
                        <div>
                            <Link href="/Utilisateurs/create">
                                <CustomButton
                                    type='button'
                                    title="Ajouter"
                                />
                            </Link>
                        </div>
                    )
                }
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
                            displaypeople && displaypeople.map((item: any) => (
                                <tr key={item._id} className="text-gray-700">
                                    <td className="px-4 py-4 border">
                                        <div className="flex items-center text-sm">
                                            <div>
                                                <p className="font-semibold text-black">{item.fullName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-xs border">
                                        <span className="flex items-center text-sm">
                                            {item.email}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-xs border">
                                        <span className="px-3 py-1 font-semibold leading-tight text-white bg-[#FF2366] rounded-full">
                                            {item.role}
                                        </span>
                                    </td>

                                    <td className="px-4 py-4 text-ms font-semibold border">
                                        <div className='flex items-center gap-8'>
                                            <span className='underline text-sm cursor-pointer' onClick={() => handleDelete(item)}>
                                                Supprimer
                                            </span>
                                            {/* <Link href={`/Utilisateurs/${item._id}`}>
                                                <span className='underline text-sm cursor-pointer' onClick={() => handleDelete(item)}>
                                                    Modifier
                                                </span>
                                            </Link> */}
                                            {/* <Link href={`/Demandes/${item._id}`}>
                                                <span className='underline text-sm cursor-pointer'>
                                                    Modifier
                                                </span>
                                            </Link>
                                            <span className='underline text-sm cursor-pointer'>
                                                Supprimer
                                            </span> */}
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

export default Utilisateurs