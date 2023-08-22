"use client"

import { useState } from 'react'
import { CustomButton, CustomInput } from '@/components/shared'
import CustomMenu from '@/components/shared/CustomMenu'
import { useDepartment } from '@/hooks/useDepartment'
import { useRouter } from 'next/navigation'

const CreateUser = () => {
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('Admin')
    const [department, setDepartment] = useState('')
    const [days, setDays] = useState('')

    const { departments } = useDepartment()
    const router = useRouter()

    const Roles = [
        {
            title: "admin"
        },
        {
            title: "user"
        }
    ]

    const CreateUser = async (e:any) => {
        e.preventDefault()

        setSubmitting(true)

        try {
            const res = await fetch(`/api/users/signup`, {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    fullName: fullName,
                    password: password,
                    role: role,
                    department: department,
                    days : days
                })
            })

            const data = await res.json()
            
            if(res.ok) {
                setEmail('')
                setFullName('')
                setPassword('')
                setRole('')
                setDepartment('')
                setDays('')

                // dispatch({
                //     type:'CREATE_USER',
                //     payload: data
                // })

                router.push('/Utilisateurs')
            }
        } catch (error) {
            console.log(error)
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <section className='py-12'>
            <h1 className='text-2xl font-bold'>
                Ajouter un Utilisateur
            </h1>
            <div>
                <form className='w-100' onSubmit={CreateUser}>
                    <div className='mt-10 flex flex-col space-y-8 items-start'>
                        <div className='flex flex-row gap-5'>    
                            <CustomInput
                                title='Email'
                                type="email"
                                state={email}
                                setState={setEmail}
                                width='w-full'
                            />
                            <CustomInput
                                title='Full Name'
                                type="text"
                                state={fullName}
                                setState={setFullName}
                                width='w-full'
                            />
                        </div>
                        <div className='flex flex-row gap-5'>    
                            <CustomInput
                                title='Password'
                                type="text"
                                state={password}
                                setState={setPassword}
                                width='w-full'
                            />
                            <CustomInput
                                title='Days'
                                type="text"
                                state={days}
                                setState={setDays}
                                width='w-full'
                            />
                        </div>
                        <div className='flex flex-row gap-10'>
                            <CustomMenu
                                title="Departement"
                                state={department}
                                filters={departments}
                                setState={setDepartment}
                            />
                            <CustomMenu
                                title="Role"
                                state={role}
                                filters={Roles}
                                setState={setRole}
                            />
                        </div>
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

export default CreateUser