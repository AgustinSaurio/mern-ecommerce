export const getDiscount = (price, priceoffer)=> {
    let discPrice = price - priceoffer;
    let discPorcentage = discPrice * 100;
    return discPorcentage / price;
}