// src/pages/AuthRedirect.jsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const AuthRedirect = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");

    if (token && role) {
      // Save to Redux/localStorage
      dispatch(setUser({ token, role }));
      localStorage.setItem("blook_token", token);
      localStorage.setItem("blook_role", role);

      // Redirect to dashboard
      if (role === "brand") navigate("/brand-dashboard");
      else if (role === "Admin") navigate("/admin-dashboard");
      else if (role === "Vendor") navigate("/vendor-dashboard");
      else if (role === "BlookForceAgent") navigate("/blookforceagent-dashboard");
      else if (role === "space_owner") navigate("/spaceowner-dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  return <p>Logging you in...</p>;
};

export default AuthRedirect;
