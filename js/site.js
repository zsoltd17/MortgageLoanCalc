const btnCalculate = document.querySelector('#btnSubmit');

function getValues() {
    let loanAmount = document.querySelector('#loanAmount').value;
    let payments = document.querySelector('#payments').value;
    let rate = document.querySelector('#rate').value;
    
    loanAmount = parseFloat(loanAmount);
    payments = parseFloat(payments);
    rate = parseFloat(rate);

    if (Number.isInteger(loanAmount) && Number.isInteger(payments) && Number.isInteger(rate)) {
        let loanArray = calculateValues(loanAmount, payments, rate);
        displayValues(loanArray);
    } else {
        alert("Enter numbers");
    }
}

function calculateValues(loan,month,rate) {
    let remainingBalance = loan;
    let totalMonthlyPayment = remainingBalance * (rate / 1200) / (1 - Math.pow(1 + rate / 1200, -month));
    let loanArray = [];
    let totalInterest = 0;

    for (let i = 1; i <= month; i++) {
        let interestPayment = remainingBalance * rate / 1200;
        let principalPayment = totalMonthlyPayment - interestPayment;
        totalInterest += interestPayment;
        remainingBalance -= principalPayment;
        
        let obj = {
            "month": i,
            "payment": totalMonthlyPayment.toFixed(2),
            "interest": interestPayment.toFixed(2),
            "principal": principalPayment,
            "totalInterest": totalInterest.toFixed(2),
            "balance": remainingBalance <= 0 ? (remainingBalance * -1).toFixed(2) : remainingBalance.toFixed(2),
            "monthlyPayments": totalMonthlyPayment.toFixed(2),
        }
        loanArray.push(obj);
    }

    return loanArray;
}

function displayValues(arr) {
    let template = document.querySelector('#tableTemplate');
    let results = document.querySelector("#results");
    // let monthlyPayments = document.querySelector('#monthlyPayments');

    results.innerHTML = "";
    let tP = 0;
    let tI = 0;
    let totalCost = 0;

    for (let i = 0; i < arr.length; i++) {

        let tableRow = document.importNode(template.content, true);

        let rowCols = tableRow.querySelectorAll('td');

        rowCols[0].textContent = arr[i].month;
        rowCols[1].textContent = arr[i].payment;
        rowCols[2].textContent = arr[i].principal.toFixed(2);
        rowCols[3].textContent = arr[i].interest;
        rowCols[4].textContent = arr[i].totalInterest;
        rowCols[5].textContent = arr[i].balance;

        results.appendChild(tableRow);
        tP += arr[i].principal;
        tI = parseFloat(arr[i].totalInterest);
        
        totalCost = tP + tI;
        
    }
    
    document.querySelector('#monthlyPayments').innerHTML = `$${arr[0].monthlyPayments}`;
    document.querySelector('#totalPrincipal').innerHTML = tP.toFixed(2);
    document.querySelector('#totalInterest').innerHTML = tI;
    document.querySelector('#totalCostdiv').innerHTML = totalCost.toFixed(2);
    
}

btnCalculate.addEventListener('click', getValues);