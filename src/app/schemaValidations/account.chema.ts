import { z } from "zod";

// Khai báo schema cho Account
export const Account = z.object({
  username: z.string(),                // Tên đăng nhập (username)
  email: z.string().email(),           // Email, phải có định dạng email hợp lệ
  active: z.boolean(),                 // Trạng thái hoạt động (is_active)
  roleId: z.number(),                // Mật khẩu (password)
});

// Khai báo schema cho phản hồi của Account (AccountRes)
export const AccountRes = z.object({
  data: Account,                       // Dữ liệu là Account
  message: z.string(),                 // Thông báo kết quả
});

// Khai báo schema cho danh sách Account
export const AccountListRes = z.object({
  data: z.array(Account),              // Danh sách các tài khoản
  message: z.string(),                 // Thông báo kết quả
});

// Định nghĩa type dựa trên schema
export type AccountResType = z.TypeOf<typeof AccountRes>;
export type AccountListResType = z.TypeOf<typeof AccountListRes>;
