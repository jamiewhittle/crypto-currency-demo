// format number to US dollar
export const usd = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
});

// format number to US dollar with decimals
export const usdFull = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
});

// format number to British pounds
export const gbp = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
});

// format number to British pounds with decimals
export const gbpFull = Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
});

// format number to comma separate thousands
export const thousands = Intl.NumberFormat("en-GB");
