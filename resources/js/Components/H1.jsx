export default function H1({ className = "", children }) {
    return <h1 className={`text-4xl ${className}`}>{children}</h1>;
}
