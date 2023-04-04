import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  let location = useLocation();

  const authedUser = useSelector((state) => state.authedUser);
  console.log("AUTHED_USER: ", authedUser);

  if (authedUser === null) {
    console.log("LOCATION_PATH: ", location);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
