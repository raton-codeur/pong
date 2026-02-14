import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import HeaderUserMenu from "./HeaderUserMenu";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<{ username: string; token: string } | null>(null);

  useEffect(() => {
    const updateUserFromStorage = () => {
      const token = localStorage.getItem("authToken");
      const username = localStorage.getItem("username");
      if (token && username) {
        setUser({ token, username });
      } else {
        setUser(null);
      }
    };

    updateUserFromStorage();

    const handleAuthEvent = () => {
      updateUserFromStorage();
    };

    window.addEventListener("auth:update", handleAuthEvent);
    window.addEventListener("storage", handleAuthEvent);

    return () => {
      window.removeEventListener("auth:update", handleAuthEvent);
      window.removeEventListener("storage", handleAuthEvent);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    setUser(null);
    window.dispatchEvent(new Event("auth:update"));
    void router.push("/");
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-gradient-to-br from-yellow-900 via-black to-sky-900 text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/20 backdrop-blur">
        <div className="flex items-center sm:flex-row sm:justify-between flex-col mx-auto max-w-5xl px-4 gap-4">
          <Link href="/" title="Accueil" className="group flex items-center">
            <img
              src="/42_white.png"
              alt="logo 42"
              className="py-4 w-10 group-hover:scale-105 transition-transform duration-200"
            />
            <span className="text-xl font-semibold tracking-wide group-hover:font-bold group-hover:tracking-wider transition-all duration-200">
              _TRANSCENDENCE
            </span>
          </Link>
          <HeaderUserMenu user={user} onLogout={handleLogout} />
        </div>
      </header>
      <main className="flex-1 flex">{children}</main>
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur">
        <div className="mx-auto max-w-5xl p-6 text-sm text-white/70 flex sm:flex-row sm:items-center sm:justify-between flex-col gap-3">
          <div>© {new Date().getFullYear()} ft_transcendence</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link className="hover:text-white transition" href="/privacy-policy">
              Politique de confidentialité
            </Link>
            <Link className="hover:text-white transition" href="/terms-of-service">
              Conditions d&apos;utilisation
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
