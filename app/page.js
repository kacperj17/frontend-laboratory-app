import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="hero"
      style={{
        backgroundImage:
          "url(https://static.vecteezy.com/system/resources/previews/049/399/990/non_2x/green-abstract-gradient-background-free-vector.jpg)",
        height: "85vh",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-full">
          <h1 className="mb-5 text-5xl font-bold">Witaj na stronie główej</h1>
          <p className="mb-5">
            Po zalogowaniu do aplikacji, będziesz miał możliwość dodawania
            albumów do swojej osobistej kolekcji przesłuchanych albumów. Dzięki
            temu możesz śledzić, które albumy już wysłuchałeś, tworzyć własną
            bibliotekę ulubionych utworów i mieć do nich łatwy dostęp w każdej
            chwili. Dodatkowo, jeśli chcesz, możesz dodawać nowe albumy do
            głównej kolekcji aplikacji. Wystarczy, że wypełnisz formularz,
            podając wszystkie niezbędne informacje, takie jak tytuł, wykonawca,
            gatunek, lista utworów i link do okładki. Nowe albumy trafią do
            wspólnej kolekcji i będą dostępne dla wszystkich użytkowników
            aplikacji. To świetna okazja, by dzielić się swoją muzyką i odkrywać
            nowe albumy od innych użytkowników.
          </p>
          <Link href="/user/signin"><button className="btn btn-primary">Zaczynamy</button></Link>
        </div>
      </div>
    </div>
  );
}
