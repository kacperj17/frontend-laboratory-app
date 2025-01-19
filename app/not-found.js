import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="hero bg-base-200" style={{ height: "80vh" }}>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Nie znaleziono strony!</h1>
          <p className="py-6">
            Przepraszamy, ale nie możemy znaleźć strony, której szukasz.
            <br />
            Spróbuj wrócić do strony głównej lub sprawdzić, czy adres jest
            poprawny.
          </p>
          <Link href="/"><button className="btn btn-primary">Strona główna</button></Link>
        </div>
      </div>
    </div>
  );
}
