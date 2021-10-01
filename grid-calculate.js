// DOM Mappings
let gridValues = document.getElementById('gridValues');
// Fixed
let oneGridsDiff = document.getElementById('oneGridsDiff');
let oneGridsBuy = document.getElementById('oneGridsBuy');
let oneGridsFree = document.getElementById('oneGridsFree');
let oneGridsPercBuy = document.getElementById('oneGridsPercBuy');
let oneGridsPercFree = document.getElementById('oneGridsPercFree');
let oneGridsProfit = document.getElementById('oneGridsProfit');
// Dynamic
let oneDynamicGridsBuy = document.getElementById('oneDynamicGridsBuy');
let oneDynamicGridsFree = document.getElementById('oneDynamicGridsFree');
let oneDynamicGridsPercBuy = document.getElementById('oneDynamicGridsPercBuy');
let oneDynamicGridsPercFree = document.getElementById('oneDynamicGridsPercFree');
let oneDynamicGridsProfit = document.getElementById('oneDynamicGridsProfit');
// Button
let calcButton = document.getElementById('calcButton');
// Fixed
let domHighPrice = document.getElementById('domHighPrice');
let domLowPrice = document.getElementById('domLowPrice');
let domPrice = document.getElementById('domPrice');
let domQtyPerGrid = document.getElementById('domQtyPerGrid');
let domTradingFee = document.getElementById('domTradingFee');
let domGridAmmt = document.getElementById('domGridAmmt');
let domPrecision = document.getElementById('domPrecision');
// Dynamic
let domIntervalProf = document.getElementById('domIntervalProf');
let domDynamicPrice = document.getElementById('domDynamicPrice');
let domDynamicQtyPerGrid = document.getElementById('domDynamicQtyPerGrid');
let domDynamicTradingFee = document.getElementById('domDynamicTradingFee');
let domDynamicGridAmmt = document.getElementById('domDynamicGridAmmt');
let domDynamicPrecision = document.getElementById('domDynamicPrecision');

// leave be
let gridsArray = [];
let oneTradeFee;

// set these variables
let highPrice;
let lowPrice;
let price;
let quantity;
let fee;
let gridsAmmt;
let precision;

// get the prices at which grids will occur and push them into the array gridsArray
const findGridPrices = (highPrice, lowPrice, gridsAmmt, precision) => {
    let gridPrice = (highPrice - lowPrice) / gridsAmmt;
    let gridStep = parseFloat(lowPrice);

    for (i = 0; i < gridsAmmt; i++) {
        gridStep += gridPrice;
        gridsArray.push(gridStep.toFixed(precision));
    }

    gridsArray.sort();
};

const findDynamicGridPrices = (interval, price, gridsAmmt, precision) => {
    let diff1 = parseFloat(interval);
    let gridStep1 = parseFloat(price);

    for (i = 0; i < gridsAmmt; i++) {
        gridStep1 -= diff1;
        gridsArray.push(gridStep1.toFixed(precision));
    }

    let diff = parseFloat(interval);
    let gridStep = parseFloat(price);

    for (i = 0; i < gridsAmmt; i++) {
        gridStep += diff;
        gridsArray.push(gridStep.toFixed(precision));
    }

    gridsArray.sort();
}

// figure out the fee for one side of the trade
const findTradeFee = (fee, quantity, price) => {
    feeTotal = (quantity * price) * (fee / 100);
    oneTradeFee = feeTotal.toFixed(precision);
};

function addDynamic() {
    // clear the results area before displaying results for multiple calcs w/o reload
    oneDynamicGridsBuy.innerText = '';
    oneDynamicGridsFree.innerText = '';
    oneDynamicGridsPercBuy.innerText = '';
    oneDynamicGridsPercFree.innerText = '';
    oneDynamicGridsProfit.innerText = '';

    gridsArray = [];
    gridValues.innerHTML = '';

    interval = domIntervalProf.value;
    price = domDynamicPrice.value;
    quantity = domDynamicQtyPerGrid.value;
    fee = domDynamicTradingFee.value;
    gridsAmmt = domDynamicGridAmmt.value * 2;
    precision = domDynamicPrecision.value;

    findDynamicGridPrices(interval, price, gridsAmmt, precision);
    findTradeFee(fee, quantity, gridsArray[0]);

    var percentBuy = 50;
    let percentFree = 50;

    let oneGridProfit = (gridsArray[1] - gridsArray[0]) * quantity - oneTradeFee;
    let oneGridBuy = ((quantity * price) * gridsAmmt);
    let oneGridFree = ((quantity * price) * gridsAmmt);

    oneDynamicGridsProfit.value = parseFloat(oneGridProfit).toFixed(precision);
    oneDynamicGridsBuy.value = parseFloat(oneGridBuy).toFixed(precision);
    oneDynamicGridsFree.value = parseFloat(oneGridFree).toFixed(precision);

    oneDynamicGridsPercBuy.value = parseFloat(percentBuy).toFixed(0);
    oneDynamicGridsPercFree.value = parseFloat(percentFree).toFixed(0);

    gridsArray.forEach(aGrid => newElement(aGrid));
}

function add() {
    // clear the results area before displaying results for multiple calcs w/o reload
    oneGridsDiff.innerText = '';
    oneGridsBuy.innerText = '';
    oneGridsFree.innerText = '';
    oneGridsPercBuy.innerText = '';
    oneGridsPercFree.innerText = '';
    oneGridsProfit.innerText = '';

    gridsArray = [];
    gridValues.innerHTML = '';

    highPrice = domHighPrice.value;
    lowPrice = domLowPrice.value;
    price = domPrice.value;
    quantity = domQtyPerGrid.value;
    fee = domTradingFee.value;
    gridsAmmt = domGridAmmt.value;
    precision = domPrecision.value;

    findGridPrices(highPrice, lowPrice, gridsAmmt, precision);
    findTradeFee(fee, quantity, gridsArray[0]);

    var priceDiff = highPrice - lowPrice;
    var totalPercentage = 100;
    var percentBuy = 100 - ((price - lowPrice) * totalPercentage) / (priceDiff);
    let percentFree = ((price - lowPrice) * totalPercentage) / (priceDiff);

    let oneGridProfit = (gridsArray[1] - gridsArray[0]) * quantity - oneTradeFee;
    let oneGridDiff = (gridsArray[1] - gridsArray[0]);
    let oneGridBuy = ((quantity * price) * gridsAmmt) * (percentBuy / totalPercentage);
    let oneGridFree = ((quantity * price) * gridsAmmt) * (percentFree / totalPercentage);

    oneGridsProfit.value = parseFloat(oneGridProfit).toFixed(precision);
    oneGridsDiff.value = parseFloat(oneGridDiff).toFixed(precision);
    oneGridsBuy.value = parseFloat(oneGridBuy).toFixed(precision);
    oneGridsFree.value = parseFloat(oneGridFree).toFixed(precision);

    oneGridsPercBuy.value = parseFloat(percentBuy).toFixed(0);
    oneGridsPercFree.value = parseFloat(percentFree).toFixed(0);

    gridsArray.forEach(aGrid => newElement(aGrid));
}

function newElement(value) {
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    var inputValue = value;
    var t = document.createTextNode(inputValue);

    li.appendChild(t);

    if (inputValue === '') {
        alert("You must write something!");
    } else {
        gridValues.appendChild(li);
    }
}