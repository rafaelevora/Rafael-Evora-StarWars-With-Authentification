import { Link } from "react-router-dom";
import storeReducer from "../store";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        
        {/* Logo on the left */}
        <Link to="/">
          <img
            className="navbar-brand mb-0 h1 img-fluid"
            style={{
              width: "120px",
              height: "100px",
              filter: "brightness(0) invert(1)",
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.1)";
              e.currentTarget.style.boxShadow = "0 0 15px 5px rgba(255, 255, 255, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
            title="Homepage"
            src="https://cdn.freebiesupply.com/logos/large/2x/star-wars-logo-png-transparent.png"
            alt="Star Wars Logo"
          />
        </Link>

        {/* Right side items */}
        <div className="d-flex align-items-center gap-3">

          {/* Dropdown */}
          <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Add New
            </button>
            <ul className="dropdown-menu btn-outline-dark">
              <li><Link className="dropdown-item" to="/addcharacter">Add Character</Link></li>
              <li><Link className="dropdown-item" to="/addplanet">Add Planet</Link></li>
              <li><Link className="dropdown-item" to="/addspecies">Add Species</Link></li>
            </ul>
          </div>

          {/* Auth buttons */}
          {!store.user ? (
            <div className="d-flex gap-2">
              <Link to="/login" className="btn btn-outline-light">Login</Link>
              <Link to="/signup" className="btn btn-outline-light">Sign-up</Link>
            </div>
          ) : (
            <div className="d-flex gap-2">
              <Link to="/profilepage" className="btn btn-dark">Profile Page</Link>
              <button
                className="btn btn-dark"
                onClick={() => dispatch({ type: "log_out_user" })}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
