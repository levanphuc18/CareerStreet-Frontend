import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authApiRequest from "./app/apiRequest/auth";

const authPaths = ["/login", "/register", "/admin/login", "/jobs"]; // Đường dẫn không yêu cầu đăng nhập
const adminPath = "/admin"; // Đường dẫn admin
const employerPath = "/employer"; // Đường dẫn employer
const candidatePath = "/"; // Đường dẫn candidate

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get("sessionToken")?.value;
  const username = request.cookies.get("username")?.value;
  let userRole = null;
  console.log("Middleware is running");

  // Kiểm tra người dùng đã đăng nhập và lấy vai trò
  if (username && sessionToken) {
    const roleData = await authApiRequest.roleid(username, sessionToken);
    console.log("Role Data:", roleData);
    userRole = roleData.payload.data; // Giả sử trả về ID vai trò (1 - admin, 2 - employer, 3 - candidate)
  }

  // Nếu chưa đăng nhập, đang truy cập trang `/admin` hoặc trang `/admin/*` (trừ `/admin/login`), chuyển hướng đến `/admin/login`
  if (
    !sessionToken &&
    pathname.startsWith(adminPath) &&
    pathname !== "/admin/login"
  ) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // Nếu chưa đăng nhập và không phải các trang không yêu cầu đăng nhập
  if (
    !sessionToken &&
    pathname !== "/" &&
    !authPaths.some((path) => pathname.startsWith(path))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Nếu đã đăng nhập và có vai trò người dùng
  if (sessionToken) {
    if (userRole === 1) {
      // Admin
      // Chỉ cho phép admin truy cập vào các trang bắt đầu với `/admin`
      if (!pathname.startsWith(adminPath)) {
        return NextResponse.redirect(new URL(adminPath, request.url));
      }
      // Không cho phép truy cập vào các trang authPaths
      if (authPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL(adminPath, request.url));
      }
    } else if (userRole === 2) {
      // Employer
      // Không cho phép truy cập vào trang admin
      if (pathname.startsWith(adminPath)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      // Cho phép truy cập vào các trang liên quan đến employer
      if (pathname !== employerPath && !pathname.startsWith(employerPath)) {
        return NextResponse.redirect(new URL(employerPath, request.url));
      }
      // Không cho phép truy cập vào các trang authPaths
      if (authPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL(employerPath, request.url));
      }
    } else if (userRole === 3) {
      // Candidate
      // Không cho phép truy cập vào trang admin hoặc employer
      if (pathname.startsWith(adminPath) || pathname.startsWith(employerPath)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      // Cho phép candidate truy cập "/jobs"
      if (pathname === "/jobs" || pathname.startsWith("/jobs")) {
        return NextResponse.next();
      }
      // Chuyển hướng về trang candidate nếu không phải trang đó
      if (pathname !== candidatePath && !pathname.startsWith(candidatePath)) {
        return NextResponse.redirect(new URL(candidatePath, request.url));
      }
      // Không cho phép truy cập vào các trang authPaths
      if (authPaths.some((path) => pathname.startsWith(path))) {
        return NextResponse.redirect(new URL(candidatePath, request.url));
      }
    }
  }

  // Tiếp tục với các yêu cầu hợp lệ khác
  return NextResponse.next();
}

// Cấu hình matcher để áp dụng middleware cho tất cả các đường dẫn
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
