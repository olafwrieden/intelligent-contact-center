import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = ["/faq", "/login", "/api/auth/signin"].includes(
    nextUrl.pathname
  ); //PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (isPublicRoute && isAuthenticated)
    return Response.redirect(new URL("/dashboard", nextUrl));

  if (!isAuthenticated && !isPublicRoute)
    return Response.redirect(new URL("/login", nextUrl));
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
