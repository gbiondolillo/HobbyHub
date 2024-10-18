import { Link } from 'react-router-dom';
import './Navbar.css'; // Assume you have or will create some basic styling for the navbar

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">Home</Link>
            {/* Add other navigation links here if necessary */}
        </nav>
    );
}

export default Navbar;
