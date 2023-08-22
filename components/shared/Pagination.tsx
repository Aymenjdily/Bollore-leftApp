"use client"

const Pagination = ({ changePage, numbers, currentPage }: any) => {
    return (
        <nav className=''>
            <ul className='flex items-center gap-5'>
                {
                    numbers.map((n:any, i:any) => (
                        <li
                            className={`${currentPage === n ? 'bg-black px-4 py-2 rounded-xl font-semibold text-white' : 'hover:bg-black/50 duration-200 rounded-xl px-4 py-2 hover:text-white'} cursor-pointer`}
                            key={i}
                            onClick={() => changePage(n)}
                        >
                            {n}
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination