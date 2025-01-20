"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/lib/AuthContext";
import { getUserData } from "@/app/lib/userService"; 
import { getAlbumsByReferences } from "@/app/lib/albumService"; 
import AlbumCard from "@/app/components/albumCard";

const UserAlbumsPage = () => {
  const { user } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userData = await getUserData(user.uid);

        if (userData && userData.listenedAlbums && userData.listenedAlbums.length !== 0) {
          const albumRefs = userData.listenedAlbums;
          const albumsData = await getAlbumsByReferences(albumRefs);
          setAlbums(albumsData);
        }
      }
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-16 px-16">
      <h1 className="text-center text-3xl font-bold mb-8">Albumy</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <AlbumCard key={album.id} album={album} />
        ))}
      </div>
    </div>
  );
};

export default UserAlbumsPage;
