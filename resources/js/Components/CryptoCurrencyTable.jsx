import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Dna } from "react-loader-spinner";
import { gbp, gbpFull } from "@/Utils/CurrencyNumber";
import CryptoCurrencySearch from "@/Components/CryptoCurrencySearch";
import Button from "@/Components/Button";
import H2 from "@/Components/H2";
import axios from "axios";

export default function CryptoCurrencyTable() {
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState();
    const [apiError, setApiError] = useState(false);
    const [refreshTime, setRefreshTime] = useState(60);
    const [searchTerm, setSearchTerm] = useState("");

    // on first load, get the data from the api and start the countdown for the data
    // refresh
    useEffect(() => {
        loadData();
        startCountdown();
    }, []);

    // call the laraval api to get the crypto data, which is cached from coin gecko
    const loadData = () => {
        setLoading(true);

        axios({ method: "get", url: "/api/cryptocurrency/all", timeout: 5000 })
            .then((response) => {
                let data = response.data;
                if (data.error) {
                    console.log(data.error);
                    setApiError(data.error);
                } else {
                    setApiData(data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setApiError(
                    "There has been a problem loading this content.  Please try again later"
                );
                setLoading(false);
            });
    };

    // manually reload the api and reset the refresh counter
    const manualRefresh = () => {
        setRefreshTime(60);
        loadData();
    };

    // start the refresh countdown
    const startCountdown = () => {
        const countdownInterval = setInterval(() => {
            setRefreshTime((count) => {
                if (count === 0) {
                    loadData();
                    return 60;
                } else {
                    return count - 1;
                }
            });
        }, 1000);
    };

    // update the search term - passed to the  child CryptoCurrencySearch component
    const updateSearchTerm = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // build the results object with either filtered data or a no data message
    // returned
    const results = () => {
        let filteredData = apiData.filter(
            (data) =>
                data.name.toLowerCase().includes(searchTerm) ||
                data.symbol.toLowerCase().includes(searchTerm)
        );

        if (filteredData.length === 0) {
            return (
                <tr>
                    <td
                        colSpan="5"
                        className="border-b border-slate-100 p-4 pr-8 text-slate-500"
                    >
                        No results found
                    </td>
                </tr>
            );
        } else {
            return filteredData
                .filter(
                    (data) =>
                        data.name.toLowerCase().includes(searchTerm) ||
                        data.symbol.toLowerCase().includes(searchTerm)
                )
                .map((data, key) => {
                    return (
                        <tr
                            key={key}
                            data-name={data.name}
                            data-symbol={data.symbol}
                            className="hover:bg-slate-50 cursor-pointer"
                            onClick={() => router.get(`/${data.id}`)}
                        >
                            <td className="hidden md:table-cell border-b border-slate-100 p-4 pl-8 text-slate-500">
                                {data.market_cap_rank}
                            </td>
                            <td className="border-b border-slate-100 p-4 text-slate-500">
                                <div className="flex items-center">
                                    <img
                                        className="h-6 w-6 md:h-10 md:w-10 mr-4"
                                        src={data.image}
                                        alt={data.name}
                                    />
                                    <span className="hidden md:inline-block">
                                        {data.name}
                                    </span>
                                </div>
                            </td>
                            <td className="hidden md:table-cell border-b border-slate-100 p-4 text-slate-500">
                                {data.symbol}
                            </td>
                            <td className="border-b border-slate-100 p-4 text-slate-500">
                                {gbpFull.format(data.current_price)}
                            </td>
                            <td className="border-b border-slate-100 p-4 pr-8 text-slate-500">
                                {gbp.format(data.market_cap)}
                            </td>
                        </tr>
                    );
                });
        }
    };

    // show a loader while waiting for the api call to finish
    if (loading) {
        return (
            <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="Loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
            />
        );
    }

    return (
        <>
            {apiError ? (
                <div className="flex flex-col justify-center w-full max-w-3xl">
                    <H2>Error!</H2>
                    <p>{apiError}</p>
                </div>
            ) : (
                <div className="flex flex-col justify-center w-full max-w-3xl">
                    <div className="flex flex-col justify-center">
                        <p className="mb-3">
                            Click/tap on a currency to view more detail about
                            that currency.
                        </p>
                        <p>Data will refresh automatically every minute.</p>
                        <Button type="button" onClick={() => manualRefresh()}>
                            Refresh now?
                        </Button>
                    </div>
                    <CryptoCurrencySearch
                        searchTerm={searchTerm}
                        updateSearchTerm={updateSearchTerm}
                    />
                    <div className="not-prose relative bg-slate-50 rounded-xl overflow-hidden">
                        <div
                            className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"
                            style={{
                                backgroundPosition: 10 + "px" + 10 + "px",
                            }}
                        ></div>
                        <div className="relative rounded-xl overflow-auto">
                            <div className="shadow-sm overflow-hidden my-8">
                                <table className="border-collapse table-auto text-sm w-full">
                                    <thead>
                                        <tr>
                                            <th className="hidden md:table-cell border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">
                                                #
                                            </th>
                                            <th className="border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">
                                                Coin
                                            </th>
                                            <th className="hidden md:table-cell border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">
                                                Symbol
                                            </th>
                                            <th className="border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">
                                                Price
                                            </th>
                                            <th className="border-b font-medium p-4 pr-8 pt-0 pb-3 text-slate-400 text-left">
                                                Market Cap
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {results()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
