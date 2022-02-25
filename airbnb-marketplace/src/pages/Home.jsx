import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

function Home() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  return (
    <div className="text-3xl font-bold underline">
      Home
      {user ? <h1>add your review</h1> : <h1>you cant give feedback</h1>}
    </div>
  );
}

export default Home;
