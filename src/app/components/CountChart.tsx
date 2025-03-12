"use client";

import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';
import { IoIosMore } from "react-icons/io";
import { BiMaleFemale } from "react-icons/bi";

const data = [
  {
    name: 'Total',
    count: 106,
    fill: 'white',
  },
  {
    name: 'Girls',
    count: 50,
    fill: '#FAE27C',
  },
  {
    name: 'Boys',
    count: 50,
    fill: '#C3EBFA',
  },
  
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};


 const CountChart = () =>{
    return (
        <div className='bg-white rounded-xl w-full h-full p-4'>
            {/* Title */}
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-semibold'>Student</h1>
                <IoIosMore />
            </div>

            {/* Chart */}
            <div className='relative w-full h-[75%]'>
                <ResponsiveContainer>
                    <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                    <RadialBar
                        label={{ position: 'insideStart', fill: '#fff' }}
                        background
                        dataKey="count"
                    />
                    </RadialBarChart>
                </ResponsiveContainer>
                <BiMaleFemale width={100} height={100} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-200' />

            </div>

            {/* Bottom */}
           <div className='flex justify-center gap-16'>
                  <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 rounded-full bg-lamaSky'></div>
                    <div className='font-blod'>1,234</div>
                    <div className='text-xs text-gray-300'>Boys (55%)</div>
                  </div>

                  <div className='flex flex-col gap-1'>
                    <div className='w-5 h-5 rounded-full bg-lamaYellow'></div>
                    <div className='font-blod'>1,234</div>
                    <div className='text-xs text-gray-300'>Girls (45%)</div>
                  </div>
           </div>

        </div>
    )
}

export default CountChart