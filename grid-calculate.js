// DOM Mappings
let gridValues = document.getElementById('gridValues');
let oneGridsDiff = document.getElementById('oneGridsDiff');
let oneGridsBuy = document.getElementById('oneGridsBuy');
let oneGridsFree = document.getElementById('oneGridsFree');
let oneGridsPercBuy = document.getElementById('oneGridsPercBuy');
let oneGridsPercFree = document.getElementById('oneGridsPercFree');
let oneGridsProfit = document.getElementById('oneGridsProfit');
let calcButton = document.getElementById('calcButton');
// text fields
let domHighPrice = document.getElementById('domHighPrice');
let domLowPrice = document.getElementById('domLowPrice');
let domPrice = document.getElementById('domPrice');
let domQtyPerGrid = document.getElementById('domQtyPerGrid');
let domTradingFee = document.getElementById('domTradingFee');
let domGridAmmt = document.getElementById('domGridAmmt');
let domPrecision = document.getElementById('domPrecision');

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
};

// figure out the fee for one side of the trade
const findTradeFee = (fee, quantity, price) => {
    feeTotal = (quantity * price) * (fee / 100);
    oneTradeFee = feeTotal.toFixed(precision);
};

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