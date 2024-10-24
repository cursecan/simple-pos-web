import currency from "currency.js";


export const rupiah = (value) => {
    return currency(value).format({symbol: '', precision: 2})
}