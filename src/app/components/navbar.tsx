import Image from "next/image";
import { CiSearch } from "react-icons/ci";
import { LuMessageCircleMore } from "react-icons/lu";
import { GrAnnounce } from "react-icons/gr";
import { UserButton, useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Navbar = async () =>{
    // const user = await currentUser();
    // const { isSignedIn, user, isLoaded } = useUser()

    return (
        <div className="flex item-centre justify-between p-4">
            {/* Search bar */}
            <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
                <CiSearch />
                <input type="text" placeholder="Search..." className="w-[200px] p-2 bg-transparent outline-none" />
            </div>
            {/* Icons and users */}
            <div className="flex justify-centre gap-6 justify-end w-full">
                <div className="bg-white rounded-full w-7 h-7 pt-1 flex item-center justify-center cursor-pointer">
                    <LuMessageCircleMore />
                </div>
                <div className="bg-white rounded-full w-7 h-7 pt-1 flex item-center justify-center cursor-pointer">
                    <GrAnnounce />
                    <div className="absolute -top-1 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">1</div>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm leading-3 font-medium">Rushali Wandhe</span>
                    <span className="text-[10px] text-gray-500 text-right">Admin</span>

                    {/* <span className="text-[10px] text-gray-500 text-right">{user?.publicMetadata.role as string}</span> */}
                </div>
                {/* <Image src="/profile.png" alt="logo" width={32} height={32} className="rounded-full"/> */}
                <UserButton />
            </div>
        </div>
    )
}

export default Navbar