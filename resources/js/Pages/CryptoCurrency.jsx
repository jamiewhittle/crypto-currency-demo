import CryptoCurrencyLayout from "@/Layouts/CryptoCurrencyLayout";
import CryptoCurrencyTable from "@/Components/CryptoCurrencyTable";

export default function CryptoCurrency() {
    return (
        <>
            <CryptoCurrencyLayout title="Crypto Currency">
                <main className="container mx-auto py-7 md:py-14">
                    <div className="flex justify-center mt-6 px-6">
                        <CryptoCurrencyTable />
                    </div>
                </main>
            </CryptoCurrencyLayout>
        </>
    );
}
