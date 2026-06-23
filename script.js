let expenses = [];
let totalAmount = 0;

const expenseName = document.getElementById("expenseName");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");
const filterCategory = document.getElementById("filterCategory");
const searchInput = document.getElementById("searchInput");

// Create Expense Item
function createExpenseItem(name, amt, cat) {
    const li = document.createElement("li");
    li.setAttribute("data-name", name.toLowerCase());

    // Store category for filtering
    li.setAttribute("data-category", cat);
li.innerHTML = `
    ${name} - ₹${amt} (${cat})
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
`;

    const deleteBtn = li.querySelector(".delete-btn");
    const editBtn = li.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {

    expenseName.value = name;
    amount.value = amt;
    category.value = cat;

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

// Load Expenses After Refresh
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

// Filter Expenses
filterCategory.addEventListener("change", () => {
    const selected = filterCategory.value;

    const items = expenseList.querySelectorAll("li");

    items.forEach(item => {
        const itemCategory =
            item.getAttribute("data-category");

        if (
            selected === "All" ||
            itemCategory === selected
        ) {
            item.style.display = "list-item";
        } else {
            item.style.display = "none";
        }
    });
});
searchInput.addEventListener("keyup", () => {

    const searchText =
        searchInput.value.toLowerCase();

    const items =
        expenseList.querySelectorAll("li");

    items.forEach(item => {

        const expenseName =
            item.getAttribute("data-name");

        if (expenseName.includes(searchText)) {
            item.style.display = "list-item";
        } else {
            item.style.display = "none";
        }
    });
});