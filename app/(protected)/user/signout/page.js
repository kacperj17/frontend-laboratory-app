"use client";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutForm() {
  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-base-200" style={{ height: "80vh" }}>
      <form
        onSubmit={onSubmit}
        className="card bg-base-100 w-96 p-6 shadow-xl flex items-center gap-4"
      >
        <h1 className="text-xl font-bold">
          Czy na pewno chcesz się wylogować?
        </h1>
        <button type="submit" className="btn btn-error">
          Wyloguj
        </button>
      </form>
    </div>
  );
}
