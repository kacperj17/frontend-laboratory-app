"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/AuthContext";

import { getAlbumById } from "@/app/lib/albumService";
import {
  updateUserListenedAlbums,
  removeAlbumFromListenedAlbums,
  getUserData,
} from "@/app/lib/userService";

import AlbumDetails from "@/app/components/albumDetails";

export default function AlbumPage() {
  const { user } = useAuth();
  const pathname = usePathname();
  const id = pathname?.split("/")[2];
  const [album, setAlbum] = useState(null);
  const [isInCollection, setIsInCollection] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchAlbum = async () => {
        const data = await getAlbumById(id); // Funkcja do pobrania albumu po ID
        setAlbum(data);
      };

      fetchAlbum();
    }
  }, [id]);

  useEffect(() => {
    console.log("User:", user);
    console.log("Album:", album);

    const checkIfAlbumInCollection = async () => {
      if (user && album) {
        const userData = await getUserData(user.uid);
        const isInCollection = userData.listenedAlbums?.some(
          (ref) => ref.id === album.id
        );
        setIsInCollection(isInCollection);
      }
    };

    if (user && album) {
      checkIfAlbumInCollection();
    }
  }, [user, album]);

  const handleAddToCollection = async () => {
    if (user && album) {
      await updateUserListenedAlbums(user.uid, album.id); // Funkcja do aktualizacji kolekcji użytkownika
      setIsInCollection(true); // Ustawiamy flagę, że album jest teraz w kolekcji użytkownika
    }
  };

  const handleRemoveFromCollection = async () => {
    if (user && album) {
      await removeAlbumFromListenedAlbums(user.uid, album.id); // Funkcja do usunięcia albumu z kolekcji użytkownika
      setIsInCollection(false); // Ustawiamy flagę, że album został usunięty z kolekcji użytkownika
    }
  };

  if (!id) {
    console.log(id);
    return <div>Loading...</div>;
  }

  if (!album) {
    return <div>Loading...</div>; // Wczytywanie, dopóki album nie zostanie załadowany
  }

  return (
    <div className="album-page-container">
      <AlbumDetails album={album} />
      {user && !isInCollection && (
        <button
          className="btn btn-primary mt-4"
          onClick={handleAddToCollection}
        >
          Dodaj
        </button>
      )}
      {user && isInCollection && (
        <button
          className="btn btn-danger mt-4"
          onClick={handleRemoveFromCollection}
        >
          Usuń z kolekcji
        </button>
      )}
    </div>
  );
}
