// Layout.tsx
import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from '../Footer';

interface LayoutProps {
    children: ReactNode; // Chỉ định kiểu cho children
}

const LayoutCandidate: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="p-4 text-xs ">
                {children}
            </div>
            <Footer/>       
        </div>
    );
};

export default LayoutCandidate;
