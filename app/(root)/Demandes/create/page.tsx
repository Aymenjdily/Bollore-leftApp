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
    const [title, setTitle] = useState('')
    const [reason, setReason] = useState('')
    const [type, setType] = useState('')
    const [value, setValue]:any = useState({ 
        startDate: new Date(), 
        endDate: new Date().setMonth(11) 
    });
    const [user, setUser] = useState<any>()
    const router = useRouter()
    const { setLoading } = useLoading()
    const state = "pending"
    const { dispatch } = useDemande()

    const handleValueChange = (newValue:any) => {
        setValue(newValue); 
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

    const create = async (e:any) => {
        e.preventDefault();        

        try {
            const response = await fetch("/api/demande/new", {
              method: "POST",
              body: JSON.stringify({
                title: title,
                userId: user?.data._id,
                type: type,
                reason: reason,
                dateDepart: value.startDate,
                dateRetour: value.endDate,
                state: state,
                department: user?.data.department
              }),
            });

            const data = await response.json()
      
            if (response.ok) {
                dispatch({
                    type:'SET_DEMANDE',
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
            <form action="" onSubmit={create} className='w-[500px] shadow-lg p-10 rounded-xl'>
                <Link href="/Demandes" className="underline cursor-pointer font-bold text-[#FF2366]">
                    Retour
                </Link>
                <h1 className='text-2xl font-bold mt-10'>
                    Create Demande
                </h1>

                <div className='mt-10 flex flex-col gap-5'>
                    <div className='flex flex-row items-center gap-5'>
                        <CustomInput
                            title="Title"
                            type="text"
                            width='w-full'
                            setState={setTitle}
                            state={title}
                        />
                        <CustomInput
                            title="Reason"
                            type="text"
                            width='w-full'
                            setState={setReason}
                            state={reason}
                        />
                    </div>
                    <div className='flex flex-row items-center gap-5'>
                        <CustomMenu
                            title="Type"
                            filters={DemandeTypes}
                            setState={setType}
                            state={type}
                        />
                        <div className='flex items-center gap-10'>
                            <div className='flex flex-col gap-3'>
                                <label htmlFor="" className='font-semibold'>
                                    Date départ et Retour
                                </label>
                                <Datepicker 
                                    primaryColor={"blue"} 
                                    value={value} 
                                    onChange={handleValueChange}
                                    containerClassName={""}
                                    inputClassName={"outline-none   py-3 bg-white text-black font-semibold px-8 border border-2 rounded-lg"}
                                /> 
                            </div>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <CustomButton
                            type="submit"
                            title="Ajouter"
                        />
                    </div>
                </div>
            </form>
        </section>
    )
}

export default CreateDemande