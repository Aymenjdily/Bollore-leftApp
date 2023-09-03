"use client"

import { CustomButton, CustomInput } from "@/components/shared"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLoading } from "@/hooks/useLoading"

const page = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)
  const [success, setsuccess] = useState('')

  const router = useRouter()
  const { setLoading } = useLoading()

  const onLogin = async (e:any) => {
    e.preventDefault()
    setLoading(true)

    try {
        const res = await fetch(`/api/users/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })

        const json = await res.json()
        
        if(res.ok){
            // const fetchUser = async () => {
            //     const res = await fetch('/api/users/getUser')
            //     const data = await res.json()
              
            //     if(res.ok){
            //         dispatch({
            //             type:'SET_USER',
            //             payload:data
            //         })
            //     }
            // }
            setError(null)
            setsuccess('You Connect Successfully')
            // fetchUser()
            router.push('/Demandes')
        }

        if(!res.ok){
            setsuccess('')
            setError(json.error)
        }
    } catch (error:any) {
        console.log("Login Failed",error)
    } finally {
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }
  }

  return (
    <section className='container md:px-10 px-5 gap-[50px] mx-auto flex items-center justify-center h-screen'>
        <div className='flex-1 flex h-full w-full bg-[#F6F6F6] items-center justify-center'>
          <div className="flex flex-col sm:gap-[100px] gap-[50px] sm:p-10 p-5 py-16">
            <Image
              src="/logo.png"
              alt="logo"
              width={300}
              height={200}
            />
            <form className="flex flex-col space-y-7" onSubmit={onLogin}>
              <div className="mb-5">
                <h1 className="sm:text-[44px] text-[25px] font-bold text-black">
                  se connecter à
                </h1>
                <p className="sm:text-[25px] font-bold text-black">
                  Votre compte
                </p>
              </div>
              <CustomInput
                title="email"
                type="email"
                width="md:w-[400px]"
                state={email}
                setState={setEmail}
              />
              <CustomInput
                title="password"
                type="password"
                width="md:w-[400px]"
                state={password}
                setState={setPassword}
              />
              {
                error && (
                  <p className="text-red-500 font-semibold">
                    {error}
                  </p>
                )
              }
              <CustomButton
                title="log in"
                type="submit"
              />
            </form>
          </div>
        </div>
        <div className='relative flex-1 h-full w-full lg:flex hidden items-center justify-center'>
          <Image
            src="/login.png"
            alt="login"
            fill
            className="object-cover"
          />
        </div>
    </section>
  )
}

export default page