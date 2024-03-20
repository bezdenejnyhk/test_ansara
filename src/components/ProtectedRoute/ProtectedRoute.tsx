import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { FC } from "react";
import { TProtectedRoute } from "../../types/TProtectedRoute";
import { useAppSelector } from "../../services/hooks";
import { APP_ROUTES } from '../../constants'

export const ProtectedRoute: FC<TProtectedRoute> = ({ children }) => {
  const { isAuth, user } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={APP_ROUTES.LOGIN_PAGE} state={{ from: location }} replace />;
  }
  return children;
};
