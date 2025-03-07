import { IoIosMore } from "react-icons/io";

const UserCard = ({type}:{type : string}) => {
    return (
            <div className="rounded-2xl odd:bg-lamaPurpule even:bg-lamaYellow p-4 flex-1 min-width-[130px]">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2024/25</span>
                    <IoIosMore />
                </div>
                <h1 className="text-2xl font-semibold my-4">1,234</h1>
                <span className="capitalize text-sm font-medium text-gray-500">{type}</span>
            </div>
    )
}

export default UserCard
