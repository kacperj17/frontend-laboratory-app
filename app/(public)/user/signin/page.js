"use client";

import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useSearchParams, useRouter } from "next/navigation";

import { useState } from "react";

export default function SigninPage() {
  const auth = getAuth();
  const params = useSearchParams();
  const router = useRouter();
  const returnUrl = params.get("returnUrl");

  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const email = e.target.elements.email?.value;
    const password = e.target.elements.password?.value;

    if (!email || !password) {
      console.error("Email or Password is missing!");
      return;
    }

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;

            if (!user.emailVerified) {
                router.push("/user/verify");
            } else {
              router.push(returnUrl || "/user/myalbums");
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setErrorMessage(`Błąd logowania: ${errorMessage}`);
          });
      })
      .catch((error) => {
        setErrorMessage("Wystąpił problem z logowaniem. Spróbuj ponownie.");
      });
  };

  const handleCloseAlert = () => {
    setErrorMessage(null);
  };

  return (
    <div className="hero bg-base-200" style={{ height: "80vh" }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left px-5 max-w-screen-sm">
          <h1 className="text-5xl font-bold">Zaloguj się!</h1>
          <p className="py-6">
            Aby uzyskać dostęp do swojego konta, wprowadź swoje dane logowania
            poniżej. Jeśli jeszcze nie masz konta, możesz je założyć w kilka
            minut.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Hasło</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="hasło"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Logowanie
              </button>
            </div>
          </form>
        </div>
      </div>
      {errorMessage && (
        <div
          role="alert"
          className="alert alert-error mt-4 max-w-lg"
          style={{ zIndex: 2 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            onClick={handleCloseAlert}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
