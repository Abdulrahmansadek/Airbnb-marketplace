import { Navigate, Outlet } from "react-router-dom";
import { useAuthentication } from "../Hooks/useAuthentication";
import Spinner from "./Spinner";
const PrivateRoute = () => {
  const { isLogged, loading } = useAuthentication();

  if (loading) {
    return <Spinner />;
  }
  return isLogged ? <Outlet /> : <Navigate to={"/sign-in"}></Navigate>;
};
export default PrivateRoute;
