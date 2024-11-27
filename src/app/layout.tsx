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
import LayoutAdmin from "@/components/admin/LayoutAdmin";
import { JobProvider } from "./context/JobContext";
import LayoutLoginAdmin from "@/components/admin/LayoutLoginAdmin";
import { CandidateProvider } from "./context/CandidateContext";
import { ApplyProvider } from "./context/ApplyContext";
import { AccountProvider } from "./context/AccountContext";

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
  const isCandidatePage = pathname.startsWith("/candidate"); // Kiểm tra nếu đường dẫn bắt đầu bằng "/candidate"
  const isJobsPage = pathname.startsWith("/jobs"); // Kiểm tra nếu đường dẫn bắt đầu bằng "/jobs"
  const isEmployerPage = pathname.startsWith("/employer"); // Kiểm tra nếu đường dẫn bắt đầu bằng "/jobs"
  const isLoginPage =
    pathname.startsWith("/login") || pathname.startsWith("/register"); // Kiểm tra nếu đường dẫn bắt đầu bằng "/jobs"
  const isAdminPage = pathname.startsWith("/admin"); // Kiểm tra nếu đường dẫn bắt đầu bằng "/admin"
  const isAdminLoginPage = pathname.startsWith("/admin/login"); // Kiểm tra nếu đường dẫn bắt đầu bằng "/admin"

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="scroll-m-0">
          {/* Các logic kiểm tra đường dẫn và bọc các Provider khác */}
          {isHomePage ? (
            <JobProvider>
              <Layout>{children}</Layout>
            </JobProvider>
          ) : isCandidatePage ? (
            <CandidateProvider>
              <ApplyProvider>
                <LayoutCandidate>{children}</LayoutCandidate>
              </ApplyProvider>
            </CandidateProvider>
          ) : isJobsPage ? (
            <ApplyProvider>
              <JobProvider>
                <LayoutJobs>{children}</LayoutJobs>
              </JobProvider>
            </ApplyProvider>
          ) : isEmployerPage ? (
            <ApplyProvider>
            <LayoutEmployer>{children}</LayoutEmployer>
            </ApplyProvider>
          ) : isAdminLoginPage ? (
            <LayoutLoginAdmin>{children}</LayoutLoginAdmin>
          ) : isAdminPage ? (
            <CandidateProvider>
              <AccountProvider>
                <JobProvider>
                  <LayoutAdmin>{children}</LayoutAdmin>
                </JobProvider>
              </AccountProvider>
            </CandidateProvider>
          ) : isLoginPage ? (
            <LayoutLogin>{children}</LayoutLogin>
          ) : (
            <ErrorPage />
          )}
        </div>
      </body>
    </html>
  );
}
