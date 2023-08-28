"use client"

import { CustomButton, CustomInput } from '@/components/shared'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation'
import { useDepartment } from '@/hooks/useDepartment'
import Link from 'next/link'

const UpdateDepartment = () => {
    const [title, setTitle] = useState('')
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
                title: title
              }),
            });

            const data = await response.json()
      
            if (response.ok) {
                dispatch({
                    type:'CREATE_DEPARTMENT',
                    payload:data
                })
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
            <Link href="/Department" className="underline cursor-pointer font-bold text-[#FF2366]">
                Retour
            </Link>
            <h1 className='text-2xl font-bold mt-10'>
                Ajouter un Département
            </h1>
            <div>
                <form className='w-96' onSubmit={update}>
                    <div className='mt-10 flex flex-col space-y-5 items-start'>
                        <CustomInput
                            title='Titre Département'
                            type="text"
                            state={title}
                            setState={setTitle}
                            width='w-full'
                        />
                        <CustomButton
                            type='submit'
                            title="Modifier"
                        />
                        {
                            submitting && (
                                <p className='text-xl'>
                                    en mise à jour...
                                </p>
                            )
                        }
                        {
                            error && (
                                <p className='text-red-500 text-xl'>
                                    {error}
                                </p>
                            )
                        }
                    </div>
                </form>
            </div>
        </section>
    )
}

export default UpdateDepartment