import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl; // Get the path of the current request

  // Check if the user is authenticated
  const isAuthenticated = request.cookies.get("token");
  console.log(isAuthenticated);

  // Redirect to login if not authenticated and trying to access a protected route
  if (!isAuthenticated && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Apply the middleware only to specific paths
export const config = {
  matcher: ["/dashboard/:path*"], // Protect all
};
