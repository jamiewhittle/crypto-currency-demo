export default function CryptoCurrencySearch({ searchTerm, updateSearchTerm }) {
    return (
        <>
            <div className="my-6">
                <label className="flex flex-row justify-center items-center gap-3">
                    Search for a coin{" "}
                    <input
                        className="h-12"
                        type="text"
                        value={searchTerm}
                        onChange={updateSearchTerm}
                        placeholder="Enter name or symbol"
                    />
                </label>
            </div>
        </>
    );
}
