import { Head } from "@inertiajs/react";
import H1 from "./H1";

export default function Header({ title = "Crypto Currency", children }) {
    return (
        <>
            <Head title={title} />
            <header className="flex justify-center bg-emerald-400 text-white py-7 md:py-14">
                <H1>{children}</H1>
            </header>
        </>
    );
}
