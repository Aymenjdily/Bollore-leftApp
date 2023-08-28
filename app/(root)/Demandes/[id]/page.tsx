"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useLoading } from "@/hooks/useLoading"

const DemandeDetail = () => {
    const searchParams = useParams()
    const [demande, setDemande] = useState<any>(null)
    const getDate = new Date(demande && demande.createdAt)
    const creationDate = getDate.toLocaleString() 
    const { setLoading } = useLoading()
    const [user, setUser] = useState<any>()

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

    useEffect(() => {
        const getDemande = async () => {
            const res = await fetch(`/api/demande/${searchParams.id}`)

            const data = await res.json()

            if(res.ok) {
                setDemande(data)
            }
        }

        if(searchParams.id) getDemande()
    }, [searchParams.id])

    return (
        <section className='py-12 flex flex-col'>
            <Link href="/Demandes" className="mb-10 underline cursor-pointer font-bold text-[#FF2366]">
                Retour
            </Link>

            <div className="">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">{demande && demande.title}</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{creationDate} | <span className="text-xl font-bold capitalize">{ demande && demande.state }</span></p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Type</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{demande && demande.type}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Date</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{demande && demande.dateDepart} - {demande && demande.dateRetour}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Département</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{demande && demande.department}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Reason</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{demande && demande.reason}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            {
                user && user.data.role === "admin" && (
                    <div className="mt-12 flex items-center gap-8">
                        <button className="bg-green-600 px-8 py-3 text-white rounded-xl">
                            Accepter
                        </button>

                        <button className="bg-red-600 px-8 py-3 text-white rounded-xl">Refuse</button>
                    </div>
                )
            }

        </section>
    )
}

export default DemandeDetail