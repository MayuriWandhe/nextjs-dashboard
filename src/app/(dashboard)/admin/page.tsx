import Announcement from "../../components/Announcment";
import AttendanceChart from "../../components/AttendanceChart";
import CountChart from "../../components/CountChart";
import EventCounter from "../../components/EventCounter";
import FinanceChart from "../../components/FinanceChart";
import UserCard from "../../components/UserCard";
import React from "react";

const AdminPage = () => {
    return (
        <div className="p-4 flex gap-4 flex-col md:flex-row">
            {/* LEFT */}
            <div className="w-full lg:w-2/3 flex flex-col gap-8">
                {/* User cards */}
                <div className="flex gap-4 justify-between flex-wrap">
                    <UserCard type="student" />
                    <UserCard type="teacher" />
                    <UserCard type="parent" />
                    <UserCard type="staff" />
                </div>

                {/* Middle Chard */}
                <div className="flex gap-4 flex-col lg:flex-row">
                    {/* CountChart */}
                    <div className="w-full lg:w-1/3 h-[450px]">
                        <CountChart />
                    </div>
                    {/* Attendance */}
                    <div className="w-full lg:w-2/3">
                        <AttendanceChart/>

                    </div>

                </div>
                {/* Bottom card */}
                <div className="w-full h-[500px]">
                    <FinanceChart />
                </div>
            </div>

            {/* Right */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
                <EventCounter />
                <Announcement />
            </div>
        </div>
    )
}

export default AdminPage