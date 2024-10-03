// Layout.tsx
import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from '../Footer';

interface LayoutProps {
    children: ReactNode; // Chỉ định kiểu cho children
}

const LayoutEmployer: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="text-xs p-0">
                {children}
            </div>
            <Footer/>       
        </div>
    );
};

export default LayoutEmployer;
