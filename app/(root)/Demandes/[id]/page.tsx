"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { useLoading } from "@/hooks/useLoading"
import { useRouter } from "next/navigation"
import html2canvas from 'html2canvas'
import jsPDF from "jspdf"

const DemandeDetail = () => {
    const searchParams = useParams()
    const [demande, setDemande] = useState<any>(null)
    const getDate = new Date(demande && demande.createdAt)
    const creationDate = getDate.toLocaleString() 
    const { setLoading } = useLoading()
    const [user, setUser] = useState<any>()
    const router = useRouter()

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

    const update = async (state:string) => {
        // setSubmitting(true)

        if(!searchParams) return alert('Department Id not Found')

        try {
            const response = await fetch(`/api/demande/${searchParams.id}`, {
              method: "PATCH",
              body: JSON.stringify({
                state: state,
                validator: user?.data.fullName
              }),
            });

            const data = await response.json()
      
            if (response.ok) {
                // dispatch({
                //     type:'CREATE_DEPARTMENT',
                //     payload:data
                // })
                router.push("/Demandes");
            }
        } catch (error) {
            console.log(error);
        } finally {
            // setSubmitting(false)
        }
    }

    const downloadPdf = () => {
        const capture:any = document.querySelector('.Demande')
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png')
            const doc = new jsPDF({
                orientation: "landscape",
                unit: "in",
                format: [4, 2]
              })
            const compW = doc.internal.pageSize.getWidth()
            const compH = doc.internal.pageSize.getHeight()
            doc.addImage(imgData, 'PNG', 0, 0, compW, compH)
            doc.save('demande.pdf')
        })
    }

    return (
        <section className='py-12 flex flex-col'>
            <Link href="/Demandes" className="mb-10 underline cursor-pointer font-bold text-[#FF2366]">
                Retour
            </Link>

            <div className="Demande">
                <div className="px-4 sm:px-0">
                    <h3 className="text-base font-semibold leading-7 text-gray-900">{demande && demande._id}</h3>
                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{creationDate} </p>
                </div>
                <div className="mt-6 border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Type</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{demande && demande.type}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Date départ & fin</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{demande && demande.dateDepart} - {demande && demande.dateRetour}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Date Reprise</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{demande && demande.dateReprise}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Raison</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{demande && demande.reason}</dd>
                        </div>
                        {
                            demande && demande.hours && (
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900">Heures</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{demande && demande.hours}</dd>
                                </div>
                            )
                        }
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">Statue</dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{demande && demande.state}</dd>
                        </div>
                    </dl>
                </div>
            </div>

            {
                user && user.data.role === "responsable" && (
                    <div className="mt-12 flex items-center gap-8">
                        <button className="bg-green-600 px-8 py-3 text-white rounded-xl" onClick={() => update("accepter")}>
                            Accepter
                        </button>

                        <button onClick={() => update("refuser")} className="bg-red-600 px-8 py-3 text-white rounded-xl">Refuse</button>
                    </div>
                )
            }

            <div className="mt-10">
                <button onClick={downloadPdf} className="bg-black px-5 py-2 text-white rounded-xl">
                    Imprimer
                </button>
            </div>

        </section>
    )
}

export default DemandeDetail