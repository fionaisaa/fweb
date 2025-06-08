import { MongoDBAdapter } from "@auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getUser } from "../services/User";
import clientPromise from "@/lib/mongodb";
import NextAuth from "next-auth";
import type  { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) throw new Error("Email nuk ekziston");
        const user = await getUser(credentials.email);
        if (!user) throw new Error("Email nuk ekziston");

        const isValid = await compare(credentials?.password, user.password);
        if (!isValid) throw new Error("Fjalëkalimi nuk është i saktë");

        return {
          id: user._id.toString(),
          email: user.email,
          emailVerified: user.emailVerified ?? null,
          role: user.role
        };
      },
    }),
  ],
  
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt" as "jwt",
  },
  
  callbacks: {
  async jwt({ token, user }: { token: JWT; user?: any }) {
    if (user) {
      token.name = user.name;
      token.email = user.email;
      token.role = user.role || "user";
      
    }
    return token;
  },
  async session({ session, token }: { session: Session; token: JWT }) {
    if ( session.user) {
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      (session.user as any).role= token.role;
       
    }
    return session;
  },
},

  secret: process.env.NEXTAUTH_SECRET,
};

// export { authOptions };
export default NextAuth(authOptions);
