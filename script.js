const expenseName = document.getElementById("expenseName");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const total = document.getElementById("total");

let totalAmount = 0;

addBtn.addEventListener("click", () => {
    const name = expenseName.value;
    const amt = Number(amount.value);
    const cat = category.value;

    if (name === "" || amt === 0 || cat === "") {
        alert("Please fill all fields");
        return;
    }

   const li = document.createElement("li");

li.innerHTML = `
    ${name} - ₹${amt} (${cat})
    <button class="delete-btn">Delete</button>
`;

expenseList.appendChild(li);

const deleteBtn = li.querySelector(".delete-btn");

deleteBtn.addEventListener("click", () => {
    totalAmount -= amt;
    total.textContent = totalAmount;

    li.remove();
});
    totalAmount += amt;
    total.textContent = totalAmount;

    expenseName.value = "";
    amount.value = "";
    category.value = "";
});