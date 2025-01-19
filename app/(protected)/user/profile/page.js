"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "@/app/lib/firebase"; // Upewnij się, że masz poprawny import auth

export default function ProfileForm() {
  const { user } = useAuth();

  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
    email: user?.email || "",
  });

  const [formErrors, setFormErrors] = useState({
    displayName: "",
    photoURL: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    const { displayName, photoURL } = formData;

    if (displayName.length < 6 || displayName.length > 24) {
      errors.displayName = "Nazwa wyświetlana musi mieć od 6 do 24 znaków.";
    } else {
      errors.displayName = "";
    }

    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    if (!urlPattern.test(photoURL)) {
      errors.photoURL = "Podaj poprawny adres URL zdjęcia profilowego.";
    } else {
      errors.photoURL = "";
    }

    setFormErrors(errors);
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    updateProfile(user, {
      displayName: formData.displayName,
      photoURL: formData.photoURL,
    })
      .then(() => {
        console.log("Profile updated");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="hero bg-base-200" style={{ height: "80vh" }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left px-5 max-w-screen-sm">
          {formData.photoURL && (
            <div className="mb-6">
              <img
                src={formData.photoURL}
                alt="Zdjęcie profilowe"
                className="w-32 h-32 rounded-full mx-auto"
              />
            </div>
          )}

          <h1 className="text-5xl font-bold">Zaktualizuj swój profil</h1>
          <p className="py-6">
            Wypełnij poniższy formularz, aby zaktualizować swoje dane.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nazwa wyświetlana</span>
              </label>
              <input
                type="text"
                name="displayName"
                placeholder="Nazwa wyświetlana"
                className={`input input-bordered ${
                  formErrors.displayName ? "input-error" : ""
                }`}
                value={formData.displayName}
                onChange={handleChange}
              />
              {formErrors.displayName && (
                <p className="text-error">{formErrors.displayName}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                value={formData.email}
                readOnly
              />
            </div>

            {/* Pole do zdjęcia profilowego */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Zdjęcie profilowe (URL)</span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="Adres zdjęcia profilowego"
                className={`input input-bordered ${
                  formErrors.photoURL ? "input-error" : ""
                }`}
                value={formData.photoURL}
                onChange={handleChange}
              />
              {formErrors.photoURL && (
                <p className="text-error">{formErrors.photoURL}</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Zaktualizuj profil
              </button>
            </div>
          </form>

          {error && (
            <div className="alert alert-error mt-4">
              <div>
                <span>{error}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
