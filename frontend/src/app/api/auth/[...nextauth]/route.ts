import { authOptions } from "@/lib/authOptions";
import NextAuth from "next-auth";

/* export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("http://localhost:3001/api/user/login", {
            email: credentials?.email,
            password: credentials?.password,
          });

          const user = res.data.data;

          if (user && credentials?.email) {
            return {
              id: user.id,
              email: credentials.email, // Đảm bảo email là string
              accessToken: user.access_token,
              refreshToken: user.refresh_token,
            };
          }

          return null;
        } catch (error) {
          console.error("Error logging in:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.userId = user.id;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.userId as string,
          email: token.email as string,
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", 
  },
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,  // Tên cookie
      options: {
        httpOnly: true,    // Đảm bảo cookie chỉ có thể được truy cập qua HTTP, không qua JavaScript
        secure: process.env.NODE_ENV === "production", // Chỉ gửi cookie qua HTTPS khi môi trường sản xuất
        sameSite: "strict", // Bảo vệ chống CSRF
        path: "/",  // Cookie này chỉ hợp lệ cho toàn bộ trang web
      },
    },
  },
}; */

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
