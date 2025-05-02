import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token
  },
  pages: {
    signIn: "/login", // Trang chuyển hướng nếu chưa đăng nhập
  },
});

export const config = {
  matcher: ["/:path*", "/event/:path*", "/my-profile"], // Các route cần bảo vệ
};
