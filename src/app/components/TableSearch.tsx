import { CiSearch } from "react-icons/ci";

const TableSearchPage = () =>{
    return (
        <div className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
            <CiSearch />
            <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none" />
        </div>
    )
}

export default TableSearchPage