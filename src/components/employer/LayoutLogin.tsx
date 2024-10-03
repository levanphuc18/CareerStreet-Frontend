// Layout.tsx
import React, { ReactNode } from 'react';
import HeaderLogin from './HeaderLogin';
import Footer from '../Footer';

interface LayoutProps {
    children: ReactNode; // Chỉ định kiểu cho children
}

const LayoutLogin: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <HeaderLogin />
            <div className="p-4 text-xs ">
                {children}
            </div>
            <Footer/>       
        </div>
    );
};

export default LayoutLogin;
