"use client"

import { CustomButton, CustomInput } from '@/components/shared'
import { useDepartment } from '@/hooks/useDepartment'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CreateDepartment = () => {
    const [title, setTitle] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const { dispatch } = useDepartment()
    const router = useRouter()

    const addDepartment = async (e: any) => {
        e.preventDefault();
        setSubmitting(true)

        try {
            const response = await fetch("/api/department/new", {
              method: "POST",
              body: JSON.stringify({
                title: title
              }),
            });

            const data = await response.json()
      
            if(!response.ok) {
                setError(data.error)
            }

            if (response.ok) {
                dispatch({
                    type:'CREATE_DEPARTMENT',
                    payload:data
                })
                setTitle('')
            }

        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
            router.push('/Department')
        }
    }


    return (
        <section className='py-12'>
            <h1 className='text-2xl font-bold'>
                Ajouter un Département
            </h1>
            <div>
                <form className='w-96' onSubmit={addDepartment}>
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
                            title="Ajouter"
                        />
                        {
                            submitting && (
                                <p className='text-xl'>
                                    en création...
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

export default CreateDepartment