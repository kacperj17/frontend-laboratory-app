"use client";

import { useEffect, useState } from "react";
import { getAuth, signOut, sendEmailVerification } from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";

import Link from "next/link";

export default function VerifyEmail() {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const auth = getAuth();

    // Zapamiętanie adresu e-mail przed wylogowaniem
    if (user?.email) {
      setUserEmail(user.email);
    }

    sendEmailVerification(auth.currentUser);

    // Wylogowanie użytkownika
    signOut(auth)
      .then(() => {
        console.log("User signed out due to email verification required.");
      })
      .catch((error) => {
        console.error("Error signing out:", error.message);
      });
  }, [user]);

  return (
    <div className="hero bg-base-200" style={{ height: "80vh" }}>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Potrzebujesz weryfikacji emaila
          </h1>
          <p className="py-6">
            Twój adres email ({userEmail}) wymaga weryfikacji. Sprawdź swoją
            skrzynkę odbiorczą, aby zweryfikować swoje konto.
            <br />
            Po kliknięciu w link weryfikacyjny, będziesz mógł się zalogować.
          </p>

          <Link href="/">
            <button className="btn btn-primary">Strona główna</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
