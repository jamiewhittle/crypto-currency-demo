import CryptoCurrencyLayout from "@/Layouts/CryptoCurrencyLayout";
import CryptoCurrencyTableSingle from "@/Components/CryptoCurrencyTableSingle";

export default function CryptoCurrencySingle({ id }) {
    return (
        <>
            <CryptoCurrencyLayout title="Crypto Currency">
                <main className="container mx-auto py-1 md:py-14">
                    <div className="flex justify-center mt-6 px-6">
                        <CryptoCurrencyTableSingle id={id} />
                    </div>
                </main>
            </CryptoCurrencyLayout>
        </>
    );
}
