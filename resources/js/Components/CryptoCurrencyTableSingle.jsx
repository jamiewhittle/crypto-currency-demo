import { useState, useEffect } from "react";
import { Dna } from "react-loader-spinner";
import { gbp, gbpFull, thousands } from "@/Utils/CurrencyNumber";
import H2 from "@/Components/H2";
import Button from "@/Components/Button";
import axios from "axios";

export default function CryptoCurrencyTableSingle({ id }) {
    const [loading, setLoading] = useState(true);
    const [apiData, setApiData] = useState();
    const [apiError, setApiError] = useState(false);

    // on first load, get the data from the api
    useEffect(() => {
        loadData();
    }, []);

    // call the laraval api to get the crypto data, which is cached from coin gecko
    const loadData = () => {
        setLoading(true);

        axios({
            method: "get",
            url: `/api/cryptocurrency/${id}`,
            timeout: 5000,
        })
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
                <div className="flex flex-col w-full items-center justify-center">
                    <Button href="/">← Back</Button>

                    <H2 className="mb-6 flex items-center">
                        <img
                            className="h-10 mr-4"
                            src={apiData.image.small}
                            alt={apiData.name}
                        />{" "}
                        {apiData.name}
                    </H2>
                    <p className="mb-3 lg:hidden">
                        Mobile/tablet users: drag the table to see all the data
                        columns.
                    </p>
                    <div className="max-w-full not-prose relative bg-slate-50 rounded-xl overflow-hidden">
                        <div
                            className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"
                            style={{
                                backgroundPosition: 10 + "px" + 10 + "px",
                            }}
                        ></div>
                        <div className="relative rounded-xl overflow-auto">
                            <div className="shadow-sm overflow-hidden my-8">
                                <div className="relative overflow-x-auto">
                                    <table className="border-collapse table-auto text-sm">
                                        <thead>
                                            <tr>
                                                <th className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-slate-400 text-left">
                                                    #
                                                </th>
                                                <th className="border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">
                                                    Volume
                                                </th>
                                                <th className="border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">
                                                    Circulating Supply
                                                </th>
                                                <th className="border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">
                                                    Total Supply
                                                </th>
                                                <th className="border-b font-medium p-4 pt-0 pb-3 text-slate-400 text-left">
                                                    Max Supply
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
                                            <tr>
                                                <td className="border-b border-slate-100 p-4 pl-8 text-slate-500">
                                                    {apiData.market_cap_rank}
                                                </td>
                                                <td className="border-b border-slate-100 p-4 text-slate-500">
                                                    {gbp.format(
                                                        apiData.market_data
                                                            .total_volume.gbp
                                                    )}
                                                </td>
                                                <td className="border-b border-slate-100 p-4 text-slate-500">
                                                    {thousands.format(
                                                        apiData.market_data
                                                            .circulating_supply
                                                    )}
                                                </td>
                                                <td className="border-b border-slate-100 p-4 text-slate-500">
                                                    {thousands.format(
                                                        apiData.market_data
                                                            .total_supply
                                                    )}
                                                </td>
                                                <td className="border-b border-slate-100 p-4 text-slate-500">
                                                    {thousands.format(
                                                        apiData.market_data
                                                            .max_supply
                                                    )}
                                                </td>
                                                <td className="border-b border-slate-100 p-4 text-slate-500">
                                                    {gbpFull.format(
                                                        apiData.market_data
                                                            .current_price.gbp
                                                    )}
                                                </td>
                                                <td className="border-b border-slate-100 p-4 pr-8 text-slate-500">
                                                    {gbp.format(
                                                        apiData.market_data
                                                            .market_cap.gbp
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
