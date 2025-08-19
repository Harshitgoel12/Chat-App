
import { IoIosChatboxes } from "react-icons/io";

const DefaultPage = ({data}) => {
  console.log(data)
  return (
    <div className={`hidden md:flex bg-white/10  ${data?"w-screen":"w-full"} backdrop-blur-md rounded-xl p-4 text-black  justify-center items-center shadow-lg flex-col`}>
  <IoIosChatboxes className='text-6xl text-purple-700 text-shadow-purple-500'/>
  <h1 className='text-2xl font-bold text-white text-shadow-purple-700'>{data?data:"Chat Anytime,Anywhere"}</h1>
</div>
  )
}

export default DefaultPage
