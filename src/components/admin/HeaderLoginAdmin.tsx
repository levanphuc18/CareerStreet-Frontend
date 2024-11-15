"use client";

export default function Header() {
  return (
    <header className="bg-slate-200 py-2 shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center w-[92%] mx-auto">
        {/* Giữ lại chỉ viền header */}
        <div className="flex items-center">
          <div className="text-xs">
            {/* Giao diện khi người quản lý chưa đăng nhập */}
            <div className="flex items-center gap-4">
              
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
