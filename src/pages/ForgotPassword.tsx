import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpService, verifyOtpService } from "../services/authService";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendOtpService(email);
      toast.success("OTP sent to your email!");
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP", error);
      toast.error("Error sending OTP.")
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await verifyOtpService(email, otp);
      toast.success("OTP verified successfully!");
      navigate(`/change-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Inavlid OTP ", error);
      toast.error("Inavlid OTP.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-self-center align-items-center vw-100 vh-100">
      <div className="card shadow p-5" style={{ width: "500px" }}>
        <h4 className="text-center mb-3">
          <b>Employee Management System</b>
        </h4>

        <h5 className="text-center">
          <b>Forgot Password</b>
        </h5>

        <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
          <div className="mt-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              disabled={otpSent} //Disable after sending otp
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* OTP input visible only after OTP is sent */}

          {otpSent && (
            <div className="mt-3">
              <label className="form-label">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP here"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100 mt-3">
            {otpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
