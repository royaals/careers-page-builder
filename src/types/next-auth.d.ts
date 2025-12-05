import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      companyId?: string;
      companySlug?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    companyId?: string;
    companySlug?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    companyId?: string;
    companySlug?: string;
  }
}