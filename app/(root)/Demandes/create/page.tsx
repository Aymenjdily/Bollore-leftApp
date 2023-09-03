"use client"

import { CustomButton, CustomInput, CustomMenu } from '@/components/shared'
import { DemandeTypes } from '@/constants'
import { useState, useEffect } from 'react'
import Datepicker from "react-tailwindcss-datepicker"; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLoading } from '@/hooks/useLoading';
import { useDemande } from '@/hooks/useDemande';

const CreateDemande = () => {
    const [reason, setReason] = useState('')
    const [dateDepart, setDateDepart] = useState(new Date())
    const [dateFin, setDateFin] = useState(new Date())
    const [dateReprise, setDateReprise] = useState(new Date())
    const [type, setType] = useState('')

    const [user, setUser] = useState<any>()
    const router = useRouter()
    const { setLoading } = useLoading()
    const state = "pending"
    const { dispatch } = useDemande()

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

    const create = async (e:any) => {
        e.preventDefault();        

        try {
            const response = await fetch("/api/demande/new", {
              method: "POST",
              body: JSON.stringify({
                userId: user?.data._id,
                type: type,
                reason: reason,
                dateDepart: dateDepart,
                dateRetour: dateFin,
                dateReprise: dateReprise,
                state: state,
                validator: "Non validator"
              }),
            });

            const data = await response.json()
      
            if (response.ok) {
                dispatch({
                    type:'CREATE_DEMANDE',
                    payload:data
                })
                router.push("/Demandes");
            }
        } catch (error) {
            console.log(error);
        }
        // } finally {
        //     setSubmitting(false)
        // }
    }

    return (
        <section className='py-12'>
            <form action="" onSubmit={create} className='w-[600px] border-2 shadow-lg p-10 rounded-xl'>
                <div className='flex justify-between mb-10'>
                    <Link href="/Demandes" className="underline cursor-pointer font-bold text-[#FF2366]">
                        Retour
                    </Link>
                    <h1 className='font-bold'>
                        Créer une demande
                    </h1>
                </div>

                <div className='flex flex-col gap-5'>
                    <div>
                        <CustomMenu
                            filters={DemandeTypes}
                            state={type}
                            setState={setType}
                            title='Type de demande'
                        />
                    </div>
                    <div className='flex items-center gap-5'>
                        <CustomInput
                            type='date'
                            state={dateDepart}
                            setState={setDateDepart}
                            title='Date de départ'
                        />
                        <CustomInput
                            type='date'
                            state={dateFin}
                            setState={setDateFin}
                            title='Date de fin'
                        />
                    </div>
                    <CustomInput
                        type='date'
                        state={dateReprise}
                        setState={setDateReprise}
                        title='Date de reprise'
                    />
                    {
                        type === "heures" && (
                            <CustomInput
                                isTextArea={true}
                                type=""
                                state={reason}
                                setState={setReason}
                                title='Raison ( champs obligatoire )'
                            />
                        )
                    }
                    <CustomButton
                        title='Ajouter'
                        type="submit"
                    />
                </div>
            </form>
        </section>
    )
}

export default CreateDemande