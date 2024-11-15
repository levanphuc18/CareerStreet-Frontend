// Layout.tsx
import React, { ReactNode } from 'react';
import HeaderLoginAdmin from './HeaderLoginAdmin';

interface LayoutProps {
    children: ReactNode; // Chỉ định kiểu cho children
}

const LayoutLogin: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <HeaderLoginAdmin />
            <div className="p-4 text-xs ">
                {children}
            </div>     
        </div>
    );
};

export default LayoutLogin;
