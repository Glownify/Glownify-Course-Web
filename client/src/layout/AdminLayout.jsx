import React from 'react'
import { Outlet } from "react-router-dom";
import Sidebar from '../components/common/Sidebar'

const AdminLayout = () => {
  return (
   <div className="flex h-screen bg-gray-100">
         <Sidebar role="ADMIN" title="Admin Panel" />
         <div className="flex-1 flex flex-col">
           {/* <header className="h-14 bg-white shadow flex items-center justify-between px-6">
             <h2 className="text-lg font-semibold text-gray-700">ADMIN </h2>
             <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-semibold">
               AD
             </div>
           </header> */}
           <main className="flex-1 overflow-y-auto">
             <Outlet />
           </main>
         </div>
       </div>
  )
}

export default AdminLayout