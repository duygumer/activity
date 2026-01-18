import type { AppProps } from "next/app";
import { AuthProvider } from "@/helpers/contexts/AuthContext";
import { useAuth } from "@/helpers/contexts/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "@/styles/globals.css";

const PUBLIC_ROUTES = ["/login", "/register"];

function ProtectedRoute({
  Component,
  pageProps,
  router,
}: AppProps & { router: any }) {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(router.pathname);

    if (!isAuthenticated && !isPublicRoute) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router.pathname]);

  if (isLoading) return null;

  return <Component {...pageProps} />;
}

function App({ Component, pageProps, router }: AppProps & { router: any }) {
  return (
    <AuthProvider>
      <ProtectedRoute
        Component={Component}
        pageProps={pageProps}
        router={router}
      />
    </AuthProvider>
  );
}

export default App;
