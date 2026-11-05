import { Component } from "react";

class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Nexora error boundary caught an error:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false });
    };

    render() {
        if (this.state.hasError) {
            return (
                <main className="not-found-page">
                    <p className="about-eyebrow">SOMETHING WENT WRONG</p>

                    <h1>We couldn't load this page</h1>

                    <p>
                        An unexpected error occurred. You can try again,
                        or reload the page if the problem continues.
                    </p>

                    <button
                        type="button"
                        className="home-button home-button-primary"
                        onClick={this.handleReset}
                    >
                        Try again
                    </button>
                </main>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
