import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../Hooks/useAuthentication";
const PrivateRoute = () => {
  const { isLogged, loading } = useAuthentication();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return isLogged ? <Outlet /> : <Navigate to={"/sign-in"}></Navigate>;
};
export default PrivateRoute;
