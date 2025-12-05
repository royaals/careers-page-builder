
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

   
    if (path.includes("/edit") || path.includes("/preview")) {
      const pathSlug = path.split("/")[1];
      const userCompanySlug = token?.companySlug;

      
      if (userCompanySlug && pathSlug !== userCompanySlug) {
        return NextResponse.redirect(
          new URL(`/${userCompanySlug}/edit`, req.url)
        );
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        
        if (
          path === "/" ||
          path === "/login" ||
          path === "/register" ||
          path.endsWith("/careers")
        ) {
          return true;
        }

       
        if (path.includes("/edit") || path.includes("/preview")) {
          return !!token;
        }

        return true;
      },
    },
  }
);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|uploads).*)",
  ],
};