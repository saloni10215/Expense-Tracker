let expenses = [];
let totalAmount = 0;

const expenseName = document.getElementById("expenseName");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");

// Function to create expense item
function createExpenseItem(name, amt, cat) {
    const li = document.createElement("li");

    li.innerHTML = `
        ${name} - ₹${amt} (${cat})
        <button class="delete-btn">Delete</button>
    `;

    const deleteBtn = li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {
        totalAmount -= amt;
        total.textContent = totalAmount;

        expenses = expenses.filter(
            expense =>
                !(
                    expense.name === name &&
                    expense.amount === amt &&
                    expense.category === cat
                )
        );

        localStorage.setItem(
            "expenses",
            JSON.stringify(expenses)
        );

        li.remove();
    });

    expenseList.appendChild(li);
}

// Add Expense
addBtn.addEventListener("click", () => {
    const name = expenseName.value.trim();
    const amt = Number(amount.value);
    const cat = category.value;

    if (name === "" || amt <= 0 || cat === "") {
        alert("Please fill all fields");
        return;
    }

    createExpenseItem(name, amt, cat);

    expenses.push({
        name: name,
        amount: amt,
        category: cat
    });

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    totalAmount += amt;
    total.textContent = totalAmount;

    expenseName.value = "";
    amount.value = "";
    category.value = "";
});

// Load Expenses on Page Refresh
window.addEventListener("DOMContentLoaded", () => {
    const savedExpenses =
        JSON.parse(localStorage.getItem("expenses")) || [];

    expenses = savedExpenses;

    savedExpenses.forEach(expense => {
        createExpenseItem(
            expense.name,
            expense.amount,
            expense.category
        );

        totalAmount += expense.amount;
    });

    total.textContent = totalAmount;
});