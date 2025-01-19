"use client";

import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { useAuth } from "@/app/lib/AuthContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { user } = useAuth();
  const router = useRouter();

  const auth = getAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerError, setRegisterError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setValidationError("Hasło musi mieć co najmniej 6 znaków.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setValidationError("Hasła muszą być takie same.");
      return;
    }

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        console.log("Użytkownik zarejestrowany!");
        sendEmailVerification(auth.currentUser)
          .then(() => {
            console.log("Email verification send!");
            setIsRegistered(true);
          })
          .catch((error) => {
            console.error("Błąd wysyłania e-maila weryfikacyjnego:", error);
          });
      })
      .catch((error) => {
        setRegisterError(error.message);
        console.error("Błąd rejestracji:", error);
      });
  };

  useEffect(() => {
    if (isRegistered) {
      router.push('/user/verify'); // Przekierowanie po rejestracji
    }
  }, [isRegistered, router]);

  return (
    <div className="hero bg-base-200" style={{ height: "80vh" }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left px-5 max-w-screen-sm">
          <h1 className="text-5xl font-bold">Rejestracja</h1>
          <p className="py-6">
            Witaj! Aby rozpocząć, utwórz swoje konto, wypełniając formularz
            poniżej. Zaledwie kilka minut dzieli Cię od dostępu do wszystkich
            funkcji naszej platformy.
            <br />
            <br />
            Zarejestruj się teraz i korzystaj z pełni możliwości!
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                placeholder="hasło"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Powtórz hasło</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="hasło"
                className="input input-bordered"
                required
              />
            </div>

            {validationError && (
              <p className="text-red-500 text-sm">{validationError}</p>
            )}
            {registerError && (
              <p className="text-red-500 text-sm">{registerError}</p>
            )}

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Zarejestruj</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
