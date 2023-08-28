"use client"

import DashCard from '@/components/DashCard'
import { useDemande } from '@/hooks/useDemande'
import { useDepartment } from '@/hooks/useDepartment'
import { useUsers } from '@/hooks/useUsers'

export default function Home() {
  const { users } = useUsers()
  const { departments } = useDepartment()
  const { demandes } = useDemande() 

  const CardsContent = [
    {
      title: "Utilisteurs",
      number: users && users.length
    },
    {
      title: "Demandes",
      number: demandes && demandes.length
    },
    {
      title: "Departements",
      number: departments && departments.length
    }
  ]

  return (
    <main className='py-10'>
      {/* <div>
        {
          CardsContent.map((item) => {
            const { title, number} = item
            return (
              <DashCard key={item.title} title={title} number={number} />
            )
          })
        }
      </div> */}
    </main>
  )
}
