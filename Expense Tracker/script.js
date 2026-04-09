document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded");

  let expenses = []

  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  console.log(expenseForm);
  console.log(expenseNameInput);
  console.log(expenseAmountInput);
  console.log(expenseList);
  console.log(totalAmountDisplay);

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim()
    const amount = parseFloat(expenseAmountInput.value.trim());

    if( name!=="" && !isNaN(amount) && amount>0){
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      }
      expenses.push(newExpense)

      renderExpenses()

    }
    else{ return }

    
  });
  function renderExpenses(){
    expenseList.innerHTML=""
    expenses.forEach((expense) => {
      const li = document.createElement("li")
      li.innerHTML = `${expense.name} - $${expense.amount} <button data-id = "${expense.id}>Delete</button>`
      expenseList.appendChild(li);
    })
  }
});