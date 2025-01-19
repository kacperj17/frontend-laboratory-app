import { useAuth } from "../lib/AuthContext";
import Link from "next/link";

import { LuLogIn } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { IoCreateOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

export default function Links() {
  const { user } = useAuth();

  return (
    <>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        {/* Sidebar content here */}
        <li>
          <Link href="/">
            <IoHomeOutline /> Strona główna
          </Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href="/user/profile">
                <CgProfile /> Profil
              </Link>
            </li>
            <li>
              <Link href="/user/signout">
                <LuLogOut /> Wyloguj
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/user/register">
                <IoCreateOutline /> Rejestracja
              </Link>
            </li>
            <li>
              <Link href="/user/signin">
                <LuLogIn /> Zaloguj się
              </Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
}
