"use client"

import { CustomButton, CustomInput, CustomMenu } from '@/components/shared'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useDepartment } from '@/hooks/useDepartment'
import Link from 'next/link'
import { Companies } from '@/constants'

const UpdateDepartment = () => {
    const [title, setTitle] = useState('')
    const [company, setCompany] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')
    const router = useRouter()
    const { dispatch } = useDepartment()

    const searchParams = useParams()

    useEffect(() => {
        const getDepartment = async () => {
            const res = await fetch(`/api/department/${searchParams.id}`)

            const data = await res.json()

            if(res.ok) {
                setTitle(data.title)
                setCompany(data.company)
            }
        }

        if(searchParams.id) getDepartment()
    }, [searchParams.id])

    const update = async (e: any) => {
        e.preventDefault();
        setSubmitting(true)

        if(!searchParams) return alert('Department Id not Found')

        try {
            const response = await fetch(`/api/department/${searchParams.id}`, {
              method: "PATCH",
              body: JSON.stringify({
                title: title,
                company: company
              }),
            });

            const data = await response.json()
      
            if (response.ok) {
                // dispatch({
                //     type:'CREATE_DEPARTMENT',
                //     payload:data
                // })
                router.push("/Department");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section className='py-12'>
            <div className='w-[600px] h-full border-2 shadow-lg p-10 rounded-xl'>
                <div className='flex justify-between items-center'>
                    <Link href="/Department" className="underline cursor-pointer font-bold text-[#FF2366]">
                        Retour
                    </Link>
                    <h1 className='font-bold'>
                        Ajouter un Département
                    </h1>
                </div>
                <div className='mt-16'>
                    <form className='' onSubmit={update}>
                        <div className='mt-10 flex flex-col space-y-5 items-start'>
                            <CustomInput
                                title='Titre Département'
                                type="text"
                                state={title}
                                setState={setTitle}
                                width='w-full'
                            />
                            <CustomMenu
                                title="L'Entreprise"
                                state={company}
                                setState={setCompany}
                                filters={Companies}
                            />
                            <div className='pt-10'>
                                <CustomButton
                                    type='submit'
                                    title="Modifier"
                                />
                            </div>
                            {
                                submitting && (
                                    <p className='text-xl mt-2 text-green-500'>
                                        en création...
                                    </p>
                                )
                            }
                            {
                                error && (
                                    <p className='text-red-500 mt-2 text-xl'>
                                        {error}
                                    </p>
                                )
                            }
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default UpdateDepartment