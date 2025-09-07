// Sample data
let transactions = [];

// Form handling
document.getElementById("transaction-form").addEventListener("submit", function(e) {
  e.preventDefault();

  let desc = document.getElementById("description").value;
  let amount = parseFloat(document.getElementById("amount").value);
  let type = document.getElementById("type").value;

  transactions.push({ desc, amount, type });

  renderTransactions();
  renderCharts();

  // Clear form
  this.reset();
});

// Render transactions
function renderTransactions() {
  let list = document.getElementById("transaction-list");
  list.innerHTML = "";

  transactions.forEach(t => {
    let li = document.createElement("li");
    li.textContent = `${t.type.toUpperCase()}: ${t.desc} - ₹${t.amount}`;
    list.appendChild(li);
  });
}

// Charts
let pieChart, barChart;
function renderCharts() {
  let income = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  let expense = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);

  // Pie chart
  if (pieChart) pieChart.destroy();
  pieChart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["#4CAF50", "#F44336"]
      }]
    }
  });

  // Bar chart
  if (barChart) barChart.destroy();
  barChart = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        label: "Amount",
        data: [income, expense],
        backgroundColor: ["#4CAF50", "#F44336"]
      }]
    }
  });
}
