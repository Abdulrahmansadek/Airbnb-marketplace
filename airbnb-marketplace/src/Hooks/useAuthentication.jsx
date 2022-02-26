import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const useAuthentication = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      }
      setLoading(false);
    });
  });

  return { isLogged, loading };
};

//https://stackoverflow.com/questions/65505665/protected-route-with-firebase
