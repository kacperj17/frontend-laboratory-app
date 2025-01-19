export default function SigninPage() {
  return (
    <div className="hero bg-base-200" style={{ height: "80vh" }}>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left px-5 max-w-screen-sm">
          <h1 className="text-5xl font-bold">Rejestracja</h1>
          <p className="py-6">
            Witaj! Aby rozpocząć, utwórz swoje konto, wypełniając formularz
            poniżej. Zaledwie kilka minut dzieli Cię od dostępu do wszystkich
            funkcji naszej platformy.
            <br /><br />
            Zarejestruj się teraz i korzystaj z pełni możliwości!
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Hasło</span>
              </label>
              <input
                type="password"
                placeholder="hasło"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Powtórz hasło</span>
              </label>
              <input
                type="powtórz hasło"
                placeholder="hasło"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Zarejestruj</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
