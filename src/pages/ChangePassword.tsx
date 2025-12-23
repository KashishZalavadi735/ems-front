import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChangePasswordService } from "../services/authService";
import toast from "react-hot-toast";

function ChangePassword() {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});

  // Validate individual field
  const validateField = (name: string, value: string) => {
    let error = "";

    if (!value) {
      error = "This field is required";
    } else if (name === "newPassword") {
      if (value.length < 6) {
        error = "Password must be at least 6 characters";
      } else if (!/\d/.test(value)) {
        error = "Password must contain at least one number";
      } else if (!/[!@#$%^&*]/.test(value)) {
        error = "Password must contain at least one special character (!@#$%^&*)";
      }
    } else if (name === "confirmPassword") {
      if (value !== newPassword) {
        error = "Passwords do not match";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error === "";
  };

  // Validate entire form
  const validateForm = () => {
    const newValid = validateField("newPassword", newPassword);
    const confirmValid = validateField("confirmPassword", confirmPassword);
    return newValid && confirmValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    try {
      const data = await ChangePasswordService({
        newPassword,
        confirmPassword,
        ...(email ? { email } : {}), // only include if email is not null
      });
      console.log("API response: ", data);

      toast.success("Password changed successfully!");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      console.error("Error while changing password", error);
      toast.error("Error while changing password.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
      <div className="card shadow p-5" style={{ width: "500px" }}>
        <h4 className="text-center mb-3"><b>Employee Management System</b></h4>
        <h5 className="text-center mb-4"><b>Change Password</b></h5>

        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                validateField("newPassword", e.target.value);
              }}
            />
            {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
          </div>

          <div className="mt-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateField("confirmPassword", e.target.value);
              }}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-4">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;