import { ButtonP } from '@/types'

const CustomButton = ({ type, action, title }: ButtonP) => {
  return (
    <button type={type} onClick={action} className='bg-black hover:bg-black/80 duration-200 text-sm px-5 py-3 text-white font-semibold capitalize rounded-xl'>
        {title}
    </button>
  )
}

export default CustomButton