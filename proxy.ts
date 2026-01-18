// import { NextRequest, NextResponse } from "next/server";
// import { checkSession } from "./lib/api/serverApi";

// const privateRoutes = ["/profile", "/notes"];
// const authRoutes = ["/sign-in", "/sign-up"];

// export async function proxy(request: NextRequest) {
//   const { nextUrl } = request;

//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;

//   let isAuthenticated = !!accessToken;

//   if (!isAuthenticated && refreshToken) {
//     try {
//       const response = await checkSession();

//       if (response.status === 200) {
//         isAuthenticated = true;

//         const responseRedirect = NextResponse.redirect(new URL(request.url));

//         const setCookie = response.headers["set-cookie"];
//         if (setCookie) {
//           responseRedirect.headers.set("set-cookie", setCookie.join(", "));
//         }

//         const isAuthRoute = authRoutes.some((route) =>
//           nextUrl.pathname.startsWith(route),
//         );

//         if (isAuthRoute) {
//           const toHome = NextResponse.redirect(new URL("/", request.url));
//           if (setCookie) toHome.headers.set("set-cookie", setCookie.join(", "));
//           return toHome;
//         }

//         return responseRedirect;
//       }
//     } catch {
//       console.error("Session refresh failed in proxy");
//     }
//   }

//   const isPrivateRoute = privateRoutes.some((route) =>
//     nextUrl.pathname.startsWith(route),
//   );
//   const isAuthRoute = authRoutes.some((route) =>
//     nextUrl.pathname.startsWith(route),
//   );

//   if (isPrivateRoute && !isAuthenticated) {
//     return NextResponse.redirect(new URL("/sign-in", request.url));
//   }

//   if (isAuthRoute && isAuthenticated) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
// };
import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

export async function proxy(request: NextRequest) {
  const { nextUrl } = request;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isAuthenticated = !!accessToken;

  if (!isAuthenticated && refreshToken) {
    try {
      const response = await checkSession();

      if (response.status === 200) {
        const responseRedirect = NextResponse.redirect(new URL(request.url));

        const setCookie = response.headers["set-cookie"];
        if (setCookie) {
          responseRedirect.headers.set("set-cookie", setCookie.join(", "));
        }

        const isAuthRoute = authRoutes.some((route) =>
          nextUrl.pathname.startsWith(route),
        );

        if (isAuthRoute) {
          const toHome = NextResponse.redirect(new URL("/", request.url));
          if (setCookie) toHome.headers.set("set-cookie", setCookie.join(", "));
          return toHome;
        }

        return responseRedirect;
      }
    } catch {
      console.error("Session refresh failed in proxy");
    }
  }

  const isPrivateRoute = privateRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );
  const isAuthRoute = authRoutes.some((route) =>
    nextUrl.pathname.startsWith(route),
  );

  if (isPrivateRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
