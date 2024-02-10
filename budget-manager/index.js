const addForm = document.querySelector(".add");
const incomeList = document.querySelector("ul.income-list");
const expenseList = document.querySelector("ul.expense-list");

let transactions = localStorage.getItem("transactions") !== null ? 
                   JSON.parse(localStorage.getItem("transactions")) : [];

const balance = document.querySelector("#balance");
const income = document.querySelector("#income");
const expense = document.querySelector("#expense");

fillupTransactions();

addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if(addForm.source.value.trim() === "" || addForm.amount.value.trim() ==="") {
        return alert("Fields in form must be filled up");
    }
    addTransaction(addForm.source.value.trim(), addForm.amount.value.trim());
    addForm.reset();
});

incomeList.addEventListener("click", (event) =>{
    deleteTransactions(event);
})

expenseList.addEventListener("click", (event) =>{
    deleteTransactions(event);
})

function deleteTransactions(event) {
    if (event.target.classList.contains("delete")){
        const transactionId = event.target.parentElement.attributes["data-id"].value;
        event.target.parentElement.remove()
        transactions = transactions.filter(transaction => transaction.id != transactionId);
        localStorage.setItem("transactions", JSON.stringify(transactions));
        updateStatistics();
    }
}

function addTransactionDOM(transaction) {  
    if (transaction.amount > 0) {
        incomeList.innerHTML += transactionTemplate(transaction);
    } else {
        expenseList.innerHTML += transactionTemplate(transaction);
    }
}

function transactionTemplate(transaction) {
   return  `<li data-id="${transaction.id}">
              <p>
                 <span>${transaction.source}</span>
                 <span id="time">${transaction.time}</span>
              </p>
              <span>$${Math.abs(transaction.amount)}</span>
              <i class="bi bi-trash delete"></i>
            </li>`;
}

function addTransaction(source, amount) {
    const time = new Date();

    const transaction = {
        id: Math.floor(Math.random() * 1000000),
        source: source,
        amount: Number(amount),
        time: `${time.toLocaleTimeString()} ${time.toLocaleDateString()}`
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateStatistics();
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function fillupTransactions() {
    transactions.forEach(transaction => addTransactionDOM(transaction));
    updateStatistics();
}


function updateStatistics() {
    const updatedIncome = transactions
                          .filter(transaction => transaction.amount > 0)
                          .reduce((total, transaction) => total += transaction.amount, 0);

    const updatedExpense = transactions
                          .filter(transaction => transaction.amount < 0)
                          .reduce((total, transaction) => total += Math.abs(transaction.amount), 0);                        
                        
    balance.textContent = updatedIncome - updatedExpense;
    income.textContent = updatedIncome;
    expense.textContent = updatedExpense;
    }