// Layout.tsx
import React, { ReactNode } from 'react';
import Header from './Header';
// import HomePage from '@/app/HomePage';
// import Banner from './Banner';
import Footer from './Footer';
// import HomePage from '@/app/HomePage';

interface LayoutProps {
    children: ReactNode; // Chỉ định kiểu cho children
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            {/* <Banner /> */}
            <div className="p-4 text-xs">
                {children}
            </div>
            <Footer />
            
        </div>
    );
};

export default Layout;
