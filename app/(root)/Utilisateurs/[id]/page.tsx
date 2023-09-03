"use client"

import { useState, useEffect } from 'react'
import { CustomButton, CustomInput } from '@/components/shared'
import CustomMenu from '@/components/shared/CustomMenu'
import { useDepartment } from '@/hooks/useDepartment'
import { useRouter } from 'next/navigation'
import { useUsers } from '@/hooks/useUsers'
import Link from 'next/link'
import { Menu } from '@headlessui/react'
import Image from 'next/image'
import { useParams } from 'next/navigation'

const UpdateUser = () => {
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState('')

    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [department, setDepartment] = useState('')

    const { dispatch } = useUsers()

    const { departments } = useDepartment()
    const router = useRouter()
    const searchParams = useParams()

    const Roles = [
        {
            title: "employé"
        },
        {
            title: "responsable"
        },
        {
            title: "RH"
        },
    ]

    useEffect(() => {
        const getDepartment = async () => {
            const res = await fetch(`/api/users/${searchParams.id}`)

            const data = await res.json()

            if(res.ok) {
                setEmail(data.email)
                setFullName(data.fullName)
                setPassword(data.password)
            }

            console.log(data)
        }

        if(searchParams.id) getDepartment()
    }, [searchParams.id])

    const CreateUser = async (e:any) => {
        e.preventDefault()

        setSubmitting(true)

        try {
            const res = await fetch(`/api/users/signup`, {
                method: "PATCH",
                body: JSON.stringify({
                    email: email,
                    fullName: fullName,
                    password: password,
                    role: role,
                    department: department,
                })
            })

            const data = await res.json()
            
            if(res.ok) {
                setEmail('')
                setFullName('')
                setPassword('')
                setRole('')
                setDepartment('')

                dispatch({
                    type:'CREATE_USER',
                    payload: data
                })

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
            <div>
                <form className='w-[500px] shadow-lg p-10 border-2 rounded-xl bg-white' onSubmit={CreateUser}>
                    <div className='flex items-center justify-between'>
                        <Link href="/Utilisateurs" className="underline cursor-pointer font-bold text-[#FF2366]">
                            Retour
                        </Link>
                        <h1 className='font-bold'>
                            Ajouter un Utilisateur
                        </h1>
                    </div>
                    <div className='mt-10 flex flex-col space-y-8 items-start'>
                            <CustomInput
                                title='Email'
                                type="email"
                                state={email}
                                setState={setEmail}
                                width='w-full'
                            />
                            <CustomInput
                                title='Nom et Prénom'
                                type="text"
                                state={fullName}
                                setState={setFullName}
                                width='w-full'
                            />
                            <CustomInput
                                title='Password'
                                type="text"
                                state={password}
                                setState={setPassword}
                                width='w-full'
                            />
                            <div className='flex items-center justify-start flex-col w-full gap-3 relative'>
                                <label htmlFor={""} className='w-full text-sm text-black'>
                                    Le Département
                                </label>
                                <Menu
                                    as="div"
                                    className="self-start relative w-full"
                                >
                                    <div>
                                    <Menu.Button className="flex justify-between items-center custom_menu-btn">
                                            {department || `Département`}
                                            <Image
                                                src="/down.svg"
                                                width={17}
                                                height={17}
                                                alt="down"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Menu.Items className="flex items-center justify-start custom_menu-items z-10">
                                        {
                                            departments && departments.map((item:any, index:any) => (
                                                <Menu.Item
                                                    key={index}
                                                >
                                                    <button
                                                        type='button'
                                                        value={item}
                                                        className='custom_menu-item'
                                                        onClick={() => setDepartment(item._id)}
                                                    >
                                                        {item.title}
                                                    </button>
                                                </Menu.Item>
                                            ))
                                        }
                                    </Menu.Items>
                                </Menu>
                            </div>
                                <CustomMenu
                                    title="Role"
                                    state={role}
                                    filters={Roles}
                                    setState={setRole}
                                />
                        <CustomButton
                            type='submit'
                            title="Ajouter"
                        />
                        {
                            submitting && (
                                <p className='text-xl text-green-500 mt-2'>
                                    en création...
                                </p>
                            )
                        }
                        {
                            error && (
                                <p className='text-red-500 text-xl mt-2'>
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

export default UpdateUser