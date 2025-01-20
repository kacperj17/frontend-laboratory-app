'use client';

import { useEffect, useState } from "react";
import { getAlbums } from "@/app/lib/albumService";
import AlbumCard from "@/app/components/albumCard";

export default function AlbumsPage() {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        const fetchAlbums = async () => {
          const data = await getAlbums();
          setAlbums(data);
        };
        fetchAlbums();
    }, []);
    

    return (
        <div className="my-16 px-16">
          <h1 className="text-center text-3xl font-bold mb-8">Albumy</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.map(album => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        </div>
    );
}
