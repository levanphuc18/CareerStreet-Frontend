// Layout.tsx
import React, { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode; // Chỉ định kiểu cho children
}

const LayoutEmployer: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex bg-gray-100">
      {/* Nội dung chính */}
      <Sidebar />
      <div className="flex-grow h-screen overflow-y-auto hide-scrollbar text-xs p-0">
        <div className="flex flex-col flex-1 hide-scrollbar">
          <Header />
        </div>
        {children}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default LayoutEmployer;
