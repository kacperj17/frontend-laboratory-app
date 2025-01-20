"use client";

import { useState } from "react";
import { useAuth } from '@/app/lib/AuthContext'; // Załóżmy, że masz ten kontekst w aplikacji
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "@/app/lib/firebase"; // Twoje połączenie z Firebase

export default function AddAlbumPage() {
  const { user } = useAuth(); // Sprawdzamy, czy użytkownik jest zalogowany
  const [album, setAlbum] = useState({
    albumCover: "",
    artist: "",
    genre: "",
    length: "",
    songs: [],
    title: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Funkcja do obsługi zmiany wartości w formularzu
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlbum((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Funkcja do obsługi dodawania albumu
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("Musisz być zalogowany, aby dodać album.");
      return;
    }

    setIsSubmitting(true);

    try {
      const albumRef = doc(collection(db, "albums"));
      await setDoc(albumRef, {
        albumCover: album.albumCover,
        artist: album.artist,
        genre: album.genre,
        length: album.length,
        songs: album.songs.split("\n"), // Podziel na tablicę z linii tekstu
        title: album.title,
        createdAt: new Date(),
      });

      alert("Album został dodany!");
      setAlbum({
        albumCover: "",
        artist: "",
        genre: "",
        length: "",
        songs: [],
        title: "",
      }); // Resetowanie formularza
    } catch (error) {
      setError("Wystąpił błąd przy dodawaniu albumu.");
      console.error("Błąd przy dodawaniu albumu:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div>Musisz być zalogowany, aby dodać album.</div>;
  }

  return (
    <div className="hero bg-base-200" style={{ height: "80vh" }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left px-5 max-w-screen-sm">
          <h1 className="text-5xl font-bold">Dodaj nowy album</h1>
          <p className="py-6">
            Wypełnij poniższy formularz, aby dodać nowy album do głównej kolekcji.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            {error && (
              <div className="alert alert-error mt-4">
                <div>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Tytuł</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Tytuł albumu"
                className="input input-bordered"
                value={album.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Artysta</span>
              </label>
              <input
                type="text"
                name="artist"
                placeholder="Artysta"
                className="input input-bordered"
                value={album.artist}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Gatunek</span>
              </label>
              <input
                type="text"
                name="genre"
                placeholder="Gatunek"
                className="input input-bordered"
                value={album.genre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Długość albumu</span>
              </label>
              <input
                type="text"
                name="length"
                placeholder="Długość albumu"
                className="input input-bordered"
                value={album.length}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Link do okładki albumu</span>
              </label>
              <input
                type="text"
                name="albumCover"
                placeholder="Link do okładki"
                className="input input-bordered"
                value={album.albumCover}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Lista utworów (każdy utwór w nowej linii)</span>
              </label>
              <textarea
                name="songs"
                placeholder="Wpisz utwory, każdy w nowej linii"
                className="textarea textarea-bordered"
                value={album.songs}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? "Dodawanie..." : "Dodaj album"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
