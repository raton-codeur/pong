import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface User {
  username: string;
  token: string;
  avatarUrl?: string;
}

interface HeaderUserMenuProps {
  user: User | null;
  onLogout: () => void;
}

export default function HeaderUserMenu({ user, onLogout }: HeaderUserMenuProps) {
  if (!user) return <Disconnected />;
  else return <Connected user={user} onLogout={onLogout} />;
}

function Disconnected() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="flex gap-4 mb-2 sm:mb-0">
      <Link
        href="/login"
        className={`block px-4 py-2 bg-gray-700 rounded transition-transform transform-gpu will-change-transform
          ${pathname === "/login" ? "ring ring-white scale-105" : "hover:scale-105"}
        `}
      >
        Se connecter
      </Link>
      <Link
        href="/register"
        className={`block px-4 py-2 bg-gray-700 rounded transition-transform transform-gpu will-change-transform
          ${pathname === "/register" ? "ring ring-white scale-105" : "hover:scale-105"}
        `}
      >
        Créer un compte
      </Link>
    </div>
  );
}

function Connected({ user, onLogout }: { user: User; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Événements pour fermer le menu
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const avatarUrl = user.avatarUrl || "/anonymous_avatar.png";

  return (
    <div className="relative mb-2 sm:mb-0" ref={ref}>
      <button
        type="button"
        className={`flex items-center gap-2 px-4 py-1 hover:bg-gray-700
          ${open ? "rounded-t bg-gray-700" : "rounded"}`}
        onClick={() => setOpen((v) => !v)}
      >
        <img
          src={avatarUrl}
          alt={`Avatar de ${user.username}`}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="max-w-[10rem] truncate">{user.username}</span>
        <img
          src="/arrow_full.png"
          alt="arrow"
          className={`w-3 transition-transform ${open ? "" : "-rotate-90"}`}
        />
      </button>

      {open && (
        <div className="absolute right-0 left-0 rounded-b bg-zinc-900 border border-white/10 overflow-hidden">
          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="block w-full px-4 py-2 text-center hover:bg-white/5"
          >
            Voir le profil
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="block w-full px-4 py-2 text-center text-red-500 hover:bg-white/5"
          >
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}
