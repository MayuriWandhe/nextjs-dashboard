"use client";

const Announcement = () =>{
    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-semibold">Announcement</h1>
                <span className="text-xs text-gray-400">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
                <div className="bg-lamaSkyLight rounded-md p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-medium">Lorem Ipsum</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md p-1">2025-01-01</span>
                    </div>
                    <p className="text-xs mt-1 text-gray-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                </div>
                <div className="bg-lamaPurpuleLight rounded-md p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-medium">Lorem Ipsum</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md p-1">2025-01-01</span>
                    </div>
                    <p className="text-xs mt-1 text-gray-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                </div>
                <div className="bg-lamaYellowLight rounded-md p-4">
                    <div className="flex justify-between items-center">
                        <h2 className="font-medium">Lorem Ipsum</h2>
                        <span className="text-xs text-gray-400 bg-white rounded-md p-1">2025-01-01</span>
                    </div>
                    <p className="text-xs mt-1 text-gray-400">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                </div>
            </div>
        </div>
    )
}

export default Announcement