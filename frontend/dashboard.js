let transactions = [];

const list = document.getElementById("list");
const user = localStorage.getItem("user");

if (!user) {
  window.location.href = "login.html"; // not logged in
} else {
  document.getElementById("userName").innerText = user;
}

// LOAD / SAVE
function loadData() {
  const data = JSON.parse(localStorage.getItem("transactions"));
  if (data) transactions = data;
}

function saveData() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// ADD
function addTransaction() {
  const text = document.getElementById("text").value;
  const amount = +document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  if (text === "" || amount === "") {
    alert("Enter all fields");
    return;
  }

  transactions.push({ text, amount, type });
  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";

  updateUI();
}

// DELETE
function deleteTransaction(index) {
  transactions.splice(index, 1);
  updateUI();
}

// EDIT
function editTransaction(index) {
  const t = transactions[index];
  document.getElementById("text").value = t.text;
  document.getElementById("amount").value = t.amount;
  document.getElementById("type").value = t.type;
  deleteTransaction(index);
}

// RENDER
function renderTransactions(data = transactions) {
  list.innerHTML = "";

  data.forEach((t, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${t.text} - ₹${t.amount}
      <div>
        <button onclick="deleteTransaction(${index})">❌</button>
        <button onclick="editTransaction(${index})">✏️</button>
      </div>
    `;
    list.appendChild(li);
  });
}

// FILTER
function filterTransactions(type) {
  if (type === "all") renderTransactions();
  else renderTransactions(transactions.filter(t => t.type === type));
}

// UPDATE UI
function updateUI() {
  const income = transactions.filter(t => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions.filter(t => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  const balance = income - expense;
  const savings = balance > 0 ? balance : 0;

  document.getElementById("income").innerText = `₹${income}`;
  document.getElementById("expense").innerText = `₹${expense}`;
  document.getElementById("balance").innerText = `₹${balance}`;
  document.getElementById("savings").innerText = `₹${savings}`;

  renderTransactions();
  updateChart();
  updateMonthlyChart();
  checkBudget();
  saveData();
}

// PIE CHART
function updateChart() {
  const income = transactions.filter(t => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions.filter(t => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  const ctx = document.getElementById("chart").getContext("2d");

  if (window.myChart) window.myChart.destroy();

  window.myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#22c55e", "#ef4444"]
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

// MONTHLY CHART
function updateMonthlyChart() {
  const months = Array(12).fill(0);

  transactions.forEach(t => {
    const month = new Date().getMonth();
    if (t.type === "expense") months[month] += t.amount;
  });

  const ctx = document.getElementById("monthlyChart").getContext("2d");

  if (window.monthChart) window.monthChart.destroy();

  window.monthChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
      datasets: [{
        label: "Monthly Expenses",
        data: months
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

// BUDGET ALERT
function checkBudget() {
  const expense = transactions.filter(t => t.type === "expense")
    .reduce((a, t) => a + t.amount, 0);

  const budget = 10000;

  if (expense > budget) alert("🚨 Budget exceeded!");
}

// DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
}

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// LOGOUT
function logout() {
  localStorage.removeItem("user"); // keep transactions safe
  window.location.href = "login.html"; // ✅ correct page
}

// INIT
loadData();
updateUI();