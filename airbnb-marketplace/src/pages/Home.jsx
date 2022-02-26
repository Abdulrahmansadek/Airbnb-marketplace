import { useAuthentication } from "../Hooks/useAuthentication";

function Home() {
  const { isLogged, loading } = useAuthentication();

  return (
    <div className="text-3xl font-bold underline">
      Home
      {isLogged ? <h1>add your review</h1> : <h1>you cant give feedback</h1>}
    </div>
  );
}

export default Home;
