"use client"

import Link from "next/link"
import { CustomButton, Pagination } from "@/components/shared"
import { useUsers } from "@/hooks/useUsers"
import { useState, useEffect } from "react"
import { useLoading } from "@/hooks/useLoading"

const Utilisateurs = () => {
    const { users } = useUsers()
    const [user, setUser] = useState<any>()
    const filteredUsersAdmin = users && users.filter((item:any) => {
        return item.department === user?.data.department
    })
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7
    const lastIndex = currentPage * itemsPerPage
    const firstIndex = lastIndex - itemsPerPage
    const items = user && user.data.role === "super admin" ? users && users.slice(firstIndex, lastIndex) : filteredUsersAdmin && filteredUsersAdmin.slice(firstIndex, lastIndex)
    const npage = user && user.data.role === "super admin" ? Math.ceil(users && users.length / itemsPerPage) : Math.ceil(filteredUsersAdmin && filteredUsersAdmin.length / itemsPerPage)
    // @ts-ignore
    const numbers = [...Array(npage + 1).keys()].slice(1)

    const { dispatch } = useUsers()
    const { setLoading } = useLoading()

    const changePage = (n:any) => {
        setCurrentPage(n)
    }

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
            title: "Name"
        },
        {
            title: "Role"
        },
        {
            title: "Département"
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

    return (
        <section className='py-10'>
            <div className='flex justify-between items-center'>
                <h1 className='text-xl font-bold capitalize text-gray-500'>
                    Utilisateurs
                </h1>
                {
                    user && user.data.role === "super admin" && (
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
                            items && items.map((item: any) => (
                                <tr key={item._id} className="text-gray-700">
                                    <td className="px-4 py-4 border">
                                        <div className="flex items-center text-sm">
                                            <div>
                                                <p className="font-semibold text-black">{item.fullName}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-xs border">
                                        <span className="px-3 py-1 font-semibold leading-tight text-white bg-[#FF2366] rounded-full">
                                            {item.role}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-xs border">
                                        <span className="px-3 py-1 font-semibold leading-tight rounded-full">
                                            {item.department}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-ms font-semibold border">
                                        <div className='flex items-center gap-8'>
                                            <span className='underline text-sm cursor-pointer' onClick={() => handleDelete(item)}>
                                                Supprimer
                                            </span>
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
                    <Pagination numbers={numbers} changePage={changePage} currentPage={currentPage} />
                </div>
            </div>
        </section>
    )
}

export default Utilisateurs