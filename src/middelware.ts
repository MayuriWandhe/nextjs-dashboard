import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { routeAccessMap } from "./lib/settings";

// export default clerkMiddleware();

// const isProtectedRoute = createRouteMatcher(['admin', '/teacher'])

// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) await auth.protect()
// })


const matchers = Object.keys(routeAccessMap).map(route =>({
  matcher : createRouteMatcher([route]),
  allowedRoles : routeAccessMap[route]
}))


console.log("matchers", matchers);

export default clerkMiddleware(async (auth, req) => {

})



export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};