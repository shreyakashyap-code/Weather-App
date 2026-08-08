import { FaCloudSun } from "react-icons/fa";
function Navbar(){
    return(
        <nav className="navbar">
            <div className="logo">
                <FaCloudSun/>
                <h2>Weather App</h2>
            </div>

            <div className="nav-links">
                <button>⌂ &nbsp; Home</button>
                <button>ⓘ &nbsp; About</button>
            </div>
        </nav>
    );
}
export default Navbar;