import prisma from "../../lib/prisma";
import CountChart from "./CountChart"
import { IoIosMore } from "react-icons/io";

const CountChartContainer = async () =>{

    const data = await prisma.student.groupBy({
        by : ['sex'],
        _count : true
    })

    const boys = data.find((d)=> d.sex === 'MALE')?._count || 0;
    const girls = data.find((d) => d.sex === 'FEMALE')?._count || 0;

    // console.log(boys, girls, data);
    
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
        {/* Title */}
        <div className='flex justify-between items-center'>
            <h1 className='text-lg font-semibold'>Student</h1>
            <IoIosMore />
        </div>

        {/* Chart */}
        <CountChart boys={boys} girls={girls}/>

        {/* Bottom */}
        <div className='flex justify-center gap-16'>
            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 rounded-full bg-lamaSky'></div>
                <div className='font-blod'>{boys}</div>
                <div className='text-xs text-gray-300'>Boys ({Math.round((boys/(boys+girls)) * 100)}%)</div>
            </div>

            <div className='flex flex-col gap-1'>
                <div className='w-5 h-5 rounded-full bg-lamaYellow'></div>
                <div className='font-blod'>{girls}</div>
                <div className='text-xs text-gray-300'>Girls ({Math.round((girls/(boys+girls)) * 100)}%)</div>
            </div>
        </div>

</div>
    )
}

export default CountChartContainer;