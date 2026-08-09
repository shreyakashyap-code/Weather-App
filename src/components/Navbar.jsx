import { FaCloudSun } from "react-icons/fa";

function Navbar({ onHome, onAbout, currentPage }) {
  return (
    <nav className="navbar">

      <div className="logo">
        <FaCloudSun />
        <span>Weather App</span>
      </div>

      <div className="nav-links">

        <button
          onClick={onHome}
          className={currentPage === "home" ? "active" : ""}
        >
          ⌂ &nbsp; Home
        </button>

        <button
          onClick={onAbout}
          className={currentPage === "about" ? "active" : ""}
        >
          ⓘ &nbsp; About
        </button>

      </div>

    </nav>
  );
}

export default Navbar;