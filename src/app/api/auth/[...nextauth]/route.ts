import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === "7empresaelcio@gmail.com" &&
          credentials?.password === "adm172839@"
        ) {
          return { id: "1", name: "Adm", email: "adm_@gmail.com" };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/adm/signin",
  },
  secret: process.env.NEXTAUTH_SECRET || "secret",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
