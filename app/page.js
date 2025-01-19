import Image from "next/image";

export default function Home() {
  return (
    <div
      className="hero"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
          height: "85vh"
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-full">
          <h1 className="mb-5 text-5xl font-bold">Witaj na stronie główej</h1>
          <p className="mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in
            tristique nibh. Sed id ultricies neque, ut hendrerit ante. Nulla in
            volutpat nisl, ac condimentum elit. Nunc bibendum odio ac aliquet
            faucibus. Praesent elementum eget tortor sed auctor. Mauris at
            dapibus velit, vel blandit sem. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia curae; Donec quis
            semper massa, eget tempus ante. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia curae; Cras
            fermentum ultrices eros, sit amet tincidunt massa volutpat nec.
            Curabitur bibendum, sapien at pellentesque ornare, elit nunc
            imperdiet nisl, sed cursus nunc purus id magna. Nam non convallis
            odio, vitae laoreet nulla. Phasellus convallis at tortor a
            pellentesque.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
