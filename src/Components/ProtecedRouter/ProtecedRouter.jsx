import { Navigate, Outlet } from "react-router-dom";

function ProtecedRouter({ isLogged }) {
  return isLogged ? <Outlet /> : <Navigate to="/" />;
}

export default ProtecedRouter;
