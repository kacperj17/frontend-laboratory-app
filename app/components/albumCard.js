import Link from "next/link";

export default function AlbumCard({ album }) {
  return (
    <>
      <div className="card bg-slate-950	 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={album.albumCover} alt={album.title} />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{album.title}</h2>
          <p>{album.artist}</p>
          <div className="card-actions">
            <Link href={`/album/${album.id}`}>
              <button className="btn btn-primary">Wyświetl szczegóły</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
