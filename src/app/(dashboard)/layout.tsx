import Image from "next/image";
import Link from "next/link";
  
  export default function DashbaordLayout({ children, }: Readonly<{
    children : React.ReactNode
  }>) {
    return (
        <div className="h-screen flex"> 
          {/* LEFt */}
          <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] bg-red-200">
            <Link href="/" className="flex items-center justify-content-center gap-2">
              <Image src="/assets/logo.jpg" alt="logo" width={32} height={32} />
              <span className="hidden lg:block">SchoolLama</span>
            </Link>
          </div>

          {/* Right */}
          <div className="w-[86%] md:w-[92%] lg:w-[86%] xl:w-[86%] bg-blue-200">r</div>
        </div>
    );
  }
  