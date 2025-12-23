import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); //Prevent page refresh

    try {
      const data = await loginUser({ email, password });

      console.log("Login Success : ", data);

      // Save token and user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("role", data.user.role); // Save the role

      toast.success("Login successfully!");
      // Navigate to Dashboard
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };
  return (
    <div className="d-flex justify-content-center align-self-center align-items-center vw-100 vh-100">
      <div className="card shadow p-5" style={{ width: "500px" }}>
        <h3 className=" text-primary text-center">
          <b>EMS</b>
        </h3>
        <h4 className="text-center">
          <b>Employee Management System</b>
        </h4>
        <h6 className="text-muted text-center">Sign in to your account</h6>
        <form onSubmit={handleLogin}>
          <div className="mt-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your Password here"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberme"
              />
              <label className="form-check-label" htmlFor="rememberme">
                Remember me
              </label>
            </div>

            <Link to="/forgot-password" className="text-primary text-decoration-none">
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
