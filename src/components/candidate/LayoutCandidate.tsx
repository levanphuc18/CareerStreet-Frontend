// Layout.tsx
import React, { ReactNode } from 'react';
import Header from './Header';
import LocalMenu from './LocalMenu';
import Footer from '../Footer';

interface LayoutProps {
    children: ReactNode; // Chỉ định kiểu cho children
}

const LayoutCandidate: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <LocalMenu/>
            <div className="text-xs p-0">
                {children}
            </div>
            <Footer/>       
        </div>
    );
};

export default LayoutCandidate;
