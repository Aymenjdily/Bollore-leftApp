"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

const DemandeDetail = () => {
    const searchParams = useParams()
    const [demande, setDemande] = useState<any>(null)
    console.log(demande)

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

            <h1 className='text-3xl font-bold'>
                {demande && demande.title}
            </h1>
            <div className="my-5">
                <div className='flex my-5 flex-row gap-5'>
                    <div className='flex flex-row gap-4'>
                        <span className='text-gray-500'>Type: </span>
                        <span className='font-semibold'>{demande && demande.type}</span>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <span className='text-gray-500'>creator: </span>
                        <span className='font-semibold'>{demande && demande.creator.fullName}</span>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <span className='text-gray-500'>Department: </span>
                        <span className='font-semibold'>{demande && demande.department}</span>
                    </div>
                </div>
                <div className='flex my-5 flex-row gap-5'>
                    <div className='flex flex-row gap-4'>
                        <span className='text-gray-500'>DateDepart: </span>
                        <span className='font-semibold'>{demande && demande.dateDepart}</span>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <span className='text-gray-500'>DateRetour: </span>
                        <span className='font-semibold'>{demande && demande.dateRetour}</span>
                    </div>
                    <div className='flex flex-row gap-4'>
                        <span className='text-gray-500'>State: </span>
                        <span className='font-semibold'>{demande && demande.state}</span>
                    </div>
                </div>
            </div>
            <p className='w-96'>
            {demande && demande.reason}
            </p>
            <p className='mt-3'>
                Created at : {demande && demande.createdAt}
            </p>
        </section>
    )
}

export default DemandeDetail