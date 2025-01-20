import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const getAlbums = async () => {
  const snapshot = await getDocs(collection(db, "albums"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getAlbumById = async (id) => {
  const albumRef = doc(db, "albums", id);
  const snapshot = await getDoc(albumRef); 
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() }; 
  } else {
    return null; 
  }
};

export const getAlbumsByReferences = async (albumRefs) => {
    const albumQuery = query(
      collection(db, "albums"), // Kolekcja albumów
      where("__name__", "in", albumRefs.map((ref) => ref.id)) // Sprawdza referencje albumów
    );
    const snapshot = await getDocs(albumQuery);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };
