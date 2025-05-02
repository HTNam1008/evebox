import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Trang chuyển hướng nếu chưa đăng nhập
  },
});

export const config = {
  matcher: ["/:path*", "/event/:path*"], // Các route cần bảo vệ
};
