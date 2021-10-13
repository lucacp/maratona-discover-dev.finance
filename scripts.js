const Modal = {
/*  open(){
    document
      .querySelector('.modal-overlay')
      .classList
      .add('active')
  },
  close(){
    document
      .querySelector('.modal-overlay')
      .classList
      .remove('active')
  }, // */
  toggle(){
    document
      .querySelector('.modal-overlay')
      .classList
      .toggle('active')
  }
}

const Transaction = {
  all: [
    {
      description:"Luz",
      amount: -50000,
      date: '23/01/2021'
    },
    {
      description:"Website",
      amount: 500000,
      date: '23/01/2021'
    },
    {
      description:"Internet",
      amount: -20000,
      date: '23/01/2021'
    },
    {
      description:"App",
      amount: 200000,
      date: '23/01/2021'
    },
  ],
  
  add(transaction){
    Transaction.all.push(transaction)
    App.reload()
  },

  remove(index){
    Transaction.all.splice(index,1)
    App.reload()
  },
  
  income(){
    let income = 0
    transactions.forEach((transaction)=>{
      income+= transaction.amount > 0 ? transaction.amount : 0
    })
    return income
  },
  
  expenses(){
    let expenses = 0
    transactions.forEach((transaction)=>{
      expenses+= transaction.amount < 0 ? transaction.amount : 0
    })
    return expenses
  },
  
  total(){
    return Transaction.income() + Transaction.expenses()
  }
}

const DOM = {
  transactionContainer: document.querySelector('#data-table tbody'),
  addTransaction(transaction,index){
    const tr = document.createElement("tr")
    tr.innerHTML = DOM.innerHTMLTransaction(transaction,index)
    DOM.transactionContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction,index){
    const CSSClass = transaction.amount < 0 ? "expense":"income"
    const amount = Utils.formatCurrency(transaction.amount)
    const html = `
                <td class="description">${transaction.description}</td>
                <td class="${CSSClass}">${amount}</td>
                <td class="date">${transaction.date}</td>
                <td>
                  <img onclick="Transaction.remove(${index})" src="assets/minus.svg" alt="Imagem Remover" />
                </td>
                `
    return html
  },
  updateBalance(){
    document
      .getElementById('incomesDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.income())
    document
      .getElementById('expensesDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
      .getElementById('totalDisplay')
      .innerHTML = Utils.formatCurrency(Transaction.total())
  },
  clearTransactions(){
    DOM.transactionContainer.innerHTML = ""
  }
}
const Utils = {
  formatCurrency(value){
    const signal = Number(value) < 0 ? "-":""
    value = String(value).replace(/\D/g,"")
    value = Number(value) / 100
    value = value.toLocaleString("pt-BR",{
      style: "currency",
      currency: "BRL"
    })
    return signal + value
  }  
}

const Form = {
  submit(event){
    event.preventDefault()

    
  }
}

const App = {
  init(){
    
    Transaction.all.forEach(function(transaction){
      DOM.addTransaction(transaction)
    })
    
    DOM.updateBalance()
  },
  reload(){
    DOM.clearTransactions()
    App.init()
  }
}

App.init()
