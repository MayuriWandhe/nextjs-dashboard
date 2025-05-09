import Image from "next/image";
import Link from "next/link";
import Menu from "../components/menu";
import Navbar from "../components/navbar";
import { ToastContainer } from "react-toastify";

  export default function DashbaordLayout({ children, }: Readonly<{
    children : React.ReactNode
  }>) {
    return (
        <div className="h-screen flex"> 
          {/* LEFt */}
          <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
            <Link href="/" className="flex items-center justify-content-center lg:justify-start gap-2">
              <Image src="/logo.jpg" alt="logo" width={32} height={32} />
              <span className="hidden lg:block text-xl font-semibold">SchooLama</span>
            </Link>
            <Menu/>
          </div>

          {/* Right */}
          <div className="w-[86%] h-[100%] md:w-[92%] lg:w-[86%] xl:w-[86%] bg-[#F7F8FA] overflow-scroll flex flex-col">
            <Navbar/>
            {children}
          </div>
        </div>
    );
  }
  