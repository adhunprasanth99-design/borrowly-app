import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("borrowlyUser");

    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    return null;
  });

  const handleLogout = () => {
    localStorage.removeItem("borrowlyUser");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container py-2">

        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand fw-bold fs-3 text-dark"
        >
          Borrowly
        </Link>

        {/* Mobile button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#borrowlyNavbar"
          aria-controls="borrowlyNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div
          className="collapse navbar-collapse"
          id="borrowlyNavbar"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">

            <li className="nav-item">
              <Link className="nav-link px-3" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link px-3" to="/browse">
                Browse Items
              </Link>
            </li>

            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/add-item">
                    Add Item
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link px-3" to="/my-items">
                    My Items
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link px-3" to="/my-requests">
                    My Requests
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link px-3"
                    to="/requests-received"
                  >
                    Requests Received
                  </Link>
                </li>

                {/* User */}
                <li className="nav-item ms-lg-2">
                  <span className="nav-link fw-semibold">
                    Hi, {user.name}
                  </span>
                </li>

                {/* Logout */}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-dark px-4"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {!user && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link px-3"
                    to="/register"
                  >
                    Register
                  </Link>
                </li>

                <li className="nav-item ms-lg-1">
                  <Link
                    className="btn btn-dark px-4"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;