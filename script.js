let expenses = JSON.parse(localStorage.getItem("expenses")) || []
let editIndex = -1
let chart
displayExpenses()
function addExpense(){
let title=document.getElementById("title").value
let amount=document.getElementById("amount").value
let category=document.getElementById("category").value
let date=document.getElementById("date").value
if(title==""||amount==""||category==""||date==""){
alert("Please fill all fields")
return
}
let expense={
title,
amount:Number(amount),
category,
date
}
if(editIndex===-1){
expenses.push(expense)
}else{
expenses[editIndex]=expense
editIndex=-1
}
localStorage.setItem("expenses",JSON.stringify(expenses))
clearForm()
displayExpenses()
}
function displayExpenses(list=expenses){
let container=document.getElementById("expenseList")
container.innerHTML=""
let total=0
list.forEach((expense,index)=>{
total+=expense.amount
let li=document.createElement("li")
li.innerHTML=`
${expense.title} | ₹${expense.amount} | ${expense.category} | ${expense.date}
<div class="actions">
<button class="edit" onclick="editExpense(${index})">Edit</button>
<button class="delete" onclick="deleteExpense(${index})">Delete</button>
</div>
`
container.appendChild(li)
})
document.getElementById("total").innerText=total
document.getElementById("count").innerText=list.length
updateChart()
}
function deleteExpense(index){
expenses.splice(index,1)
localStorage.setItem("expenses",JSON.stringify(expenses))
displayExpenses()
}
function editExpense(index){
let expense=expenses[index]
document.getElementById("title").value=expense.title
document.getElementById("amount").value=expense.amount
document.getElementById("category").value=expense.category
document.getElementById("date").value=expense.date
editIndex=index
}
function clearForm(){
document.getElementById("title").value=""
document.getElementById("amount").value=""
document.getElementById("category").value=""
document.getElementById("date").value=""
}
function filterExpenses(){
let selected=document.getElementById("filterCategory").value
if(selected==="All"){
displayExpenses(expenses)
return
}
let filtered=expenses.filter(exp=>exp.category===selected)
displayExpenses(filtered)
}
function updateChart(){
let categoryTotals={}
expenses.forEach(exp=>{
categoryTotals[exp.category]=(categoryTotals[exp.category]||0)+exp.amount
})
let labels=Object.keys(categoryTotals)
let data=Object.values(categoryTotals)
let ctx=document.getElementById("expenseChart")
if(chart){
chart.destroy()
}
chart=new Chart(ctx,{
type:"pie",
data:{
labels:labels,
datasets:[{
data:data,
backgroundColor:[
"#4CAF50",
"#2196F3",
"#FFC107",
"#FF5722",
"#9C27B0"
]
}]
}
})
}