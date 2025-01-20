import Link from "next/link";

export default function AlbumDetails({ album }) {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={album.albumCover}
            className={album.title}
          />
          <div>
            <h1 className="text-5xl font-bold">{album.title}</h1>
            <p className="py-6">
              {album.artist} <br />
              Gatunek: {album.genre}<br />
              Długość: {album.length}
            </p>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  {album.songs.map((song, index) => (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{song}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Link href={`/albums`}>
                <button className="btn btn-primary">Powrót</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
