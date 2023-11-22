import { Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function CryptoCurrency({
    title = "Crypto Currency",
    children,
}) {
    return (
        <>
            <Header title={title}>
                <Link href="/">Crypto Currency Logo</Link>
            </Header>
            {children}
            <Footer />
        </>
    );
}
