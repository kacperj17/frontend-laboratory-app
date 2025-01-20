import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "./firebase";

export const getUserData = async (userId) => {
  const userRef = doc(db, "users", userId); // Kolekcja "users" i dokument o ID użytkownika
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data(); // Zwróci dane użytkownika, w tym pole listenedAlbums
  } else {
    return null; // Brak użytkownika
  }
};

export const updateUserListenedAlbums = async (userId, albumId) => {
  const albumRef = doc(db, "albums", albumId);
  const userRef = doc(db, "users", userId);

  await updateDoc(userRef, {
    listenedAlbums: arrayUnion(albumRef),
  });
};

export const removeAlbumFromListenedAlbums = async (userId, albumId) => {
    const userRef = doc(db, "users", userId);
    const albumRef = doc(db, "albums", albumId);

    await updateDoc(userRef, {
      listenedAlbums: arrayRemove(albumRef),
    });
};
