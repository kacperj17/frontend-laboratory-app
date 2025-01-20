"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { updateProfile } from "firebase/auth";
import { db } from "@/app/lib/firebase";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";

export default function ProfileForm() {
  const { user } = useAuth();
  console.log("Zalogowany użytkownik:", user);


  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
    email: user?.email || "",
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
  });

  const [formErrors, setFormErrors] = useState({
    displayName: "",
    photoURL: "",
    address: {
      street: "",
      city: "",
      zipCode: "",
    },
  });

  const fetchUserData = async () => {
    if (!user?.uid) return;

    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData((prevData) => ({
          ...prevData,
          address: {
            street: data.address?.street || "",
            city: data.address?.city || "",
            zipCode: data.address?.zipCode || "",
          },
        }));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name in formData.address) {
      setFormData((prevData) => {
        const updatedData = {
          ...prevData,
          address: {
            ...prevData.address,
            [name]: value,
          },
        };
    
        return updatedData;
      });
    } else {
      setFormData((prevData) => {
        const updatedData = {
          ...prevData,
          [name]: value,
        };
        return updatedData;
      });
    }
  };
  

  const validateForm = () => {
    let errors = { };
    const { displayName, photoURL, address } = formData;

    if (displayName.length < 6 || displayName.length > 24) {
      errors.displayName = "Nazwa wyświetlana musi mieć od 6 do 24 znaków.";
    }

    const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    if (!urlPattern.test(photoURL)) {
      errors.photoURL = "Podaj poprawny adres URL zdjęcia profilowego.";
    }

    if (!address.street) {
      errors.address.street = "Ulica jest wymagana.";
    }
    if (!address.city) {
      errors.address.city = "Miasto jest wymagane.";
    }
    if (!address.zipCode) {
      errors.address.zipCode = "Kod pocztowy jest wymagany.";
    }

    setFormErrors(errors);
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Formularz został wysłany!");

    const errors = validateForm();

    console.log("Błędy walidacji:", errors);

    if (
      Object.values(errors).some((error) => error !== "") ||
      (errors.address && Object.values(errors.address).some((error) => error !== ""))
    ) {
      console.log("Formularz zawiera błędy i nie zostanie wysłany.");

      return;
    }

    try {
      console.log("Updating profile in Authentication...");

      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      console.log("Updating Firestore document...");

      await setDoc(doc(db, "users", user?.uid), {
        address: {
          street: formData.address.street,
          city: formData.address.city,
          zipCode: formData.address.zipCode,
        },
      }, { merge: true });

      console.log("Profile updated");
    } catch (e) {
      setError(
        "Nie udało się zaktualizować profilu. Upewnij się, że masz odpowiednie uprawnienia."
      );
      console.error("Error updating profile: ", e);
    }
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

            {/* Pola adresowe */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ulica</span>
              </label>
              <input
                type="text"
                name="street"
                placeholder="Ulica"
                className="input input-bordered"
                value={formData.address.street}
                onChange={handleChange}
              />
              {formErrors.address?.street && (
                <p className="text-error">{formErrors.address.street}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Miasto</span>
              </label>
              <input
                type="text"
                name="city"
                placeholder="Miasto"
                className="input input-bordered"
                value={formData.address.city}
                onChange={handleChange}
              />
              {formErrors.address?.city && (
                <p className="text-error">{formErrors.address.city}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Kod pocztowy</span>
              </label>
              <input
                type="text"
                name="zipCode"
                placeholder="Kod pocztowy"
                className="input input-bordered"
                value={formData.address.zipCode}
                onChange={handleChange}
              />
              {formErrors.address?.zipCode && (
                <p className="text-error">{formErrors.address.zipCode}</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" onClick={() => console.log("Przycisk został kliknięty!")}>
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
