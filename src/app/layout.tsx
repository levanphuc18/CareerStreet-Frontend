"use client";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

import localFont from "next/font/local";
import "./globals.css";
import { usePathname } from "next/navigation"; // Import usePathname

import Layout from "@/components/Layout";
import LayoutCandidate from "@/components/candidate/LayoutCandidate";
import ErrorPage from "@/components/ErrorPage";
import LayoutJobs from "@/components/jobs/LayoutJobs";
import LayoutEmployer from "@/components/employer/LayoutEmployer";
import LayoutLogin from "@/components/candidate/LayoutLogin";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  // Kiểm tra đường dẫn hiện tại
  const isHomePage = pathname === "/"; // Đường dẫn cho trang home
  const isCandidatePage = pathname.startsWith("/candidate") || pathname.startsWith("/admin"); // Kiểm tra nếu đường dẫn bắt đầu bằng "/candidate"
  const isJobsPage = pathname.startsWith("/jobs") ||pathname.startsWith("/test"); // Kiểm tra nếu đường dẫn bắt đầu bằng "/jobs"
  const isEmployerPage = pathname.startsWith("/employer"); // Kiểm tra nếu đường dẫn bắt đầu bằng "/jobs"
  const isLoginPage = pathname.startsWith("/login") || pathname.startsWith("/register"); // Kiểm tra nếu đường dẫn bắt đầu bằng "/jobs"


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {isHomePage ? (
          <Layout>
            {children} {/* Trả về nội dung con */}
          </Layout>
        ) : isCandidatePage ? ( // Kiểm tra nếu đường dẫn là một trang ứng viên
          <LayoutCandidate>
            {children} {/* Trả về nội dung con */}
          </LayoutCandidate>
        ): isJobsPage ? ( // Kiểm tra nếu đường dẫn là một trang jobs
          <LayoutJobs>
            {children} {/* Trả về nội dung con */}
          </LayoutJobs>
        ): isEmployerPage ? ( // Kiểm tra nếu đường dẫn là một trang nhà tuyển dụng
          <LayoutEmployer>
            {children} {/* Trả về nội dung con */}
          </LayoutEmployer>
        ): isLoginPage ? ( // Kiểm tra nếu đường dẫn là một trang đăng nhập
          <LayoutLogin>
            {/* <Header/> */}
            {children} {/* Trả về nội dung con */}
            {/* <Footer/> */}
          </LayoutLogin>
        ) : (
          <ErrorPage /> // Nếu không phải là trang home hoặc trang ứng viên, hiển thị trang lỗi
        )}
      </body>
    </html>
  );
}
