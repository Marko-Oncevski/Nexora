import { Link } from "react-router-dom";
import { usePageTitle } from "../hooks/usePageTitle";

function NotFound() {
    usePageTitle("Nexora - Page Not Found");

    return (
        <main className="not-found-page">
            <p className="about-eyebrow">ERROR 404</p>

            <h1>Page not found</h1>

            <p>
                The page you are looking for doesn't exist or may have
                been moved. Check the address, or head back to the
                homepage to keep exploring.
            </p>

            <Link to="/" className="home-button home-button-primary">
                Back to Home
            </Link>
        </main>
    );
}

export default NotFound;
