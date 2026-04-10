document.addEventListener("DOMContentLoaded", () => {
  console.log("App loaded");

  let expenses =JSON.parse(localStorage.getItem("expenses"))  || []

  
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");


  renderExpenses()
  updateTotal()

  

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
      saveExpensesToLocal()

      renderExpenses()
      updateTotal()
      // clearing inputs 
      expenseAmountInput.value =""
      expenseNameInput.value = ""

    }
  })
  expenseList.addEventListener("click", (e) =>{
    if(e.target.tagName === "BUTTON"){
      const expenseId = parseInt(e.target.getAttribute('data-id'))
      expenses = expenses.filter((expenses) => expenses.id !== expenseId)
      renderExpenses()
      updateTotal()
      saveExpensesToLocal()
      
    }
    

    
  });
  function renderExpenses(){
    expenseList.innerHTML=""
    expenses.forEach((expense) => {
      const li = document.createElement("li")
      li.innerHTML = `${expense.name} - $${expense.amount} <button data-id = "${expense.id}">Delete</button>`
      expenseList.appendChild(li);


    })


    
    
  }
  function updateTotal(){
    var totalAmount = 0
    expenses.forEach((expenses) => {
      totalAmount = totalAmount + expenses.amount
    })
    totalAmountDisplay.textContent = totalAmount.toFixed(2)
  }

  function saveExpensesToLocal(){
    localStorage.setItem("expenses",JSON.stringify(expenses))
  }
});