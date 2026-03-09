import React,{useState} from "react";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";

const TrainerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
   <div className="w-full">
     <div className="flex h-screen bg-gray-100 overflow-hidden">
    
          <Sidebar
            role="TRAINER"
            title="Trainer Panel"
              isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
     
       
     
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>

   </div>
  );
};

export default TrainerLayout;
