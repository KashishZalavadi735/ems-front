import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

interface HeaderProps {
  toggleSidebar: () => void;
}

function Header({ toggleSidebar }: HeaderProps) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); //  breakpoint

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="d-flex justify-content-between align-items-center shadow-sm bg-white p-3"
      style={{ position: "sticky", width: "100%", top: "0", zIndex: "1000" }}
    >
      <div className="d-flex align-items-center gap-3">
        {isMobile && (
          <FontAwesomeIcon
            icon={faBars}
            size="lg"
            style={{ cursor: "pointer" }}
            onClick={toggleSidebar}
          />
        )}
        <h5 className="mb-0 fw-bold">Employee Management System</h5>
      </div>

      <div className="d-flex gap-3">
        <FontAwesomeIcon icon={faBell} />
        <FontAwesomeIcon icon={faUser} />
      </div>
    </div>
  );
}

export default Header;
